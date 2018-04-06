import router from '../../router'
// import http from '../../axios'

export default {
  signIn (context, payload) {
    console.log(payload)
    // http.NotAuthAxios.post('login', {
    //   userId: payload.userId,
    //   password: payload.password
    // }).then((response) => {
    //   console.log(response.data)
    //   sessionStorage.setItem('token', response.data)
    // })
    router.push('/home')
  },
  prepExam ({commit, state}, payload) {
    commit('setQuestionVars')
  },
  startExam ({commit, state}, payload) {
    router.push('/start')
  },
  updateQuestions (context, payload) {
    const data = require('./data')
    Promise.all([
      context.commit('assignQuestions', data)
    ]).then(() => {
      context.commit('randomizeQuest')
    })
  }
}
