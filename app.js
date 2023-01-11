// получ express ч/з require для прилож.
const express = require("express");
// подкл.ф.наст.конфигураций
const config = require("config");
// подкл. ф.настр.маршрутов
const authRoutes = require("./routes/auth.routes");
// подкл. mongoDB ч/з mongoose для базы данных
const mongoose = require("mongoose");
// от ошибки устаревшего кода
mongoose.set("strictQuery", false);

// в конст PORT запис.порт из config (сист.перем.) или 5000
const PORT = config.get("port") /* process.env.PORT */ || 5000;

// прилож на exrp,server,резулт.раб.fn express
const app = express();
// парсим json сервером
app.use(express.json());
// прослуш. маршруты для обраб.API запросов с fronta. 1ый str. префикс для пути(/api/auth), 2ой подкл. middleware
app.use("/auth", authRoutes /* require("./routes/auth.routes") */);

// Запуск Сервера | const start = () => {}. fn обёртк. для mongoose
async function start() {
  // всё верно
  try {
    // подкл. к БД. await для ожидан. промиса. Вызов mongoose.мтд.connect. 1ый парам url адрес с БД(из config), 2ой парам. набор опций
    await mongoose.connect(config.get("mongoUri"), {
      // парам из видео для успешн.connect
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    // логика приложен. Получ.запроса на гл.стр. В Ответ h5 с текстом
    app.get("/", (req, res) => {
      res.send("<h5>Старт MERN 0.5</h5>");
    });
    // `прослушка` сервера на PORT c fn колбэк при успехе
    app.listen(PORT, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`Сервер начал прослушивание запросов на порту ${PORT}.....`);
    });
  } catch (error) {
    // отраб.ошб.
    console.log("Ошибка сервера", error.message);
    // выход ч/з глоб.проц.мтд .exit
    process.exit(1);
  }
}
start();
