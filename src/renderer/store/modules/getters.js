export default {
  getInstructions (state) {
    return state.exam.instruction
  },
  getLanguages (state) {
    let arr = []
    state.exam.question_papers.forEach((val) => {
      arr.push(val.language)
    })
    return arr
  },
  getQuestions (state) {
    return state.questions
  },
  getExam (state) {
    return state.exam
  },
  getDuration (state) {
    return state.duration
  },
  getLang (state) {
    return state.lang
  }
}
