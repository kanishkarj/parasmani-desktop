import router from '../../router'
import http from '../../axios'

export default {
  prepExam ({commit, state}, payload) {
    console.log(state.exam)
    commit('setQuestionVars')
  },
  startExam ({commit, state}, payload) {
    router.push('/start')
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
          'subject': qs.subject,
          'set': sets[i]
        })
      })
      i++
    })
    let finalResponse = {
      'Student_id': '1231gwer3',
      'language': state.lang,
      'responses': responses
    }
    console.log(JSON.stringify(finalResponse))
    http.AuthAxios.post('/response', finalResponse).then(() => {
      // router.push('/done')
    })
  }
}
