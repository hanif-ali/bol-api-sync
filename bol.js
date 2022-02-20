const axios = require("axios");

class BolAPI {
  constructor({ clientSecret, clientId, maxLoginRetries }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.maxLoginRetries = maxLoginRetries ?? 5;
		this.maxApiRetries = 4;
		this.defaultRetrieveWait = 180000;
    this.accessToken = null;
  }

  async sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }

  async login(retries = 0) {
		console.debug(`Logging in to Bol API, Retries: ${retries}`)
    return axios
      .post(
        "https://login.bol.com/token?grant_type=client_credentials",
        {},
        {
          auth: {
            username: this.clientId,
            password: this.clientSecret,
          },
        }
      )
      .then((res) => {
        console.debug("Login Success. Setting Access Token");
        this.accessToken = res.data.access_token;
        return this.accessToken;
      })
      .catch((err) => {
				console.debug(`Login Failure. Status Code: ${err.response.status}`)
        if (retries >= this.maxLoginRetries) {
          throw err
        }
        return this.sleep(1000*retries).then(() => {
          return this.login(retries + 1);
        });
      });
  }

  async _retrieveResource(resourceName, resourceId, retries = 0) {
    if (!this.accessToken) {
       await this.login();
    }
		console.debug(`Fetching ${resourceName.toUpperCase()} ${resourceId} (Try ${retries})`)
    return axios
      .get(`https://api.bol.com/retailer/${resourceName}/${resourceId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: "application/vnd.retailer.v5+json",
        },
      })
      .then(
        (res) => {
					console.debug(`Fetched ${resourceName.toUpperCase()} ${resourceId}`)
          return res.data || {};
        },
        (err) => {
					console.log(`Failed to fetch ${resourceName.toUpperCase()} ${resourceId}`)
          if (retries >= this.maxApiRetries) {
						console.log(retries)
						console.error(`${resourceName.toUpperCase()} ${resourceId} timed out after ${retries} retries`)
            throw err;
          }
          else if (err.response.status === 401) {
						console.debug("Login Token Expired. Nullifying Token")
            this.accessToken = null;
						return this._retrieveResource(resourceName, resourceId, retries)
          }
					else if (err.response.status === 429){
						const retryAfter = err.response.headers["retry-after"]
						const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : this.defaultRetrieveWait
						console.warn(`Rate Limit Reached. Waiting for ${retryAfter} seconds`)
						return this.sleep(waitTime).then(() => {
							return this._retrieveResource(resourceName, resourceId, retries+1)
						})
					}
					else { throw err }
        }
      );
  }

  async _listResource(resourceName, retries = 0) {
    if (!this.accessToken) {
      console.log("Access Token is Null. Logging In");
      await this.login();
    }
    return axios
      .get(`https://api.bol.com/retailer/${resourceName}?status=ALL`, {
        headers: {
          // Authorization: `Bearer ${this.accessToken}`,
          Authorization: `Bearer ${this.accessToken}`,
          Accept: "application/vnd.retailer.v5+json",
        },
      })
      .then(
        (res) => {
          return res.data[resourceName] || [];
        },
        (err) => {
          if (retries >= this.maxApiRetries) {
            throw err;
          }

          if (err.response.data === 401) {
            console.log("401 on List. Nullifying Token and retrying");
            this.accessToken = null;
          }
					return this.sleep(waitTime).then(() => {
						return this._listResource(resourceName,retries+1)
					})
        }
      );
  }

  async getOrders() {
    return this._listResource("orders");
  }

  async getOrder(orderId) {
    return this._retrieveResource("orders", orderId);
  }

  async getShipments() {
    return this._listResource("shipments");
  }

  async getShipment(shipmentId) {
    return this._retrieveResource("shipments", shipmentId);
  }

  async getReturns() {
    return this._listResource("returns");
  }

  async getReturn(returnId) {
    return this._retrieveResource("returns", returnId);
  }
}

module.exports = (settings) => {
  return new BolAPI(settings);
};
