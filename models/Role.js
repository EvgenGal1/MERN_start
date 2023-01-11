const { Schema, model } = require("mongoose");

// Схему роли в БД
const Role = new Schema({
  // по умолч. роль USER и уникальна
  value: { type: String, unique: true, default: "USER" },
});

// экспорт modal(резул.раб.fn) с назв.модели и схемой раб./созд.
model.exports = model("Role", Role);
