#language:ru

Функционал: Монипуляции пользователями
  Как администратор
  Я хочу иметь возможность удалять, редактировать и добавлять пользователей

  @createInstitution
  Сценарий:
    Допустим я нахожусь на странице "login"
    Если я заполняю поля формы:
      | username | 123   |
      | password | 123 |
    И нажимаю на кнопку "#login"
    И я вижу текст "Institutions"
    И нажимаю на кнопку "#addInstitution"
    Если я заполняю поля формы:
      | title | Some text  |
      | description | 123 |
    И нажимаю на кнопку "#checkbox"
    И нажимаю на кнопку "#addPlace"
    То я вижу текст "Some text"

  @addComment
  Сценарий:
    Допустим я нахожусь на странице "login"
    Если я заполняю поля формы:
      | username | 123   |
      | password | 123 |
    И нажимаю на кнопку "#login"
    И я вижу текст "Institutions"
    И нажимаю на кнопку "#institutionslist"
    И нажимаю на кнопку "#learnMore"
    Если я заполняю поля формы:
      | comment | Some text comment  |
    И нажимаю на кнопку "#quality"
    И нажимаю на кнопку "#quality-1"
    И я жду "2"
    И нажимаю на кнопку "#service"
    И нажимаю на кнопку "#service-3"
    И я жду "2"
    И нажимаю на кнопку "#interior"
    И нажимаю на кнопку "#interior-5"
    И я жду "2"
    И нажимаю на кнопку "#addComment"
    То я вижу текст "Some text comment"