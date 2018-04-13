const shuffleArray = require('shuffle-array')

export default {
  setQuestionVars: (state) => {
    state.exam.question_papers.forEach((qp) => {
      qp.A.forEach((val) => {
        val.color = 'red'
        val.response = '0'
      })
      qp.B.forEach((val) => {
        val.color = 'red'
        val.response = '0'
      })
      qp.C.forEach((val) => {
        val.color = 'red'
        val.response = '0'
      })
      qp.D.forEach((val) => {
        val.color = 'red'
        val.response = '0'
      })
    })
    console.log(state.exam.question_papers)
  },
  randomizeQuest: (state, lang) => {
    let SetA = []
    let SetB = []
    let SetC = []
    let SetD = []
    state.exam.subjects.forEach((sub) => {
      state.exam.question_papers.forEach((qp) => {
        console.log(state.exam.question_papers)
        if (qp.language === lang) {
          state.QPid = qp._id
          let QL = []
          console.log(sub.title)
          qp.A.forEach((q) => {
            if (q.subject === sub.title) {
              console.log(sub.title)
              QL.push(q)
            }
          })
          SetA.push(...QL.slice(0, sub.num_in_set_A))

          QL = []
          qp.B.forEach((q) => {
            if (q.subject === sub.title) {
              QL.push(q)
            }
          })
          SetB.push(...QL.slice(0, sub.num_in_set_B))

          QL = []
          qp.C.forEach((q) => {
            if (q.subject === sub.title) {
              QL.push(q)
            }
          })
          SetC.push(...QL.slice(0, sub.num_in_set_A))

          QL = []
          qp.D.forEach((q) => {
            if (q.subject === sub.title) {
              QL.push(q)
            }
          })
          SetD.push(...QL.slice(0, sub.num_in_set_A))
        }
      })
    })
    console.log(SetA)
    let arr = []
    arr.push({Set: shuffleArray(SetA)})
    arr.push({Set: shuffleArray(SetB)})
    arr.push({Set: shuffleArray(SetC)})
    arr.push({Set: shuffleArray(SetD)})
    state.questions = arr
  },
  setExamData: (state, data) => {
    state.exam = data
    state.duration = data.duration
  },
  setLang: (state, data) => {
    state.lang = data
  },
  setStudentId: (state, data) => {
    state.student_id = data
  }
}
