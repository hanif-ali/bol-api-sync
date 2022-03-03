require("dotenv").config();

const bol = require("./bol")({
  clientSecret: process.env.BOL_CLIENT_SECRET,
  clientId: process.env.BOL_CLIENT_ID,
});
const Warehouse = require("./warehouse")({
	datasetName: "bolcom",
  location: "EU",
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

  // let shipments = await bol._listResource("shipments", 0, 10);
  // for (let i of [3, 2, 1]){
  //   const newShipments = await bol._listResource("shipments", 0, i);
  //   shipments = [...shipments, ...newShipments]
  // }

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
  // Warehouse.getLatestRecordTime("orders", "date_time").then((lastRecordTime) => {
  //   getNewOrders(lastRecordTime).then(newOrders => {
  //     if (newOrders.length) Warehouse.insertRows("orders", newOrders)
  //   })
  // })

  // Warehouse.getLatestRecordTime("shipments", "date_time").then((lastRecordTime) => {
  //   getNewShipments(lastRecordTime).then(newShipments => {
  //     console.log(newShipments)
      // if (newShipments.length) Warehouse.insertRows("shipments", newShipments)
  //   })
  // })

  const lastRecordTime = await Warehouse.getLatestRecordTime("returns", "date_time")
  const newReturns = await getNewReturns(lastRecordTime)
  if (newReturns.length) await Warehouse.insertRows("returns", newReturns)
  console.log("[Returns] ✔")

  // const fs = require("fs").promises
  // allReturns = await getNewReturns(new Date(0))
  // console.log(allReturns)
  // await fs.writeFile("dump.json", JSON.stringify(allReturns))
})()