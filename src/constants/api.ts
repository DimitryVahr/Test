/** Методы API */
export const API_ENDPOINT: Record<string, string> = {
  /**
   * Отправка сообщения из формы обратной связи (в сваггере не описано)
   */
  contact: '/api/aero/default/contact',
  /**
   * Авторизация пользователя
   */
  login: '/api/users/security/login',
  /**
   * Запрос на восстановление пароля
   */
  recoveryRequest: '/api/users/recovery/request',
  /**
   * Восстановление пароля
   */
  recoveryReset: '/api/users/recovery/reset',
  /**
   * Регистрация пользователя
   */
  register: '/api/users/registration/register',
  /**
   * Поиск организаций
   */
  suggestParty: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party',
  /**
   * Поиск банков
   */
  suggestBank: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank',
  /**
   * Загрузка изображений
   */
  uploadImage: '/api/aero/default/upload',
  /**
   * Проверка пароля пользователя перед его сменой
   */
  checkPassword: '/api/users/profile/check-password',
  /**
   * Смена пароля пользователя в личном кабинете
   */
  changePassword: '/api/users/recovery/change-password',
  /**
   * Получение информации о пользователе
   */
  getUserInfo: '/api/users/profile/info',
  /**
   * Погода в Петропавловске-Камчатском
   */
  getWeather: 'https://api.openweathermap.org/data/2.5/weather',
  /**
   * Получение списка стран
   */
  getStates: '/api/aero/default/states',
  /**
   * Получить типы документов, подтверждающих личность (Не описано в сваггере)
   */
  getDocumentTypes: '/api/aero/default/document-types',
  /**
   * Подтверждение/обновление профиля
   */
  updateProfile: '/api/users/profile/update',
  /**
   * Подтверждение/обновление профиля
   */
  editProfile: '/api/users/profile/edit',
  /**
   * Получение списка рейсов, на которые записывался юзер
   */
  flightRecords: '/api/aero/profile/requests',
  /**
   * Получение конкретного рейса
   */
  flightRecord: '/api/aero/profile/request',
  /**
   * Получение информации о истории бонусного счета пользователя. Начисление, заморозка, списание и т.д.
   */
  bonusesTransaction: '/api/aero/bonus/transactions',
  /**
   * Получение информации о пассажирах
   */
  passengersInfo: '/api/aero/profile/passengers',
  /**
   * Изменение номера телефона пользователя
   */
  changePhone: 'api/users/recovery/change-phone',
  /**
   * Смена электронной почты пользователя в личном кабинете
   */
  changeEmail: '/api/users/security/change-email',
  /**
   * Создание пассажира
   */
  createPassenger: '/api/aero/profile/create-passenger',
  /**
   * Проверка бонусной карты перед обновлением данных/записью на рейс
   */
  checkBonus: '/api/aero/default/check-bonus',
  /**
   * Получение данных пассажира
   */
  passenger: '/api/aero/profile/passenger',
  /**
   * Обновление данных о пассажире
   */
  updatePassenger: '/api/aero/profile/update-passenger',
  /**
   * Удаление пассажира
   */
  deletePassenger: '/api/aero/profile/delete-passenger',
  /**
   * Получение информации по бонусам
   */
  getBonus: '/api/aero/bonus',
  /**
   * Получение списка точек отправления
   */
  getSections: '/api/aero/default/sections',
  /**
   * Получение информации о свободных местах на маршрут
   */
  getAvailableCapacity: '/api/aero/default/get-capacity-available',
  /**
   * Запись на рейс
   */
  submitFlight: '/api/aero/default/submit',
  /**
   * Заказ вертолета
   */
  orderHelicopter: '/api/aero/default/helicopter'
}

/** Токены авторизаций */
export const API_TOKEN = {
  suggestions: 'Token 55c18cbf309296f0897555b255c2538d1a611dd7',
  weather: 'e51d5e5812fbec43f206e58071431ecc'
}
