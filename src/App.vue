<template>
<v-app>
    <v-toolbar flat prominent color="transparent" class="pt-3">
        <v-toolbar-title>
            <v-layout d-flex row align-center>
                <v-img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/facebook/65/crocodile_1f40a.png" height="36px" width="36px" class="mr-3"></v-img>
                <h5 class="text-uppercase spaced-letters">Trans<span class="purple--text darken-2--text">lator</span><br>Navi<span class="green--text darken-1--text">gator</span></h5>
            </v-layout>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn depressed dark :disabled="!numErrors" color="error" @click="showErrors = true">
            <v-icon small class="mr-2">error_outline</v-icon> Errors
        </v-btn>
        <v-btn depressed dark color="green darken-1" href="https://duke.qualtrics.com/jfe/form/SV_9HMzRUxVAz4de29">
            <v-icon small class="mr-2">check</v-icon> Complete Interaction
        </v-btn>
    </v-toolbar>
    <v-dialog v-model="showErrors" scrollable max-width="500px">
        <error-list :hide="hideErrors" :errors="errors"></error-list>
    </v-dialog>
    <v-content class="pb-0">
        <v-container fluid fill-height grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-layout d-flex column fill-height>
                        <v-flex>
                            <v-select solo prepend-inner-icon="translate" placeholder="Language" hide-details :items="selectLangs" v-model="currLanguages[0]" @change="updateLanguages(0)" color="green darken-1">
                            </v-select>
                        </v-flex>
                        <v-flex d-flex fill-height>
                            <chat-window v-show="langsDefined" :chatID="0" :langs="langsAvail" :currLang="currLanguages[0]" :messages="chatMessages" :send-message="translateMessage" :report-error="reportError" :instructions="instructions"></chat-window>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-layout d-flex column fill-height>
                        <v-flex>
                            <v-select solo prepend-inner-icon="translate" placeholder="Language" hide-details :items="selectLangs" v-model="currLanguages[1]" @change="updateLanguages(1)" color="purple darken-2">
                            </v-select>
                        </v-flex>
                        <v-flex d-flex fill-height>
                            <chat-window v-show="langsDefined" :chatID="1" :langs="langsAvail" :currLang="currLanguages[1]" :messages="chatMessages" :send-message="translateMessage" :report-error="reportError"></chat-window>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 text-xs-center grey--text v-if="!langsDefined">
                    <h3 class="headline font-weight-light">Please select languages before proceeding.</h3>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
    <v-footer app color="transparent">
        <v-flex text-xs-center grey--text class="caption text-uppercase font-weight-bold spaced-letters">&copy; 2018 Alina Walling</v-flex>
    </v-footer>
</v-app>
</template>

<script>
import Vue from "vue"
import ChatWindow from "./components/ChatWindow"
import ErrorList from "./components/ErrorList"

import {
    API_URL
} from './config'

export default {
    name: 'app',
    components: {
        ChatWindow,
        ErrorList
    },
    data() {
        return {
            langsAvail: {},
            currLanguages: ["", ""],
            location: {},
            chatMessages: [],
            newMessage: {},
            instructions: {},
            errors: [],
            showErrors: false
        }
    },

    computed: {

        langsDefined() {
            if (this.currLanguages[0] && this.currLanguages[1]) {
                return true;
            }
            return false;
        },

        numErrors() {
            return this.errors.length;
        },

        selectLangs() {
            var app = this;
            var l = [];

            for (var lang in this.langsAvail) {
                l.push({
                    text: app.langsAvail[lang]["name"] + " | " + app.langsAvail[lang]["nativeName"],
                    value: lang
                });
            }

            return l;
        }
    },

    created: function () {
        this.getLanguages();
    },

    watch: {
        currLanguages() {
            if (this.langsDefined) {
                this.translateInstructions();
            }
        }
    },

    methods: {

        translateMessage(sender, lang, text) {

            this.newMessage = {
                id: Date.now(),
                sender: sender,
                langSent: lang,
                originalText: text,
                translations: {}
            }

            this.translate(this.currLanguages, text, "chat");

        },

        sendMessage(data) {

            var app = this;

            if (data != null) {

                var langDetected = data.detectedLanguage.language;
                Vue.set(app.newMessage, "langDetected", langDetected);

                for (var i = 0; i < data.translations.length; i++) {
                    Vue.set(app.newMessage.translations, data.translations[i]["to"], data.translations[i]["text"]);
                }

                app.chatMessages.push(app.newMessage);
                app.newMessage = {};

            }

        },

        translate(langs, text, item) {

            var app = this;

            var content = [{
                "Text": text
            }];

            fetch(`${API_URL}` + "/translate", {
                    method: 'POST',
                    body: JSON.stringify({
                        langs: JSON.stringify(langs),
                        content: JSON.stringify(content)
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json())
                .then(data => {
                    var parsed = JSON.parse(data.body);
                    //console.log(parsed[0]);

                    if (item == "chat") {
                        app.sendMessage(parsed[0]);
                    } else {
                        Vue.set(app.instructions, item, parsed[0]);
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        },

        getLanguages() {

            var app = this;

            fetch(`${API_URL}` + "/languages", {
                    method: 'GET'
                }).then(response => response.json())
                .then(data => {
                    var parsed = JSON.parse(data.body);
                    //console.log(parsed);
                    app.langsAvail = parsed.translation;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        translateInstructions() {
            this.translate(this.currLanguages, "Chat", "chatTitle");
            this.translate(this.currLanguages, "Send a message...", "sendAMessage");
        },

        updateLanguages(index) {
            var newLang = this.langsAvail[this.currLanguages[index]]["name"] + " | " + this.langsAvail[this.currLanguages[index]]["nativeName"];

            this.chatMessages.push({
                langChange: Date.now(),
                langChanged: index,
                newLang: newLang
            });
        },

        reportError(lang, message) {

           this.errors.push({
                id: message.id,
                fromLang: message.langSent,
                toLang: lang,
                fromLangText: message.originalText,
                toLangText: message.translations[lang]
            });

        },

        completeInteraction() {

        },

        hideErrors(hide) {
            this.showErrors = hide;
        }
    }
}
</script>

<style>
#app {
    height: 100vh;
    background-color: #F7F7FA;
    overflow-y: hidden;
}

.spaced-letters {
    letter-spacing: 1.5px;
}

.scroll {
    overflow-y: auto;
}
</style>
