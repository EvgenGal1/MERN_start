// маршрутизатор аутентификации
// подкл. Маршрутизатор
const { Router } = require("express");
// подкл.модел.польз.
const User = require("../models/User");
// подкл. библ. для шифрование пароля нов.польз.
const bcrypt = require("bcryptjs");
// подкл. валидацию
const { check, validationResult } = require("express-validator");
// созд. Маршрутизатор
const router = Router();

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
  async (req, res) => {
    // базов.логика с обраб.ошб.
    try {
      // проверка вход.полей на валидацию
      const errorsValid = validationResult(req);
      // е/и проверка не прошла(не пусто) - возвращ.Ответ на front смс ошб.(кастомизируем) + errors.масс.
      if (errorsValid.isEmpty()) {
        return res.status(400).json({
          errors: errorsValid.array(),
          message: "Некорректые данные при регистрации",
        });
      }

      // получ.данн.с fronta
      const { email, password } = req.body;

      // ЛОГИКА регистр.нов.польз. + проверки
      // проверка существ.email по совпад.ключ и значен.
      const candidate = await User.findOne({ email });
      // е/и польз.есть - возвращ.Ответ в смс ошб.
      if (candidate) {
        return res
          .status(400)
          .json({ message: `Такой пользователь уже есть - ${candidate}.` });
      }

      // `ждём` hashирование/шифрование пароля ч/з bcryptjs. 1ый пароль, 2ой степень шифр.
      const hashedPassword = await bcrypt.hash(password, 12);
      // созд.нов.польз.(пароль совпад.с шифрованым)
      const user = new User({ email, password: hashedPassword });

      // ждём сохран.от польз.
      await user.save();

      // promis завершён,польз.созд.в БД. Ответ fronty смс
      res.status(201).json({ message: `Пользователь с email ${email} создан` });
    } catch (error) {
      // общ.отв. на серв.ошб. в json смс
      res.status(500).json({ message: `Что-то пошло не так - ${error}.` });
    }
  }
);

// Логин
router.post("/login", async (req, res) => {});

// экспорт объ.Маршрутизатора
module.exports = router;
