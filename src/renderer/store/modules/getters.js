export default {
  getInstructions (state) {
    return state.instructions
  },
  getLang (state) {
    return state.lang
  },
  getQuestions (state) {
    const data = require('./data.js')
    return data
  }
}
