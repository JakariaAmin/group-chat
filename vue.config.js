module.exports = {
    transpileDependencies: [
        'vuetify',
        'quasar'
    ],

    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport    : false
        }
    },

    pwa: {
        name      : "GroupChat VueJS 2",
        themeColor: "#158069",
    }
}
