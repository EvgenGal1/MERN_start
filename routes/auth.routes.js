// маршрутизатор аутентификации
// подкл. Маршрутизатор
const { Router } = require("express");
// созд. Маршрутизатор
const router = Router();
// подкл.модел.польз.
const User = require("../models/User");

// обраб 2 post запроса(inpointer). 1ый парам. конкатенация пути с /api/auth, 2ой fn логики,асинхр,Запрос,Ответ
// Регистрация. /api/auth/register
router.post("/register", async (req, res) => {
  // базов.логика с обраб.ошб.
  try {
    // получ.данн.с fronta
    const { email, password } = req.body;

    // логика регистр.нов.польз.+ проверки
    // проверка существ.email по совпад.ключ и значен.
    const candidate = await User.findOne({ email });
    // е/и польз.есть - Ответ в смс
    if (candidate) {
      return res
        .status(400)
        .json({ message: `Такой пользователь уже есть - ${candidate}.` });
    }
  } catch (error) {
    // общ.отв. на серв.ошб. в json смс
    res.status(500).json({ message: `Что-то пошло не так - ${error}.` });
  }
});

// Логин
router.post("/login", async (req, res) => {});

// экспорт объ.Маршрутизатора
module.exports = router;
