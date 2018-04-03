<template lang="html">
  <v-app id="inspire">
    <v-navigation-drawer
      clipped
      fixed
      app
      class="mt-4"
    >
    <div class="text-xs-center pt-4 pb-0 mb-0">
      <div class="mt-5"></div>
      <div class="pt-4" v-for="i in 4" :key='i'>
        <h3 class="">Set {{i}}</h3>
        <v-btn v-for="j in questions[i-1].Set.length"
         class="mr-1 ml-0"
         fab dark small
         :color='questions[i-1].Set[j-1].color'
         :key='j'
         @click="setCurrQuestion(i-1,j-1)"
         >
           {{j}}
        </v-btn>
      </div>
      <v-btn class="primary mt-4">
        <span>Submit</span>
      </v-btn>
   </div>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{time.hr}}:{{time.min}}:{{time.sec}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout >
          <v-flex shrink>
            <v-container fluid fill-height>
              <v-layout justify-center >
                <v-flex>
                  <h1 class="mb-5">
                    Set {{currSet + 1}} | Question {{currQ+1}}
                  </h1>
                  <h2>
                    {{currQuest.questions}}
                  </h2>
                    <v-radio-group v-model="opt">
                      <v-radio :label="currQuest.op1" value="1"></v-radio>
                      <v-radio :label="currQuest.op2" value="2"></v-radio>
                      <v-radio :label="currQuest.op3" value="3"></v-radio>
                      <v-radio :label="currQuest.op4" value="4"></v-radio>
                    </v-radio-group>
              </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
<!-- questions[currSet].Set[currQ].marked | -->
    <v-footer app fixed>
      <v-btn flat value="recent" @click="prevQ">
        <v-icon>arrow_back</v-icon>
        <span> Previous</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="toggle_exclusive">
        <v-btn flat @click="markClicked">
          <span>Mark for Review</span>
        </v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-btn flat value="recent" v-if="opt>0" @click="removeAns">
        <span>Remove</span>
      </v-btn>
      <v-spacer v-if="opt>0"></v-spacer>
      <v-btn flat value="recent" @click="nextQ">
        <span>Next</span>
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </v-footer>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <h2>Alert</h2>
          </v-card-title>
          <v-card-text>
            You have tried to access another application during the examination.
            You have {{cheatCount}} warnings, after that you will be logged out.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
const Stopwatch = require('timer-stopwatch')

const timer = new Stopwatch(3 * 3600 * 1000, {
  refreshRateMS: 1000 // How often the clock should be updated
})

export default {
  data: function () {
    return {
      title: '',
      questions: [],
      currSet: 0,
      currQ: 0,
      opt: 0,
      time: {
        sec: 0,
        min: 0,
        hr: 0
      },
      sec: 0,
      min: 0,
      hr: 0,
      dialog: true,
      cheatCount: 2,
      toggle_exclusive: null
    }
  },
  methods: {
    changeAfter: function () {
      if (this.questions[this.currSet].Set[this.currQ].ans) {
        this.opt = this.questions[this.currSet].Set[this.currQ].ans
      } else {
        this.opt = 0
      }
    },
    markClicked: function () {
      this.toggle_exclusive == null ? this.questions[this.currSet].Set[this.currQ].marked = true : this.questions[this.currSet].Set[this.currQ].marked = false
      console.log(this.questions[this.currSet].Set[this.currQ].marked)
    },
    changeBefore: function () {
      if (this.questions[this.currSet].Set[this.currQ].marked) {
        this.questions[this.currSet].Set[this.currQ].color = 'primary'
      } else if (this.questions[this.currSet].Set[this.currQ].ans > 0) {
        this.questions[this.currSet].Set[this.currQ].color = 'success'
      } else {
        this.questions[this.currSet].Set[this.currQ].color = 'red'
      }
    },
    setCurrQuestion: function (set, q) {
      this.changeBefore()
      this.currSet = set
      this.currQ = q
      this.changeAfter()
    },
    nextQ: function () {
      this.changeBefore()
      if (this.currQ < 20 - 1) {
        this.currQ++
      } else {
        this.currQ = 0
        this.currSet++
      }
      this.changeAfter()
      console.log(this.time)
    },
    prevQ: function () {
      this.changeBefore()
      if (this.currQ > 0) {
        this.currQ--
      } else if (this.currSet > 0) {
        this.currSet--
        this.currQ = 20 - 1
      }
      this.changeAfter()
    },
    removeAns: function () {
      this.opt = 0
      this.questions[this.currSet].Set[this.currQ].ans = 0
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
      console.log(this.questions)
    })
    var self = this
    timer.onTime(function (time) {
      self.min = parseInt(time.ms / 1000 / 60) % 60
      self.sec = parseInt(time.ms / 1000) % 60
      self.hr = parseInt(time.ms / 1000 / 3600)
    })
    timer.start()
    this.$electron.ipcRenderer.on('ping', () => {
      this.dialog = true
    })
  },
  watch: {
    opt: function () {
      this.questions[this.currSet].Set[this.currQ].ans = this.opt
    },
    currQ: function () {
      this.questions[this.currSet].Set[this.currQ].marked ? this.toggle_exclusive = 0 : this.toggle_exclusive = null
    },
    currSet: function () {
      this.questions[this.currSet].Set[this.currQ].marked ? this.toggle_exclusive = 0 : this.toggle_exclusive = null
    },
    dialog: function () {
      this.dialog ? this.cheatCount-- : this.cheatCount = this.cheatCount
    },
    sec: function () {
      if (this.sec > 9) {
        this.time.sec = this.sec
      } else {
        this.time.sec = '0' + this.sec
      }
      if (this.min > 9) {
        this.time.min = this.min
      } else {
        this.time.min = '0' + this.min
      }
      if (this.hr > 9) {
        this.time.hr = this.hr
      } else {
        this.time.hr = '0' + this.hr
      }
    }
  }
}
</script>

<style lang="css">

</style>
