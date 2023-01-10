console.log("App");

// получ express ч/з require
const express = require("express");
// подкл.ф.наст.конфиг.
const config = require("config");
// подкл. mongoDB ч/з mongoose для базы данных
const mongoose = require("mongoose");
// от ошибки устаревшего кода
mongoose.set("strictQuery", false);

// server,резулт.раб.fn express,прилож exrp
const app = express();

// Routs для обраб.API запросов с fronta. 1ый str. префикс для пути, 2ой подкл. middleware
app.use("/api/auth", require("./routes/auth.routes"));

// в конст PORT запис.порт из config или 5000
const PORT = config.get("port") || 5000;

// fn обёртк. для mongoose
async function start() {
  // всё верно
  try {
    // await для ожидан. промиса. Вызов mongoose.мтд.connect. 1ый парам url адрес с БД(из config), 2ой парам. набор опций
    await mongoose.connect(config.get("mongoUri"), {
      // парам из видео для успешн.connect
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    // логика приложен. Получ.запроса на гл.стр. В Ответ h5 с текстом
    app.get("/", (req, res) => {
      res.send("<h5>Старт MERN</h5>");
    });
    // прослушка. Вызов сервера с паредачей порта и fn колбэк (listen - слушатель)
    app.listen(PORT, () =>
      console.log(`Сервер начал прослушивание запросов на порту ${PORT}.....`)
    );
  } catch (error) {
    // отраб.ошб.
    console.log("Server Error", error.message);
    // выход ч/з глоб.проц.мтд .exit
    process.exit(1);
  }
}
start();
