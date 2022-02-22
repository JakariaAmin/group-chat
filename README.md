# group-chat

It's a PWA live group chat web application using VueJS 2 framework.

The user interface is close to WhatsApp android version.

The application can be opened in 2 different browsers. Both browser windows can send & receive text messages as different users, in real-time without refreshing the page.

## Technologies

- [Vue JS 2](https://github.com/vuejs/vue)
- [Vuetify](https://vuetifyjs.com/en)
- [Vuex](https://vuex.vuejs.org)
- [Vue-I18n](https://kazupon.github.io/vue-i18n)
- [Vuetify-loader](https://github.com/vuetifyjs/vuetify-loader)
- [Quasar](https://v1.quasar.dev)
- [Firebase](https://www.npmjs.com/package/firebase)
- [Axios](https://github.com/axios/axios)
- [http-server](https://github.com/http-party/http-server)

## Features

- 🚀 PWA
- ⚡ SPA
- ❤️ UI, UX near identical to WhatsApp
- 🎈 Chat message instant update using firebase
- 🔋 SPA

## Demo

Netlify: https://vuejs2-whatsapp-clone.netlify.app

## How to use

- Open demo link in new tab.
- Check notification permission, and allow it.
- SignUp new user from welcome screen, enter name and phone number.
- In chats screen there are 5 demo user conversation thread.
- Open demo link in another new tab. Grant notification permission.
- SigUp another new user.
- Now from first app/tab, click on the bottom right FAB to broadcast your first message.
- Other app/tab user will get this message as new conversation starter and automatically create a new thread in his/her chats screen.
- Open that conversation thread from 2nd user's app/tab.
- Send any message.
- Now in 1st user's chats screen, a new conversation thread will be created.
- Open that conversation thread from 1st user's app/tab and start live chat.

## Other features

- Scrolling to the top of conversation will load 500 random chats at a time, up to 5000 in total to stress test list's ability to load number of items.
- Incoming message do update chat in chats tab screen, but in conversations screen might have to type something in text input for new message to appear for other user. This is current known bug which will be fixed.
- Some feature in this app is not exactly same as WhatsApp, for example find contact and create new conversation thread, as this app doesn't use any backend.
- Firebase topic message is used to facilitate live chat rather than push notification to direct user as it requires fcm token, database.

## Screenshots

Welcome Screen:
<img width="420" alt="Chats Screen" src="https://user-images.githubusercontent.com/11033159/155047791-a2c3f0b9-2ce3-401e-a391-c9ea2d737eaf.png">

Broadcast Message Modal:
<img width="420" alt="Chats Screen" src="https://user-images.githubusercontent.com/11033159/155049454-909d5ca6-49d0-438d-8ae7-14855ab4378f.png">

Broadcast Success Message:
<img width="420" alt="Chats Screen" src="https://user-images.githubusercontent.com/11033159/155049458-c26705da-604e-4a2b-996b-a269ba2a8dff.png">

Chats Screen:
<img width="420" alt="Chats Screen" src="https://user-images.githubusercontent.com/11033159/155049593-7068f814-54ff-4830-bd0a-4d88d8a268e0.png">

Chat Conversation Screen:
<img width="420" alt="Chats Screen" src="https://user-images.githubusercontent.com/11033159/155049702-8aaae252-7f89-4819-9aaf-ec7fd0aaa7d5.png">

Chat Counter:
<img width="420" alt="Chats Screen" src="https://user-images.githubusercontent.com/11033159/155049813-67faad44-8669-4bf3-8c6c-19b1346fddae.png">

Chats Screen Settings:
<img width="420" alt="Chats Screen Settings" src="https://user-images.githubusercontent.com/11033159/154451524-376a871e-23e2-464e-889f-e59d5beb69d0.png">

PWA (Welcome Screen):
<img width="420" alt="Chats Screen in PWA Mode" src="https://user-images.githubusercontent.com/11033159/155051830-5067dd09-d611-4220-9aa4-a69419a8c254.png">

PWA (Chats Screen):
<img width="420" alt="Chats Screen in PWA Mode" src="https://user-images.githubusercontent.com/11033159/155051906-e14cd2f6-a1d1-4271-912c-0014b0169cee.png">

PWA (Conversation Screen):
<img width="420" alt="Chats Screen in PWA Mode" src="https://user-images.githubusercontent.com/11033159/155051950-4e616dd9-a5fa-4a26-b03b-00bd655d9d29.png">

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

## Vuetify or Quasar?
Vuetify will be removed in next commit, quasar will stay. As quasar's components are better, specially the list component used in chat conversation screen.

## User Interface (What is not same as WhatsApp yet)

The intention was to design the user interface as close as possible, it wasn't fully possible yet due to time constraint.

These points listed bellow will be improved in the future:

- Text input caret in chat screen.
- Page transition is not same as native app.
- Message text in CHATS screen clipped at right component's left edge instead of reaching unread count section.
