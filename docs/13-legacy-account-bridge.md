# 13. Связка нового кабинета с действующими аккаунтами Preview

Дата: 2026-11-18

## Архитектура

Новый Next.js кабинет не заводит отдельную базу пользователей. Серверные API-маршруты Next.js обращаются к существующему Express Preview API:

- Base URL по умолчанию: `https://fishrusss.duckdns.org/preview`.
- Можно переопределить серверной переменной `KLEVOE_LEGACY_API_BASE`.
- Секреты OAuth остаются только на Express Preview; Vercel не получает Client Secret.
- Сессия старого приложения хранится в HttpOnly cookie нового кабинета. Браузерный JavaScript не получает session token.
- На запросы к Express API Next.js передаёт token в заголовке `x-user-token`.
- Cookie: `klevoe_session`, HttpOnly, Secure в production, SameSite=Lax, срок до 180 дней.

## Реализованные маршруты Next.js

- `POST /api/account/login` — проверка логина/пароля через существующий Preview API и установка HttpOnly cookie.
- `GET /api/account/me` — получение текущего профиля из существующего аккаунта.
- `POST /api/account/logout` — отзыв сессии в Express API и очистка cookie.
- `GET /api/auth/status` — получение фактической доступности Telegram и Яндекс ID.
- `POST /api/auth/telegram/start` и `POST /api/auth/yandex/start` — запуск только режима привязки к уже авторизованному аккаунту.

POST-маршруты проверяют Origin, если заголовок присутствует. OAuth start допускает только двух известных провайдеров и HTTPS URL их страниц авторизации.

## OAuth callback

На Express Preview callback для режима `link` возвращает пользователя на стабильный Preview alias Next.js:

`https://klevoe-mesto-russia-git-feature-app-foundation-fish-5b50.vercel.app/profile`

Callback для прежнего режима входа через старый интерфейс продолжает использовать старый маршрут `/preview/`. Основное Express-приложение на порту 3000 и production URL не менялись.

## Ограничения текущего этапа

- Сначала пользователь входит существующим логином и паролем.
- Telegram и Яндекс ID привязываются к текущему `userId`; нельзя привязать провайдера, уже принадлежащего другому аккаунту.
- Автоматическая регистрация нового аккаунта через провайдера из нового кабинета не включена.
- Регистрация, восстановление пароля, редактирование профиля и остальные разделы кабинета ещё не перенесены в новый интерфейс.
- Проверка OAuth callback требует пройти реальный вход и подтвердить привязку тестовым аккаунтом. Нельзя тестировать наугад с чужим аккаунтом.

## Граница безопасности

Все изменения этого этапа предназначены только для Preview. Не копировать JSON-файлы пользователей, session tokens или OAuth secrets в Vercel, GitHub или браузер. Не менять production service `klevoe-mesto.service`, порт 3000, или основной сайт.
