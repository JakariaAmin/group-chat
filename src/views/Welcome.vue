<template>
  <div class = "welcome-screen">

    <!--welcome text container-->
    <div class = "title-container">
      <div class = "title-welcome">
        {{ $vuetify.lang.t('$vuetify.WelcomeToWhatsApp') }}
      </div>
    </div>

    <!--whatsapp logo-->
    <my-image src = "about_logo.png" classes = "logo"/>

    <!--new user sign up form-->
    <v-form
        ref = "form"
        v-model = "valid"
        lazy-validation
    >
      <!--text field: user name-->
      <v-text-field
          v-model = "name"
          :label = "$vuetify.lang.t('$vuetify.Name')"
          :placeholder = "$vuetify.lang.t('$vuetify.EnterYourName')"
          :rules = "rulesName"
          required
          solo
      />

      <!--text field: phone number-->
      <v-text-field
          v-model = "phoneNumber"
          :label = "$vuetify.lang.t('$vuetify.PhoneNumber')"
          :placeholder = "$vuetify.lang.t('$vuetify.EnterYourPhoneNumber')"
          :hint = "$vuetify.lang.t('$vuetify.HintPhoneNumber')"
          :rules = "rulesPhoneNumber"
          required
          solo
      />

      <!--sign up submit button-->
      <v-btn
          color = "primary"
          large
          block
          elevation = "6"
          @click = "signUp"
      >
        {{ $vuetify.lang.t('$vuetify.Submit') }}
      </v-btn>
    </v-form>

  </div>
</template>

<script lang = "ts">
import Vue from "vue";
import MyImage from "@/components/MyImage.vue";
import User from "@/data/interface/User";
import moment from "moment";
import {mockUsers} from "@/data/mock/Users";
import Chat from "@/data/interface/Chat";
import {randomMessages} from "@/data/mock/Messages";
import {ChatStatus} from "@/data/enum/ChatStatus";

export default Vue.extend(
    {
      name      : 'Welcome',
      components: {MyImage},

      data: () => ({
        // form fields and validation rules:
        valid      : false,
        name       : '',
        phoneNumber: '',

        rulesName: [
          (value: string) => !!value || 'Name is required.',
          (value: string) => (value || '').length >= 4 || 'Name must be min 4 characters',
          (value: string) => (value || '').length <= 32 || 'Name can not be more than 32 characters',
        ],

        rulesPhoneNumber: [
          (value: string) => !!value || 'Phone number is required.',
          (value: string) => (value || '').length >= 10 || 'Phone number must be min 10 characters',
          (value: string) => (value || '').length <= 11 || 'Phone number can not be more than 11 characters',
        ],
      }),

      methods: {
        signUp() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore:

          // once form is valid: continue new user signup process:
          if (this.$refs.form.validate()) {
            // create user object:
            const user: User = {
              id         : this.uuidv4(),
              name       : this.name,
              phoneNumber: this.phoneNumber,
              avatar     : '@/assets/images/3x/user.png',
              isActive   : true,
            }
            console.log(user);

            // generate random chats before updating sign up state:
            this.generateChats(user);
          }
        },

        // generate random uuid for new user:
        uuidv4() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        },

        // generate initial conversation of 100 per user:
        generateChats(user: User) {
          // message timestamp start time set to 1 year earlier:
          const timestampStart = moment().subtract(12, 'months');

          // generate user list with 5000 chats per user:
          const generatedChats: User[] = mockUsers.map(mockUser => {
            const chats: Chat[] = [];

            // last few chat messages should be unread, randomly get index of which the ChatStatus.sent should start:
            const randomUnreadIndex = Math.round(Math.random() * (100 - 91)) + 91;

            // generate chats with random message, time and user:
            for (let i = 0; i < 100; i++) {
              const message: string = randomMessages[Math.floor((Math.random() * randomMessages.length)) | 0];
              // const randomUser: User = mockUsers[Math.floor((Math.random() * mockUsers.length)) | 0];

              // randomly decide if this message is sent by authenticated user or other user:
              const isOwnMessage: boolean = Math.random() < 0.5;

              chats[i] = {
                id       : i + 1,
                message  : message,
                timestamp: timestampStart.add(i, 'hours').format('h:mm a'),
                status   : i > randomUnreadIndex ? ChatStatus.sent : ChatStatus.read,
                user     : isOwnMessage ? user : mockUser,
              }
            }

            return {...mockUser, chats};
          });

          console.log('generateChats: ', generatedChats);

          // store chats data in vuex store:
          this.$store.dispatch('chats/initUsers', generatedChats)
              .then(() => {

                // store user data in vuex store:
                this.$store.dispatch('user/updateUser', user)
                    .then(() => {
                      // navigate to home screen:
                      this.$router.push({path: '/home/chats'});

                      console.log('generateChats: ', this.$store.state.chats);
                    });
              });
        },
      }
    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "scss">
.welcome-screen {
  height           : 100%;
  background-color : #F3EDE7;

  .title-container {
    height           : 20%;

    display          : flex;
    flex-direction   : column;
    justify-content  : center;
    align-items      : center;

    background-color : $primary;

    .title-welcome {
      font-weight : map-get($roboto-weights, medium);
      font-size   : 25px;
      color       : white;
    }
  }

  .logo {
    max-width : 150px;
    margin    : 40px auto;
  }

  .v-form {
    margin : 0 20px;

    .v-btn {
      margin : 5px 0;
    }
  }
}

</style>
