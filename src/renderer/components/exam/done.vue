<template lang="html">
  <v-app id="instructions">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs11 sm11 md11>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-spacer></v-spacer>
                <v-toolbar-title text-md-center>Done!</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <p class="ma-4" v-html="text"></p>
              </v-card-text>
              <v-card-actions align-center>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="exit">Exit</v-btn>
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
export default {
  data: function () {
    return {
      text: 'hello'
    }
  },
  methods: {
    exit () {
      this.$electron.ipcRenderer.send('exit')
    }
  }
}
</script>

<style lang="css">
</style>
