// модель для работы с пользователями
// для созд. модели из mongoos берём Schema и modal + Types для Прилож.Сокращ.Ссылок
const { Schema, model, Types } = require("mongoose");

// созд.Схему хранения в БД ч/з констр.кл.Schema
const User = new Schema({
  // поля для польз. Кл.String,обязательное,уникальное
  fullName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // id формир.авто
  // для Прилож.Сокращ.Ссылок. Свой масс.ссылок,Types связка мод.польз. и записей в БД, ref привязка к коллекции
  Links: [{ type: Types.ObjectId, ref: "Link" }],
  // массив роллей с ссылкой на др.модель
  roles: [{ type: String, ref: "Role" }],
});

// экспорт modal(резул.раб.fn) с назв.модели и схемой раб./созд.
model.exports = model("User", User);
