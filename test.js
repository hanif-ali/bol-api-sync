Order = {
  orderId: "1332178547",
  pickupPoint: false,
  orderPlacedDateTime: "2022-02-16T10:55:21+01:00",
  shipmentDetails: {
    salutation: "FEMALE",
    firstName: "R.",
    surname: "Harder",
    streetName: "Zichtweg",
    houseNumber: "22",
    zipCode: "2151WH",
    city: "NIEUW-VENNEP",
    countryCode: "NL",
    email: "2kpuihnpya555lcwsvzd7wsyv5a5g6@verkopen.bol.com",
    language: "nl",
  },
  billingDetails: {
    salutation: "FEMALE",
    firstName: "R.",
    surname: "Harder",
    streetName: "Zichtweg",
    houseNumber: "22",
    zipCode: "2151WH",
    city: "NIEUW-VENNEP",
    countryCode: "NL",
    email: "2kpuihnpya555lcwsvzd7wsyv5a5g6@verkopen.bol.com",
  },
  orderItems: [
    {
      orderItemId: "2855798427",
      cancellationRequest: false,
      fulfilment: {
        method: "FBR",
        distributionParty: "RETAILER",
        latestDeliveryDate: "2022-02-23",
        expiryDate: "2022-02-26",
        timeFrameType: "REGULAR",
      },
      offer: {
        offerId: "9f87965b-ac66-441d-8c70-8b41d1762d8c",
        reference: "5430002902036",
      },
      product: {
        ean: "5430002902036",
        title: "Moonbird adem- en slaapcoach Blue Green",
      },
      quantity: 1,
      quantityShipped: 1,
      quantityCancelled: 0,
      unitPrice: 159.0,
      commission: 8.71,
    },
  ],
};

const ordersShopfy = {
  customer_locale: "en",
  user_id: null,
  total_price_usd: "180.01",
  total_discounts: "0",
  contact_email: "charlieversteege@hotmail.com",
  total_line_items_price_set: {
    shop_money: { amount: "159.00", currency_code: "EUR" },
    presentment_money: { amount: "159.00", currency_code: "EUR" },
  },
  checkout_id: 32625605902562,
  token: "8e8b35f8634cc8a78ba05e619efa030d",
  buyer_accepts_marketing: false,
  subtotal_price_set: {
    shop_money: { amount: "159.00", currency_code: "EUR" },
    presentment_money: { amount: "159.00", currency_code: "EUR" },
  },
  discount_codes: [],
  browser_ip: "62.166.185.205",
  total_discounts_set: {
    shop_money: { amount: "0.00", currency_code: "EUR" },
    presentment_money: { amount: "0.00", currency_code: "EUR" },
  },
  total_price_set: {
    shop_money: { amount: "159.00", currency_code: "EUR" },
    presentment_money: { amount: "159.00", currency_code: "EUR" },
  },
  currency: "EUR",
  processing_method: "direct",
  tags: "D2C, Order Unfulfilled, TEST",
  fulfillments: [],
  id: 4703747277026,
  email: "charlieversteege@hotmail.com",
  payment_details: {
    credit_card_number: "•••• •••• •••• 4590",
    cvv_result_code: null,
    credit_card_bin: "679093",
    credit_card_company: "Mastercard",
    avs_result_code: null,
  },
  note: null,
  fulfillment_status: null,
  discount_applications: [],
  checkout_token: "3f0d6549a92701762925991409a68bc1",
  order_number: 5487,
  name: "#5487",
  _sdc_table_version: 0,
  cancelled_at: null,
  updated_at: { value: "2022-02-19T19:47:38.000Z" },
  total_shipping_price_set: {
    shop_money: { amount: "0.00", currency_code: "EUR" },
    presentment_money: { amount: "0.00", currency_code: "EUR" },
  },
  number: 4487,
  refunds: [],
  processed_at: { value: "2022-02-19T19:47:30.000Z" },
  admin_graphql_api_id: "gid://shopify/Order/4703747277026",
  tax_lines: [
    {
      value: {
        rate: "0.21",
        price: "27.6",
        title: "NL btw",
        price_set: {
          shop_money: { amount: "27.60", currency_code: "EUR" },
          presentment_money: { amount: "27.60", currency_code: "EUR" },
        },
      },
    },
  ],
  _sdc_received_at: { value: "2022-02-19T22:28:04.237Z" },
  _sdc_sequence: 1645309633146881000,
  presentment_currency: "EUR",
  client_details: {
    accept_language: "nl-NL,nl;q=0.9",
    browser_width: null,
    browser_height: null,
    browser_ip: "62.166.185.205",
    user_agent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 15_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1",
  },
  phone: null,
  shipping_lines: [
    {
      value: {
        discounted_price: 0,
        id: 3922798510306,
        title: "Standard",
        source: "shopify",
        price_set: {
          shop_money: { amount: "0.00", currency_code: "EUR" },
          presentment_money: { amount: "0.00", currency_code: "EUR" },
        },
        discounted_price_set: {
          shop_money: { amount: "0.00", currency_code: "EUR" },
          presentment_money: { amount: "0.00", currency_code: "EUR" },
        },
        price: "0",
        code: "Standard",
        tax_lines: [
          {
            value: {
              rate: "0.21",
              price: "0",
              price_set: {
                shop_money: { amount: "0.00", currency_code: "EUR" },
                presentment_money: { amount: "0.00", currency_code: "EUR" },
              },
              title: "NL btw",
            },
          },
        ],
      },
    },
  ],
  landing_site: "/api/graphql",
  created_at: { value: "2022-02-19T19:47:31.000Z" },
  taxes_included: true,
  source_name: "5667277",
  gateway: "shopify_payments",
  line_items: [
    {
      value: {
        properties: [],
        product_id: 5768606482593,
        total_discount_set: {
          shop_money: { amount: "0.00", currency_code: "EUR" },
          presentment_money: { amount: "0.00", currency_code: "EUR" },
        },
        sku: "05430002902005",
        vendor: "moonbird.life",
        variant_title: "Sky Blue",
        gift_card: false,
        fulfillable_quantity: 1,
        fulfillment_service: "manual",
        id: 12058129793250,
        variant_inventory_management: "shopify",
        fulfillment_status: null,
        destination_location: null,
        grams: 450,
        name: "moonbird - Sky Blue",
        variant_id: 37370409877698,
        quantity: 1,
        taxable: true,
        origin_location: {
          zip: "3140",
          country_code: "BE",
          city: "Keerbergen",
          address2: "",
          address1: "Vlieghavenlaan 103",
          name: "moonbird.life",
          id: 1772054249604,
          province_code: "",
        },
        admin_graphql_api_id: "gid://shopify/LineItem/12058129793250",
        total_discount: "0",
        tax_lines: [
          {
            value: {
              rate: "0.21",
              price: "27.6",
              title: "NL btw",
              price_set: {
                shop_money: { amount: "27.60", currency_code: "EUR" },
                presentment_money: { amount: "27.60", currency_code: "EUR" },
              },
            },
          },
        ],
        title: "moonbird",
        price_set: {
          shop_money: { amount: "159.00", currency_code: "EUR" },
          presentment_money: { amount: "159.00", currency_code: "EUR" },
        },
        product_exists: true,
        requires_shipping: true,
        price: "159",
        discount_allocations: [],
      },
    },
  ],
  customer: {
    default_address: {
      province: null,
      country: "Netherlands",
      city: "Leiden",
      company: null,
      id: 7610897531106,
      country_code: "NL",
      address2: null,
      name: "Charlie Versteege",
      address1: "Tulpenstraat 8",
      last_name: "Versteege",
      customer_id: 6104672108770,
      first_name: "Charlie",
      phone: "0626706652",
      default: true,
      zip: "2313 XK",
      country_name: "Netherlands",
      province_code: null,
    },
    verified_email: true,
    currency: "EUR",
    tags: "Checkout Abandoned, D2C, Order Unfulfilled",
    total_spent: "159.00",
    id: 6104672108770,
    email: "charlieversteege@hotmail.com",
    note: null,
    accepts_marketing_updated_at: { value: "2022-02-19T19:47:25.000Z" },
    updated_at: { value: "2022-02-19T19:47:38.000Z" },
    admin_graphql_api_id: "gid://shopify/Customer/6104672108770",
    last_name: "Versteege",
    orders_count: 1,
    first_name: "Charlie",
    phone: null,
    state: "disabled",
    created_at: { value: "2022-02-19T19:47:24.000Z" },
    tax_exempt: false,
    last_order_name: "#5487",
    accepts_marketing: false,
    last_order_id: 4703747277026,
  },
  order_status_url:
    "https://shop.moonbird.life/31218532484/orders/8e8b35f8634cc8a78ba05e619efa030d/authenticate?key=e1e999f545a800c7e35e857e935f1ec9",
  app_id: 5667277,
  financial_status: "paid",
  _sdc_batched_at: { value: "2022-02-19T22:30:32.077Z" },
  cart_token: null,
  total_tax_set: {
    shop_money: { amount: "27.60", currency_code: "EUR" },
    presentment_money: { amount: "27.60", currency_code: "EUR" },
  },
  referring_site: "https://www.moonbird.life/",
  total_price: "159",
  _sdc_extracted_at: { value: "2022-02-19T22:27:05.500Z" },
  total_line_items_price: "159",
  confirmed: true,
  total_weight: 450,
  closed_at: null,
  subtotal_price: "159",
  note_attributes: [{ value: { name: "language-preferred", value: "nl" } }],
  test: false,
  shipping_address: {
    province: null,
    country: "Netherlands",
    city: "Leiden",
    company: null,
    longitude: 4.4884824,
    country_code: "NL",
    latitude: 52.1492386,
    address2: null,
    name: "Charlie Versteege",
    address1: "Tulpenstraat 8",
    last_name: "Versteege",
    first_name: "Charlie",
    phone: "0626706652",
    zip: "2313 XK",
    province_code: null,
  },
  total_tip_received: "0.00",
  total_tax: "27.6",
  payment_gateway_names: [{ value: "shopify_payments" }],
  cancel_reason: null,
  location_id: null,
  _sdc_shop_id: 31218532484,
  _sdc_shop_myshopify_domain: "moonbird-life.myshopify.com",
  _sdc_shop_name: "moonbird.life",
  landing_site_ref: null,
};

const Shipment = {
  shipmentId: "1038086908",
  shipmentDateTime: "2022-02-18T09:55:36+01:00",
  shipmentReference: "q6BBzrj",
  pickupPoint: false,
  order: {
    orderId: "1332178547",
    orderPlacedDateTime: "2022-02-16T10:55:21+01:00",
  },
  shipmentDetails: {
    salutation: "FEMALE",
    firstName: "R.",
    surname: "Harder",
    streetName: "Zichtweg",
    houseNumber: "22",
    zipCode: "2151WH",
    city: "NIEUW-VENNEP",
    countryCode: "NL",
    email: "2kpuihnpya555lcwsvzd7wsyv5a5g6@verkopen.bol.com",
    language: "nl",
  },
  billingDetails: {
    salutation: "FEMALE",
    firstName: "R.",
    surname: "Harder",
    streetName: "Zichtweg",
    houseNumber: "22",
    zipCode: "2151WH",
    city: "NIEUW-VENNEP",
    countryCode: "NL",
    email: "2kpuihnpya555lcwsvzd7wsyv5a5g6@verkopen.bol.com",
  },
  shipmentItems: [
    {
      orderItemId: "2855798427",
      fulfilment: {
        method: "FBR",
        distributionParty: "RETAILER",
        latestDeliveryDate: "2022-02-23",
      },
      offer: {
        offerId: "9f87965b-ac66-441d-8c70-8b41d1762d8c",
        reference: "5430002902036",
      },
      product: {
        ean: "5430002902036",
        title: "Moonbird adem- en slaapcoach Blue Green",
      },
      quantity: 1,
      unitPrice: 159.0,
      commission: 8.71,
    },
  ],
  transport: {
    transportId: "787890791",
    transporterCode: "BPOST_BE",
    trackAndTrace: "CD104453931BE",
  },
};

const Return = {
  returnId: "56596920",
  registrationDateTime: "2022-02-20T07:02:59+01:00",
  fulfilmentMethod: "FBR",
  returnItems: [
    {
      rmaId: "90651137",
      orderId: "1332132204",
      ean: "5430002902005",
      title: "Moonbird adem- en slaapcoach Sky Blue",
      expectedQuantity: 1,
      returnReason: {
        mainReason: "Klacht over artikel",
        detailedReason: "Anders, namelijk",
        customerComments:
          "Het leeglopen wordt niet gevoeld. Daarnaast maakt het apparaat een geluid. Is voor mij als HSP'er stress verhogend.",
      },
      trackAndTrace: "05112974719175",
      transporterName: "DPD Nederland",
      handled: false,
      customerDetails: {
        salutation: "FEMALE",
        firstName: "D",
        surname: "Stavast",
        streetName: "Haantje",
        houseNumber: "7",
        zipCode: "7874TK",
        city: "ODOORNERVEEN",
        countryCode: "NL",
        email: "2uu3nt7gn7fndwhzhwryq4klgn42wi@verkopen.bol.com",
      },
    },
  ],
};