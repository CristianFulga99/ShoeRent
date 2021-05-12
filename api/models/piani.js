const mongoose = require("mongoose");

const pianisSchema = new mongoose.Schema({
  nomePiano: {
    type: "String",
  },
  costo: {
    type: "String",
  },
  durata: {
    type: "String",
  },
  shoes: {
    type: ["Mixed"],
  },
});

module.exports = mongoose.model("Piani", pianisSchema, "Piani");
