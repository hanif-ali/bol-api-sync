require("dotenv").config();

const bol = require("./bol")({
  clientSecret: process.env.BOL_CLIENT_SECRET,
  clientId: process.env.BOL_CLIENT_ID,
});
const Warehouse = require("./warehouse")({
	datasetName: "bolcom",
  location: "eu-west1",
})
const Transforms = require("./transforms");
// const {ordersSchema} = require("./schemas");

// (async function(){
// 	const [rows] = await Warehouse.getLatestRecord("orders", "updated_at")
// 	const lastOrderDate = rows.length ? new Date(rows[0].processedAt) : new Date(0);
// 	console.log(JSON.stringify(rows[0]))
// })()

(async function(){
  const table = Warehouse.createTable("orders", './schemas/newOrders.json')
	// const [rows] = await Warehouse.getLatestRecord("orders", "processedAt")
	// const lastOrderDate = rows.length ? new Date(rows[0].processedAt) : new Date(0);
	console.log(table)
})()

// (async function () {
//   const orders = await bol.getOrders();
//   lastOrderDateTime = new Date("2022-02-11T10:14:25+01:00");

//   const orderIdDates = orders.map((order) => ({
//     orderId: order.orderId,
//     orderPlacedDateTime: new Date(order.orderPlacedDateTime),
//   }));

//   const newOrderIds = orderIdDates
//     .filter((order) => order.orderPlacedDateTime > lastOrderDateTime)
//     .map((order) => order.orderId);

//   const newOrderPromises = newOrderIds.map((newOrderId) => {
//     return bol.getOrder(newOrderId);
//   });
//   const newOrders = await Promise.all(newOrderPromises)
// 	const newOrdersTransformed = newOrders.map(order => Transforms.order(order))

//   console.log(newOrdersTransformed);
// })();


// (async function () {
//   const orders = await bol.getOrders();
//   lastOrderDateTime = new Date("2022-02-11T10:14:25+01:00");

//   const orderIdDates = orders.map((order) => ({
//     orderId: order.orderId,
//     orderPlacedDateTime: new Date(order.orderPlacedDateTime),
//   }));

//   const newOrderIds = orderIdDates
//     .filter((order) => order.orderPlacedDateTime > lastOrderDateTime)
//     .map((order) => order.orderId);

//   const newOrderPromises = newOrderIds.map((newOrderId) => {
//     return bol.getOrder(newOrderId);
//   });
//   const newOrders = await Promise.all(newOrderPromises)
// 	const newOrdersTransformed = newOrders.map(order => Transforms.order(order))

//   console.log(JSON.stringify(newOrdersTransformed));
// })();


// (async function () {
//   const orders = await bol.getReturns();
//   lastOrderDateTime = new Date("2022-02-11T10:14:25+01:00");

//   const orderIdDates = orders.map((order) => ({
//     orderId: order.returnId,
//     orderPlacedDateTime: new Date(order.registrationDateTime),
//   }));

//   const newOrderIds = orderIdDates
//     .filter((order) => order.orderPlacedDateTime > lastOrderDateTime)
//     .map((order) => order.orderId);

//   const newOrderPromises = newOrderIds.slice(0,1).map((newOrderId) => {
//     return bol.getReturn(newOrderId);
//   });
//   const newOrders = await Promise.all(newOrderPromises)
// 	const newOrdersTransformed = newOrders.map(order => Transforms.return(order))

//   console.log(JSON.stringify(newOrdersTransformed));
// })();
