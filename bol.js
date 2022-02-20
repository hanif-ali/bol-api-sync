const axios = require("axios");

class BolAPI{
	constructor({ clientSecret, clientId }){
		this.clientId = clientId;
		this.clientSecret = clientSecret;
		this.accessToken = null;
		this.maxRetries = 5;
	}

	async login(retries=0){
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
				console.log("Login Success. Setting Access Token")
				this.accessToken = res.data.access_token;
				return this.accessToken;
			})
			.catch((err) => {
				if (retries >= this.maxRetries){
					throw err;
				}

				if (err.response.data === 401){
					this.accessToken = null
				}
				return this.login(retries+1)
			})
	};

	async _retrieveResource(resourceName, resourceId, retries=0){
		if (!this.accessToken) {
			await this.login();
		}
		return axios
			.get(`https://api.bol.com/retailer/${resourceName}/${resourceId}`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
					Accept: "application/vnd.retailer.v5+json",
				},
			})
			.then(
				(res) => {
					return res.data || {};
				},
				(err) => {
					if (retries >= this.maxRetries){
						throw err;
					}

					if (err.response.data === 401){
						this.accessToken = null
					}
					return this._retrieveResource(resourceName, resourceId, retries+1)
				}
			);
	}

	async _listResource(resourceName, retries=0){
		console.log(`List Try ${retries}`)
		if (!this.accessToken) {
			console.log("Access Token is Null. Logging In")
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
					if (retries >= this.maxRetries){
						throw err;
					}

					if (err.response.data === 401){
						console.log("401 on List. Nullifying Token and retrying")
						this.accessToken = null
					}
					return this._listResource(resourceName, retries+1)
				}
			);
	}

	async getOrders(){
		return this._listResource("orders")
	}

	async getOrder(orderId){
		return this._retrieveResource("orders", orderId)
	}

	async getShipments(){
		return this._listResource("shipments")
	}

	async getShipment(shipmentId){
		return this._retrieveResource("shipments", shipmentId)
	}

	async getReturns(){
		return this._listResource("returns")
	}

	async getReturn(returnId){
		return this._retrieveResource("returns", returnId)
	}
}

module.exports = (settings) => {
	return new BolAPI(settings)
}