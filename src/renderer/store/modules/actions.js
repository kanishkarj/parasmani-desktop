import router from '../../router'

export default {
  signIn (context, payload) {
    console.log(payload)
    router.push('/home')
  }
}
