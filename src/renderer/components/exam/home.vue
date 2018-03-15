<template lang="html">
  <v-app id="inspire">
    <v-navigation-drawer
      clipped
      fixed
      app
      class="mt-4"
    >
    <div class="text-xs-center pt-4">
      <div class="pt-4" v-for="i in 4">
        <h3 class="">Set {{i}}</h3>
        <v-btn v-for="j in questions[1].Set.length"
         class="mr-1 ml-0"
         fab dark small
         color="primary"
         @click="setCurrQuestion(i,j)"
         >
           {{j}}
        </v-btn>
      </div>
   </div>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-container fluid fill-height>
              <v-layout justify-center >
                <v-flex>
                  <h2>
                    {{currQuest.questions}}
                  </h2>
                    <v-radio-group v-model="opt">
                      <v-radio :label="currQuest.op1"></v-radio>
                      <v-radio :label="currQuest.op2"></v-radio>
                      <v-radio :label="currQuest.op3"></v-radio>
                      <v-radio :label="currQuest.op4"></v-radio>
                    </v-radio-group>
              </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app fixed>
      <v-btn flat value="recent" @click="prevQ">
        <v-icon>arrow_back</v-icon>
        <span> Previous</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat value="recent">
        <span>Mark for Review</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat value="recent" @click="nextQ">
        <span>Next</span>
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
      title: '',
      questions: [],
      currSet: 0,
      currQ: 0,
      opt: 3,
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  methods: {
    setCurrQuestion: function (set, q) {
      this.currSet = set - 1
      this.currQ = q - 1
    },
    nextQ: function () {
      if (this.currQ < 30) {
        this.currQ++
      } else {
        this.currQ = 0
        this.currSet++
      }
    },
    prevQ: function () {
      if (this.currQ > 0) {
        this.currQ--
      } else if (this.currSet > 0) {
        this.currSet--
        this.currQ = 0
      }
    }
  },
  computed: {
    currQuest: function () {
      return this.questions[this.currSet].Set[this.currQ]
    }
  },
  created: function () {
    this.title = this.$store.state.title
    this.$store.dispatch('updateQuestions').then(() => {
      this.questions = (this.$store.getters.getQuestions)
    })
  }
}
</script>

<style lang="css">

</style>
