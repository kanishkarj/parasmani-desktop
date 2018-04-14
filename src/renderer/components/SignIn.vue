<template>
  <v-app id="SignIn">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign In</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="userId" label="User Id" type="text" v-model="userId"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"  v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <h2>Error</h2>
          </v-card-title>
          <v-card-text>
            {{error}}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
  import http from '../axios'
  import router from '../router'

  export default {
    data: function () {
      return {
        userId: '',
        password: '',
        error: '',
        dialog: false
      }
    },
    methods: {
      login (event) {
        http.NotAuthAxios.post('/login/student', {
          userId: this.userId,
          password: this.password
        }).then((response) => {
          window.localStorage.setItem('token', response.data.token)
          window.localStorage.setItem('student_id', response.data.user._id)
          router.push('/home')
        }).catch((err) => {
          this.error = err.toString()
          this.dialog = true
          console.log(this.err)
        })
      }
    },
    created: function () {
    }

  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
