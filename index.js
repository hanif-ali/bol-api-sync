require("dotenv").config();

const bol = require("./bol")({
  clientSecret: process.env.BOL_CLIENT_SECRET,
  clientId: process.env.BOL_CLIENT_ID,
});
const Warehouse = require("./warehouse")({
	datasetName: "bolcom",
  location: "eu-west1",
})
const { Transform } = require("stream");
const Transforms = require("./transforms");

// (async function(){
// 	const [rows] = await Warehouse.getLatestRecord("orders", "updated_at")
// 	const lastOrderDate = rows.length ? new Date(rows[0].processedAt) : new Date(0);
// 	console.log(JSON.stringify(rows[0]))
// })()

// (async function(){
//   const table = Warehouse.createTable("orders", './schemas/newOrders.json')
// 	// const [rows] = await Warehouse.getLatestRecord("orders", "processedAt")
// 	// const lastOrderDate = rows.length ? new Date(rows[0].processedAt) : new Date(0);
// 	console.log(table)
// })()

async function getNewEntities(){
  const orders = await bol.getOrders();
  lastOrderDateTime = new Date("2022-02-11T10:14:25+01:00");

  const orderIdDates = orders.map((order) => ({
    orderId: order.orderId,
    orderPlacedDateTime: new Date(order.orderDateTime),
  }));

  const newOrderIds = orderIdDates
    .filter((order) => order.orderPlacedDateTime > lastOrderDateTime)
    .map((order) => order.orderId);

  console.debug(`${newOrderIds.length} new Orders found`)
  const responses = []
  const errors = [] 
  
  for (let orderId of newOrderIds.slice(1, 5)){
    try{
      const order = await bol.getOrder(orderId)
      responses.push(order)
    } catch (err) {
      errors.push(err)
    }
  }
  const newOrders = responses.map(order => Transforms.order(order))

  if (errors.length > 0){
    console.log(`${errors.length} Requests for Orders failed`)
    console.log(`Error for first failure: ${errors[0].reason}`)
  }

  return newOrders
}

async function syncOrders(){
  const orders = await bol.getOrders();
  lastOrderDateTime = new Date("2022-02-11T10:14:25+01:00");

  const orderIdDates = orders.map((order) => ({
    orderId: order.orderId,
    orderPlacedDateTime: new Date(order.orderDateTime),
  }));

  const newOrderIds = orderIdDates
    .filter((order) => order.orderPlacedDateTime > lastOrderDateTime)
    .map((order) => order.orderId);

  console.debug(`${newOrderIds.length} new Orders found`)
  const responses = []
  const errors = [] 
  
  for (let orderId of newOrderIds.slice(1, 5)){
    try{
      const order = await bol.getOrder(orderId)
      responses.push(order)
    } catch (err) {
      errors.push(err)
    }
  }
  const newOrders = responses.map(order => Transforms.order(order))

  if (errors.length > 0){
    console.log(`${errors.length} Requests for Orders failed`)
    console.log(`Error for first failure: ${errors[0].reason}`)
  }

  return newOrders
}

async function syncShipments(){
  const shipments = await bol.getShipments();
  lastShipmentDateTime = new Date("2022-02-11T10:14:25+01:00");

  const shipmentIdDates = shipments.map((shipment) => ({
    shipmentId: shipment.shipmentId,
    shipmentPlacedDateTime: new Date(shipment.shipmentDateTime),
  }));

  const newShipmentIds = shipmentIdDates
    .filter((shipment) => shipment.shipmentPlacedDateTime > lastShipmentDateTime)
    .map((shipment) => shipment.shipmentId);

  console.debug(`${newShipmentIds.length} new Shipments found`)

  const responses = []
  const errors = [] 
  
  for (let shipmentId of newShipmentIds.slice(1, 5)){
    try{
      const shipment = await bol.getShipment(shipmentId)
      responses.push(shipment)
    } catch (err) {
      errors.push(err)
    }
  }
  const newShipments = responses.map(shipment => Transforms.shipment(shipment))

  if (errors.length > 0){
    console.log(`${errors.length} Requests for Shipments failed`)
    console.log(`Error for first failure: ${errors[0].reason}`)
  }

  return newShipments
}

async function syncReturns(){
  const returns = await bol.getReturns();
  lastReturnDateTime = new Date("2022-02-11T10:14:25+01:00");

  const returnIdDates = returns.map((rt) => ({
    returnId: rt.returnId,
    registrationDateTime: new Date(rt.registrationDateTime),
  }));

  const newReturnIds = returnIdDates
    .filter((rt) => rt.registrationDateTime > lastOrderDateTime)
    .map((rt) => rt.returnId);

  const responses = []
  const errors = [] 
  
  for (let returnId of newReturnIds.slice(1, 5)){
    try{
      const rt = await bol.getReturn(returnId)
      responses.push(rt)
    } catch (err) {
      errors.push(err)
    }
  }
  const newReturns = responses.map(rt => Transforms.return(rt))
  if (errors.length > 0){
    console.log(`${errors.length} Requests for Returns failed`)
    console.log(`Error for first failure: ${errors[0].reason}`)
  }

  return newReturns
}

(async function(){
  // const shipments = await syncShipments()
  const orders = await syncOrders()
  // const returns = await syncReturns()
  // console.log({shipments, orders, returns})
})()