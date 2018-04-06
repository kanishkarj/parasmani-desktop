<template lang="html">
  <v-app id="instructions" v-if="loaded">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs11 sm11 md11>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-spacer></v-spacer>
                <v-toolbar-title text-md-center>Instructions</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <p class="ma-4" v-html="instructionsMarkdown"></p>
                <hr>
                <v-radio-group v-model="langSel">
                  <v-radio
                    v-for="n in languages.length"
                    :key="n"
                    :label="languages[n-1]"
                    :value="n"
                  ></v-radio>
                </v-radio-group>
                <hr>
              </v-card-text>
              <v-card-actions align-center>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="startTest">Start test</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import marked from 'marked'
import http from '../../axios'

export default {
  data: function () {
    return {
      instructions: '',
      loaded: false,
      languages: [],
      langSel: 1,
      exam: {}
    }
  },
  methods: {
    startTest () {
      this.$store.commit('setLang', this.languages[this.langSel - 1])
      this.$store.dispatch('startExam')
    }
  },
  computed: {
    instructionsMarkdown: function () {
      return marked(this.instructions.toString(), { sanitize: true })
    }
  },
  created: function () {
    /*eslint-disable */
    this.instructions = this.$store.getters.getInstructions
    const self = this
    http.AuthAxios.get('exam').then(function (val) {
      // self.$store.commit('setExamData', val.data)
      self.instructions = self.$store.getters.getInstructions
      self.languages = self.$store.getters.getLang
      self.loaded = true
    })
  }
}
</script>

<style lang="css">
</style>
