# test_calendar

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# comandos aplicados
npm install --save @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list @fullcalendar/core/locales/es
yarn add v-calendar
npm install -g json-server
json-server --watch json/data.json --port 3011

# Rules
{
  "rules": {
    "resultados": {
      ".indexOn": ["groupId"],
      ".read": true,
      ".write": true,
      "$docId": {
        ".read": "data.child('groupId').val() == 'pelar'"
      }
    }
  }
}
