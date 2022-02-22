/**
 * multi language support through i18n.
 * list of words.
 */
const messages = {
    en: {
        $vuetify: {
            // general:
            WhatsApp                : 'WhatsApp',
            WelcomeToWhatsApp       : 'Welcome to WhatsApp',
            LoadingConversations    : 'Loading conversations...',
            NoMoreConversationToLoad: 'No more conversation to load',
            Close                   : 'Close',

            // welcome screen form:
            Submit              : 'Submit',
            PhoneNumber         : 'Phone Number',
            EnterYourPhoneNumber: 'Enter your phone number',
            HintPhoneNumber     : 'Hint: 011 1234 5678',

            UserName         : 'UserName',
            EnterYourUserName: 'Enter your user name',
            Name             : 'Name',
            EnterYourName    : 'Enter your name',

            // validation rules:
            ValidationMinLength: 'must be less than',
            ValidationMaxLength: 'must be more than',
            Required           : 'Required',
            Characters         : 'Characters',

            // create new chat form
            CreateNewChat    : 'Create new chat',
            CreateNewChatDesc: 'Broadcast messages to all users',
            Broadcast        : 'Broadcast',

            // tabs:
            CHATS : 'CHATS',
            STATUS: 'STATUS',
            CALLS : 'CALLS',

            // home screen settings:
            NewGroup       : 'New group',
            NewBroadcast   : 'New broadcast',
            LinkedDevices  : 'Linked devices',
            StarredMessages: 'Starred messages',
            Settings       : 'Settings',

            // chat screen settings:
            ViewContact      : 'View contact',
            MediaLinksAndDocs: 'Media, links, and docs',
            Search           : 'Search',
            MuteNotifications: 'Mute notifications',
            Wallpaper        : 'Wallpaper',
            More             : 'More',

            Message         : 'Message',
            EnterMessage    : 'Enter message',
            MessageSent     : 'Message Sent!',
            BroadcastSuccess: 'In another tab login as user, in chats screen your message should appear as new chat thread.',

            // snackbar messages:
            FeatureNotReadyYet: 'Feature not ready yet!',
        },
    },
}

export default messages;
