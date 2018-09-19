<template>
<v-flex class="mb-2">
    <v-layout row align-center justify-start :reverse="sent">
            <v-card flat :color="messageColor" :dark="sent">
                <v-card-text class="pa-2">
                    {{ messageText }}
                </v-card-text>
            </v-card>
            <v-btn icon flat small v-if="!sent" @click="error(message)" :disabled="hasError" color="error">
                <v-icon small>error_outline</v-icon>
            </v-btn>
    </v-layout>
</v-flex>
</template>

<script>
export default {
    name: 'ChatMessage',

    props: [
        "chatID",
        "lang", 
        "message",
        "reportError"
    ],

    data() {
        return {
            hasError: false

        }
    },

    computed: {
        messageLang() {
            var app = this;
            if (this.sent) {
                return this.message.langDetected;
            } else {
                for (var l in this.message.translations) {
                    if (l != app.message.langDetected || l != app.message.langSent) {
                        return l;
                    }
                }
            }

        },

        messageText() {
            return this.message.translations[this.messageLang];
        },

        sent() {
            if (this.message.sender == this.chatID) {
                return true;
            }
            return false;
        },

        chatColor () {
            if (this.chatID == 0) {
                return "green darken-1";
            } return "purple darken-2";
        },

        messageColor() {
            if (this.sent) {
                return this.chatColor;
            }
            return "#dcdfe5";
        }
    },

    methods: {

        error(message) {
            this.hasError = true;
            this.reportError(this.messageLang, message);
        }

    }
}
</script>

<style>

</style>
