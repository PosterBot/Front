PosterBot-Front
===============

Панель управления ботом рассылки новостей

Installation & Start
--------------------

```
  $ npm install
  $ bower install
  $ gulp serve
```

Docker
------

Run from Docker Hub
```
 $ docker run -v <SOME_DIR>:/usr/share/nginx/html/app/settings/firebase.json -d -p 80:80 posterbot/front
```

Build
```
  $ npm install
  $ bower install
  $ gulp Build
  $ build -t posterbot/front:latest .
  $
```

Configure
---------
Сервер работает через Firebase. Для подключения к firebase укажите настройки в файле
`./src/app/settings/firebase.json` или `/usr/share/nginx/html/app/settings/firebase.json` в докер контейнере:

```
{
"settings": {
    "apiKey": "<API_KEY>",
    "authDomain": "<PROJECT_ID>.firebaseapp.com",
    "databaseURL": "https://<DATABASE_NAME>.firebaseio.com",
    "storageBucket": "<BUCKET>.appspot.com",
    "messagingSenderId": "<SENDER_ID>",
  },
  "auth": {
    "email":"<EMAIL>",
    "password":"<PASSWORD>"
  }
}
```
