import history from './history'

const redirectToLogin = () => {
  const loginPageUrl = '/login'
  history.push(loginPageUrl)
}
export default redirectToLogin
