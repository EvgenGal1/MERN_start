// модель для работы с пользователями
// для созд. модели из mongoos берём Schema и modal + Types для Прилож.Сокращ.Ссылок
const { Schema, model, Types } = require("mongoose");

// созд.Схему ч/з констр.кл.Schema
const schema = new Schema({
  // поля для польз. Кл.String,обязательное,уникальное
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // для Прилож.Сокращ.Ссылок. Свой масс.ссылок,Types связка мод.польз. и записей в БД, ref привязка к коллекции
  Links: [{ type: Types.ObjectId, ref: "Link" }],
});

// экспорт резул.раб.fn modal с назв. модели и схемой работы
model.exports = model("User", schema);
