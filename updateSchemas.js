require("dotenv").config();

const Warehouse = require("./warehouse")({
	datasetName: "bolcom",
  location: "eu-west1",
});

(async function(){
  await Warehouse.loadAndUpdateSchema("orders", './schemas/orders.json')
	console.log("[Orders] ✔")
  await Warehouse.loadAndUpdateSchema("shipments", './schemas/shipments.json')
	console.log("[Shipments] ✔")
  await Warehouse.loadAndUpdateSchema("returns", './schemas/returns.json')
	console.log("[Returns] ✔")
	console.log()
	console.log("Inserted Records and updated schema")
})()