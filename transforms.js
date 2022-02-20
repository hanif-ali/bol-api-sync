const transforms = {
  addressDetails: (addressDetails) => ({
    salutation: addressDetails.salutation,
    first_name: addressDetails.firstName,
    last_name: addressDetails.surname,
    address1: addressDetails.houseNumber,
    address2: addressDetails.streetName,
    city: addressDetails.city,
    country_code: addressDetails.countryCode,
    zip: addressDetails.zipCode,
    language: addressDetails.language,
  }),

  orderItem: (orderItem) => ({
    id: orderItem.orderItemId,
    cancellation_request: orderItem.cancellationRequest,
    offer: orderItem.offer.offerId,
    product_title: orderItem.product.title,
    product_ean: orderItem.product.ean,
    quantity: orderItem.quantity,
    price: orderItem.quantity * orderItem.unitPrice,
    unit_price: orderItem.unitPrice,
    commission: orderItem.commission,
  }),

  order: (order) => ({
    id: order.orderId,
    created_at: order.orderPlacedDateTime,

    line_items: order.orderItems.map(transforms.orderItem),
    pickup_point: order.pickupPoint,

    email: order.billingDetails.email || order.shipmentDetails.email,
    contact_email: order.billingDetails.email || order.shipmentDetails.email,
    customer_locale: order.shipmentDetails.language,

    shipping_address: transforms.addressDetails(order.shipmentDetails),
    billing_address: transforms.addressDetails(order.billingDetails),
  }),

  shipment: (shipment) => ({
    id: shipment.shipmentId,
    shipment_date: shipment.shipmentDateTime,
    pickup_point: shipment.pickupPoint,
    order_id: shipment.order.orderId,

    shipment_details: transforms.addressDetails(shipment.shipmentDetails),
    billing_details: transforms.addressDetails(shipment.billingDetails),

    line_items: shipment.shipmentItems.map(transforms.orderItem),

    transport: {
      transport_id: shipment.transport.transportId,
      transporter_code: shipment.transport.transporterCode,
      track_and_trace: shipment.transport.trackAndTrace,
    },
  }),

  return: (rt) => ({
    id: rt.returnId,
    return_register_date: rt.registrationDateTime,
    fulfilmentMethod: rt.fulfilmentMethod,

    line_items: rt.returnItems.map((item) => ({
      rma_id: item.rmaId,
      order_id: item.orderId,
      ean: item.ean,
      title: item.title,
      customer_details: transforms.addressDetails(item.customerDetails),
      handled: item.handled,
      main_reason: item.returnReason.mainReason,
      detailed_reason: item.returnReason.detailedReason,
      customer_comments: item.returnReason.customerComments,
    })),
  }),
};

module.exports = transforms;
