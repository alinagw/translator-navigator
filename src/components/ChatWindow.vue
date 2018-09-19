<template>
<v-card raised class="hide-overflow">
    <v-toolbar dark height="40px" :color="chatColor">
        <v-icon size="20px">chat_bubble</v-icon>
        <v-toolbar-title>
            {{ chatInstruction }}
        </v-toolbar-title>
    </v-toolbar>
    <v-container fluid grid-list-md px-4 class="scroll">
        <v-layout column justify-start>
            <template v-for="message in messages">
                <v-subheader :key="message.langChange" v-if="message.langChanged == chatID">
                    <v-icon size="20px" class="mr-2">translate</v-icon>
                    {{ message.newLang }}
                </v-subheader>
                <chat-message v-if="message.id != null" :key="message.id" :chat-i-d="chatID" :lang="currLang" :message="message" :reportError="reportError"></chat-message>
            </template>
        </v-layout>
    </v-container>
    <v-card-actions class="send-message">
        <v-textarea rows="1" auto-grow solo flat hide-details class="mr-3" v-model="chatInput" :color="chatColor" background-color="#F7F7FA" :placeholder="sendAMessageInstruction" @keyup.enter="sendChat"></v-textarea>
        <v-btn icon @click="sendChat">
            <v-icon size="18px" :color="chatColor">send</v-icon>
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import ChatMessage from "./ChatMessage.vue"

export default {
    name: 'ChatWindow',
    props: [
        "chatID",
        "currLang",
        "messages",
        "sendMessage",
        "reportError",
        "instructions"
    ],
    components: {
        ChatMessage
    },
    data() {
        return {
            chatInput: "",
            chatInstruction: this.getChatInstruction(),
            sendAMessageInstruction: this.getSendAMessageInstruction()
        }
    },

    computed: {
        chatColor() {
            if (this.chatID == 0) {
                return "green darken-1";
            }
            return "purple darken-2";
        },

        

    },

    methods: {

        sendChat() {
            this.sendMessage(this.chatID, this.currLang, this.chatInput);
            this.chatInput = "";
        },

        getChatInstruction() {
            var app = this;
            for (var i = 0; i < this.instructions.chatTitle.translations.length; i++) {
                if (app.instructions.chatTitle.translations[i]["to"] == app.currLang) {
                    return app.instructions.chatTitle.translations[i]["text"];
                }
            }

            return "Chat";

        },

        getSendAMessageInstruction() {
            var app = this;
           for (var i = 0; i < this.instructions.sendAMessage.translations.length; i++) {
                if (app.instructions.sendAMessage.translations[i]["to"] == app.currLang) {
                    return app.instructions.sendAMessage.translations[i]["text"];
                }
            }

            return "Send a message...";

        }

    }
}
</script>

<style>
.hide-overflow {
    overflow-y: hidden;
}

.scroll {
    height: calc(100% - 104px);
    overflow-y: scroll;
}

.send-message {
    border-top: solid 2px #F7F7FA;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
