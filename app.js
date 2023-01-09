console.log("App");

// получ express ч/з require
const express = require("express");
// подкл.ф.наст.конфиг.
const config = require("config");
// подкл. mongoDB ч/з mongoose для базы данных
const mongoose = require("mongoose");

// server,резулт.раб.fn express
const app = express();

// в конст PORT запис.порт из config или 5000
const PORT = config.get("port") || 5000;

// fn обёртк. для mongoose
async function start() {
  // всё верно
  try {
    // await для ожидан. промиса. Вызов mongoose.мтд.connect. 1ый парам url адрес с БД(из config), 2ой парам. набор опций
    await mongoose.connect(config.get("mongoUri"), {});
  } catch (error) {
    // отраб.ошб.
    console.log("Server Error", error.message);
    // выход ч/з глоб.проц.мтд .exit
    process.exit(1);
  }
}

// вызов сервера с паредачей порта и fn колбэк (listen - слушатель)
app.listen(PORT, () =>
  console.log(`Сервер начал прослушивание запросов на порту ${PORT}.....`)
);
