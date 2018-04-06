import router from '../../router'
import http from '../../axios'

export default {
  signIn (context, payload) {
    console.log(payload)
    http.NotAuthAxios.post('login', {
      userId: payload.userId,
      password: payload.password
    }).then((response) => {
      console.log(response.data)
      sessionStorage.setItem('token', response.data)
      router.push('/home')
    })
  },
  prepExam ({commit, state}, payload) {
    console.log(state.exam)
    commit('setQuestionVars')
  },
  startExam ({commit, state}, payload) {
    router.push('/start')
  },
  updateQuestions ({commit, state}, payload) {
    const data = require('./data')
    Promise.all([
      commit('assignQuestions', data)
    ]).then(() => {
      commit('randomizeQuest')
    })
  },
  submitPaper ({commit, state}, payload) {
    let responses = []
    let i = 0
    let sets = ['A', 'B', 'C', 'D']
    payload.forEach((set) => {
      set.Set.forEach((qs) => {
        responses.push({
          'question_id': qs._id,
          'response': qs.response,
          'set': sets[i]
        })
      })
      i++
    })
    let finalResponse = {
      'Student_id': '1231gwer3',
      'questionpaper_id': state.QPid,
      'responses': responses
    }
    console.log(JSON.stringify(finalResponse))
    http.AuthAxios.post('/response', finalResponse).then(() => {
      // router.push('/done')
    })
  }
}
