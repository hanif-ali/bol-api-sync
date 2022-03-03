const transforms = {
  addressDetails: (addressDetails) => ({
    salutation: addressDetails.salutation || null,
    first_name: addressDetails.firstName || null,
    last_name: addressDetails.surname || null,
    address1: addressDetails.houseNumber || null,
    address2: addressDetails.streetName || null,
    city: addressDetails.city || null,
    country_code: addressDetails.countryCode || null,
    zip: addressDetails.zipCode || null,
    language: addressDetails.language || null,
  }),

  orderItem: (orderItem) => ({
    id: orderItem.orderItemId || null,
    cancellation_request: orderItem.cancellationRequest || null,
    offer: orderItem.offer?.offerId || null,
    offer_reference: orderItem.offer?.reference || null,
    product_title: orderItem.product?.title || null,
    product_ean: orderItem.product?.ean || null,
    quantity: orderItem.quantity || null,
    price:
      orderItem.quantity &&
      orderItem.unitPrice &&
      (orderItem.quantity * orderItem.unitPrice || null),
    unit_price: orderItem.unitPrice || null,
    commission: orderItem.commission || null,
    fulfilment: {
      method: orderItem?.fulfilment?.method || null,
      distribution_party: orderItem?.fulfilment?.distributionParty || null,
      latest_delivery_date: orderItem?.fulfilment?.latestDeliveryDate || null,
    }
  }),

  order: (order) => ({
    id: order.orderId || null,
    created_at: order.orderPlacedDateTime || null,
    date_time: order.orderPlacedDateTime || null,

    line_items: order.orderItems?.map(transforms.orderItem) || null,
    pickup_point: order.pickupPoint || null,

    email: order.billingDetails?.email || order.shipmentDetails?.email || null,
    contact_email: order.billingDetails?.email || order.shipmentDetails?.email || null,
    customer_locale: order.shipmentDetails?.language || null,

    shipping_address:
      order.shipmentDetails && transforms.addressDetails(order.shipmentDetails) || null,
    billing_address:
      order.billingDetails && transforms.addressDetails(order.billingDetails) || null,
  }),

  shipment: (shipment) => ({
    id: shipment.shipmentId || null,
    shipment_date: shipment.shipmentDateTime || null,
    date_time: shipment.shipmentDateTime || null,
    pickup_point: shipment.pickupPoint || null,
    order_id: shipment.order?.orderId || null,
    order_placed_date: shipment.order?.orderPlacedDateTime || null,

    shipment_details: shipment.shipmentDetails && transforms.addressDetails(shipment.shipmentDetails) || null,
    billing_details: shipment.billingDetails && transforms.addressDetails(shipment.billingDetails) || null,

    line_items: shipment.shipmentItems?.map(transforms.orderItem) || null,

    transport: {
      transport_id: shipment.transport?.transportId || null,
      transporter_code: shipment.transport?.transporterCode || null,
      track_and_trace: shipment.transport?.trackAndTrace || null,
    },
  }),

  return: (rt) => ({
    id: rt.returnId || null,
    return_register_date: rt.registrationDateTime || null,
    fulfilmentMethod: rt.fulfilmentMethod || null,
    date_time: rt.registrationDateTime || null,

    line_items: rt.returnItems?.map((item) => ({
      rma_id: item.rmaId || null,
      order_id: item.orderId || null,
      ean: item.ean || null,
      title: item.title || null,
      customer_details: item.customerDetails && transforms.addressDetails(item.customerDetails) || null,
      handled: item.handled || null,
      main_reason: item.returnReason?.mainReason || null,
      detailed_reason: item.returnReason?.detailedReason || null,
      customer_comments: item.returnReason?.customerComments || null,
      processing_results: {
        quantity: item.processingResults?.quantity || null,
        processing_result: item.processingResults?.processingResult || null,
        handling_result: item.processingResults?.handlingResult || null,
        processing_date_time: item.processingResults?.processingDateTime || null
      },
      transporter_name: item.transporterName || null,
      track_and_trace: item.trackAndTrace || null,
      expected_quantity: item.expectedQuantity || null,
    })),
  }),
};

module.exports = transforms;
