// fn по взаимодейств.с польз. (регистр.,авториз.,получ.польз.)

// подкл.модели пользователей и ролей
const User = require("../models/User");
const Role = require("../models/Role");
// подкл. библ. для шифрование пароля нов.польз.
const bcrypt = require("bcryptjs");
// подкл. валидацию
const { validationResult } = require("express-validator");

// обьяв.кл.(для компановки) с неск.fn
class authController {
  // ^ Сделать  проверку по UlbiTV
  async register(req, res) {
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
      const { email, password /* , fullName, avatarUrl */ } = req.body;

      // ЛОГИКА регистр.нов.польз. + проверки
      // ^ сделать проверку для fullName|userName

      // проверка существ.email по совпад.ключ и значен.
      const candidate = await User.findOne({ email });
      // е/и польз.есть - возвращ.Ответ в смс ошб.
      if (candidate) {
        return res
          .status(400)
          .json({ message: `Такой пользователь уже есть - ${candidate}.` });
      }

      // `ждём` hashирование/шифрование пароля ч/з bcryptjs. 1ый пароль, 2ой степень шифр.
      // const salt = await bcrypt.getSalt(12);
      const hashedPassword = await bcrypt.hash(password, 12 /* salt */);

      // СОЗД.НОВ.ПОЛЬЗОВАТЕЛЯ (пароль совпад.с шифрованым)
      const user = new User({
        email,
        password: hashedPassword,
        // fullName,
        // avatarUrl,
      });

      // ждём сохран.от польз.
      await user.save();

      // ^ TOKEN
      // ! ЗДЕСЬ ИЛИ РЯДОМ по https://www.youtube.com/watch?v=d_aJdcDq6AY ИЛИ https://www.youtube.com/watch?v=GQ_pTmcXNrQ&t=935s

      // promis завершён,польз.созд.в БД. Ответ fronty смс
      res.status(201).json({
        message: `Пользователь с email ${email} создан и зарегистрирован`,
      });
      // fullName ${fullName} и
    } catch (error) {
      // общ.отв. на серв.ошб. в json смс
      res
        .status(500)
        .json({ message: `Не удалось зарегистрироваться - ${error}.` });
    }
  }

  // ^ Прописать логику для login ВМ + UlbiTV
  async login(req, res) {
    try {
      res.json("login");
    } catch (error) {}
  }

  async getUsers(req, res) {
    try {
      // кастыль для созд. ролей в БД
      // !!! Ошб. UlbiTV при подкл. к MongoDB (откл.в России)
      // ! Ошибка сервера: неверная аутентификация: не удалось выполнить аутентификацию.
      /* // ! Не удалось отправить запрос Ошибка: подключение ECONNREFUSED 127.0.0.1:3005 */
      // const userRole = new Role();
      // const adminRole = new Role({ value: "ADMIN" });
      // await userRole.save();
      // await adminRole.save();
      // ^ Раб в get Postman
      res.json("getUsers 33333");
    } catch (error) {}
  }
}

// экспорт объ.кл.
module.exports = new authController();
