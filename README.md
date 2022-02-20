# group-chat

It's a PWA live group chat web application using VueJS 2 framework.

The user interface is close to WhatsApp anddroid version.

The application can be opened in 2 different browsers. Both browser windows can send & receive text messages as different users, in real-time without refreshing the page.

## Technologies

- [Vue JS 2](https://github.com/vuejs/vue)
- [Vuetify](https://vuetifyjs.com/en)
- [Vuex](https://vuex.vuejs.org)
- [Vue-I18n](https://kazupon.github.io/vue-i18n)
- [Vuetify-loader](https://github.com/vuetifyjs/vuetify-loader)
- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [Firebase](https://www.npmjs.com/package/firebase)
- [http-server](https://github.com/http-party/http-server)
- [Vue Twemoji Picker](https://github.com/kevinfaveri/vue-twemoji-picker)

## Features

- 🚀 PWA
- ⚡ SPA
- ❤️ User interface as close as possible to WhatsApp
- 🔒 Firebase instant update chat message
- 🎈 SPA
- 🔋 SPA

## Demo

Netlify: https://condescending-curran-3c6529.netlify.app

## Screenshots

Chats Screen:
<img width="480" alt="Chats Screen" src="https://user-images.githubusercontent.com/11033159/154451504-222558c1-0fb7-45f3-9af2-b4e8bc7eb2ba.png">

Chats Screen Settings:
<img width="480" alt="Chats Screen Settings" src="https://user-images.githubusercontent.com/11033159/154451524-376a871e-23e2-464e-889f-e59d5beb69d0.png">

Chats Screen in PWA Mode:
<img width="480" alt="Chats Screen in PWA Mode" src="https://user-images.githubusercontent.com/11033159/154456205-dbbd6c09-93eb-43eb-b7fc-756a6413a84c.png">

## Project setup

```
yarn install
```

### Run in PWA mode

```
yarn build && npx http-server dist
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## User Interface (What is not same as WhatsApp yet)

The intention was to design the user interface as close as possible, it wasn't fully possible yet due to time constraint. In future updates it will be improved.

These points listed bellow will be improved in future:

- Text input caret in chat screen.
- Page transition is not same as native app.
- Message text in CHATS screen clipped at right component's left edge instead of reaching unread count section.
