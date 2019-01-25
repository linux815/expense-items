expense-items

Cистема учета финансовых средств;

How install:
1. `git clone https://github.com/linux815/expense-items.git`
2. `git submodule update --init --recursive`
3. `cd laradock && cp env-example .env `
4. `cd ../ && cp .env.example .env`
5. `./start.sh` or `cd laradock && docker-compose up -d nginx postgres`
6. `./bash.sh` or `cd laradock && docker-compose exec workspace bash`
7. `composer install`
8. `npm install` or `npm install --unsafe-perm`
9. `php artisan key:generate`
10. `php artisan migrate`
11. `php artisan db:seed`
12. (optional) `chown laradock:laradock -R storage/logs/`
13. `npm run watch`
14. run browser and enter `localhost:8089`

Для фронта использовал laravel iview boilerplate (https://github.com/AbdullahGhanem/laravel-spa-iview), убрал оттуда middleware'ы,
так как не использую авторизацию в проекте. 
Все поля валидируются на клиенте и на сервере. Поддерживается мультиязычность (en, ru), использовал vuex, а для фронта использовал компоненты iView на базе Vue.js.
Добавил подмодуль laradock и вынес все на 89 порт, чтобы ничего не конфликтовало. Название контейнеров совпадают с названием проекта.

