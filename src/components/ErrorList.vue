<template>
<v-card>
    <v-toolbar color="error" dark card>
        <v-toolbar-title>{{ numErrors }} Errors</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="hide(false)">
            <v-icon>close</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card-text style="height: 400px;">
        <v-list two-line>
            <template v-for="(err, index) in errs">
                <v-list-tile :key="err.id">
                    <v-list-tile-content>
                        <v-list-tile-title>Error translating <span class="text-uppercase font-weight-bold">{{ err.fromLang }}</span> to <span class="text-uppercase font-weight-bold">{{ err.toLang }}</span></v-list-tile-title>
                        <v-list-tile-sub-title class="grey--text">
                            "{{ err.fromLangText }}" <v-icon small class="mx-2">arrow_forward</v-icon> "{{ err.toLangText }}"
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider :key="index" v-if="includeDivider(index)"></v-divider>
            </template>
        </v-list>
    </v-card-text>

</v-card>
</template>

<script>
export default {
    name: 'ErrorList',
    props: [
        "hide",
        "errors"
    ],
    components: {

    },
    data() {
        return {
            errs: this.errors
        }
    },

    computed: {
        numErrors () {
            return this.errs.length;
        }

    },

    methods: {

        includeDivider(index) {
            if (index == this.errs.length - 1) {
                return false;
            } return true;
        }

    }
}
</script>

<style>

</style>
