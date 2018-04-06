
export default {
  setQuestionVars: (state) => {
    state.exam.question_papers[0].A.forEach((val) => {
      val.color = 'red'
      val.response = '0'
    })
    state.exam.question_papers[0].B.forEach((val) => {
      val.color = 'red'
      val.response = '0'
    })
    state.exam.question_papers[0].C.forEach((val) => {
      val.color = 'red'
      val.response = '0'
    })
    state.exam.question_papers[0].D.forEach((val) => {
      val.color = 'red'
      val.response = '0'
    })
  },
  randomizeQuest: (state, lang) => {
    let SetA = []
    let SetB = []
    let SetC = []
    let SetD = []
    state.exam.subjects.forEach((sub) => {
      state.exam.question_papers.forEach((qp) => {
        if (qp.language === lang) {
          state.QPid = qp._id
          let QL = []
          qp.A.forEach((q) => {
            if (q.subject === sub.title) {
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
    let arr = []
    arr.push({Set: SetA})
    arr.push({Set: SetB})
    arr.push({Set: SetC})
    arr.push({Set: SetD})
    state.questions = arr
  },
  setExamData: (state, data) => {
    state.exam = data
  },
  setLang: (state, data) => {
    state.lang = data
  }
}
