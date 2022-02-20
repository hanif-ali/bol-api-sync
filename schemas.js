const ordersSchema = [
  { name: "Name", type: "STRING", mode: "REQUIRED" },
  { name: "Age", type: "INTEGER" },
  { name: "Weight", type: "FLOAT" },
  { name: "IsMagic", type: "BOOLEAN" },
];

module.exports = { ordersSchema };