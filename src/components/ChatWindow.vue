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
        <v-textarea rows="1" auto-grow solo flat hide-details class="mr-3" v-model="chatInput" :color="chatColor" background-color="#F7F7FA" :placeholder="sendAMessageInstruction" @keydown.enter.exact.prevent @keyup.enter.exact="sendChat"></v-textarea>
        <v-btn icon @click="sendChat">
            <v-icon size="18px" :color="chatColor">send</v-icon>
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import ChatMessage from "./ChatMessage.vue"
import Vue from "vue"

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
            chatInstruction: "Chat",
            sendAMessageInstruction: "Send a message..."
        }
    },

    computed: {
        chatColor() {
            if (this.chatID == 0) {
                return "green darken-1";
            }
            return "purple darken-2";
        }

        

    },

    watch: {
        instructions() {
            if (this.instructions != null) {
                if (this.instructions.chatTitle != null) {
                    this.getChatInstruction();
                }
                if (this.instructions.sendAMessage != null) {
                    this.getSendAMessageInstruction();
                }
            }
        }
    },

    methods: {

        sendChat() {
            this.sendMessage(this.chatID, this.currLang, this.chatInput);
            this.chatInput = "";
        },

        getChatInstruction() {

            for (var i = 0; i < this.instructions.chatTitle.translations.length; i++) {
                if (this.instructions.chatTitle.translations[i]["to"] == this.currLang) {
                    this.chatInstruction = this.instructions.chatTitle.translations[i]["text"];
                }
            }

        },

        getSendAMessageInstruction() {
            for (var i = 0; i < this.instructions.sendAMessage.translations.length; i++) {
                if (this.instructions.sendAMessage.translations[i]["to"] == this.currLang) {
                    this.sendAMessageInstruction = this.instructions.sendAMessage.translations[i]["text"];
                }
            }

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
