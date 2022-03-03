require("dotenv").config();

const bol = require("./bol")({
  clientSecret: process.env.BOL_CLIENT_SECRET,
  clientId: process.env.BOL_CLIENT_ID,
});
const Warehouse = require("./warehouse")({
	datasetName: process.env.BQ_DATASET_NAME,
  location: process.env.BQ_DATASET_LOCATION,
})
const Transforms = require("./transforms");


async function getResoucesFromIds(resourceName, idList, transformation){
  let responses = []
  const errors = []

  for (let id of idList){
    try{
      const order = await bol._retrieveResource(resourceName, id)
      responses.push(order)
    } catch (err) {
      errors.push(err)
    }
  }

  if (transformation) responses = responses.map(transformation)

  if (errors.length > 0){
    console.log(`${errors.length} Requests for ${resourceName} failed`)
    console.log(`Error for first failure: ${errors[0]}`)
  }

  return responses

}

async function getNewOrders(lastOrderDateTime){
  const orders = await bol.getOrders();

  const orderIdDates = orders.map((order) => ({
    orderId: order.orderId,
    orderPlacedDateTime: new Date(order.orderDateTime),
  }));

  const newOrderIds = orderIdDates
    .filter((order) => order.orderPlacedDateTime > lastOrderDateTime)
    .map((order) => order.orderId);

  console.debug(`${newOrderIds.length} new Orders found`)

  return getResoucesFromIds("orders", newOrderIds, Transforms.order)
}

async function getNewShipments(lastShipmentDateTime){
  const shipments = await bol.getShipments();

  const shipmentIdDates = shipments.map((shipment) => ({
    shipmentId: shipment.shipmentId,
    shipmentPlacedDateTime: new Date(shipment.shipmentDateTime),
  }));

  const newShipmentIds = shipmentIdDates
    .filter((shipment) => shipment.shipmentPlacedDateTime > lastShipmentDateTime)
    .map((shipment) => shipment.shipmentId);

  console.debug(`${newShipmentIds.length} new Shipments found`)

  return getResoucesFromIds("shipments", newShipmentIds, Transforms.shipment)
}

async function getNewReturns(lastReturnDateTime){
  const returns = await bol.getReturns()

  const returnIdDates = returns.map((rt) => ({
    returnId: rt.returnId,
    registrationDateTime: new Date(rt.registrationDateTime),
  }));

  const newReturnIds = returnIdDates
    .filter((rt) => rt.registrationDateTime > lastReturnDateTime)
    .map((rt) => rt.returnId);

  console.log(`${newReturnIds.length} new Returns found`)
  return getResoucesFromIds("returns", newReturnIds, Transforms.return)
}

(async function(){

  const lastRecordTime = await Warehouse.getLatestRecordTime("orders", "date_time")
  const newOrders = await getNewOrders(lastRecordTime)
  if (newOrders.length) await Warehouse.insertRows("orders", newOrders)
  console.log("[Orders] ✔")

  const lastRecordTime2 = await Warehouse.getLatestRecordTime("shipments", "date_time")
  const newShipments = await getNewShipments(lastRecordTime2)
  if (newShipments.length) await Warehouse.insertRows("shipments", newShipments)
  console.log("[Shipments] ✔")

  const lastRecordTime3 = await Warehouse.getLatestRecordTime("returns", "date_time")
  const newReturns = await getNewReturns(lastRecordTime3)
  if (newReturns.length) await Warehouse.insertRows("returns", newReturns)
  console.log("[Returns] ✔")

})()