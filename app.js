console.log("App");

// получ express ч/з require
const express = require("express");
// подкл.ф.наст.конфиг.
const config = require("config");

// server,резулт.раб.fn express
const app = express();

// в конст PORT запис.порт из config или 5000
const PORT = config.get("port") || 5000;

// вызов сервера с паредачей порта и fn колбэк (listen - слушатель)
app.listen(PORT, () =>
  console.log(`Сервер начал прослушивание запросов на порту ${PORT}.....`)
);
