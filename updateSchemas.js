require("dotenv").config();

const Warehouse = require("./warehouse")({
	datasetName: "bolcom",
  location: "eu",
});

(async function(){
	// await Warehouse.loadAndUpdateSchema("orders", './orders.json')
	console.log("[Orders] ✔")
  // await Warehouse.loadAndUpdateSchema("shipments", './schemas/shipments.json')
	console.log("[Shipments] ✔")
	await Warehouse.loadAndUpdateSchema("return", './nljson.json')
	console.log("[Returns] ✔")
	console.log()
	console.log("Inserted Records and updated schema")
})()
