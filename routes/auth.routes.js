// маршрутизатор запросов
// подкл. Маршрутизатор
const Router = require("express");
// подкл. fn взаим-ия с польз.
const controller = require("./auth.controller");
// подкл. валидацию
const { check } = require("express-validator");

// созд. объ. Маршрутизатор. Возможно прослуш.запросов (GET, POST, DELETE,..)
const router = new Router();

// обраб 2 post запроса(inpointer). парам.: str.конкатенация пути с /api/auth, масс.валидации, fn логики(асинхр,Запрос,Ответ)
// Регистрация. /api/auth/register
router.post(
  "/register",
  // масс. middleware для валидации. `Проверка`(чего,ошб.).валидатор(на email) | ~кастом - проверка(чего).условие.смс ошб.
  [
    check("email", "Некорректый email").isEmail(),
    check("password")
      .not()
      .isIn(["123", "password123", "god123", "qwerty123", "123qwerty"])
      .withMessage("Не используйте обычные значения в качестве пароля")
      .isLength({ min: 6 })
      .withMessage("Минимальная длина пароля 6 символов")
      .matches(/\d/)
      .withMessage("Пароль должен содержать число"),
  ],
  // fn отработки логики. trycatch переехал в controller.register
  controller.register
);

// Логин
router.post("/login", /* async (req, res) => {} */ controller.login);

// обраб.get запрос (эксперем.,доступы,запреты)
router.get("/users", controller.getUsers);

// экспорт объ.Маршрутизатора
module.exports = router;
