import Layout from './pages/layout'

const getDashboard = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/Dashboard').default)
  }, 'dashboard')
}
const getLogin = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./containers/Login').default)
  }, 'login')
}
const routeConf = [
  {
    path: '/',
    component: Layout,
    indexRoute: { getComponent: getDashboard },
    childRoutes: [
      {
        path: 'dashboard',
        getComponent: getDashboard
      },
    ]
  },
  {
    path: '/login',
    getComponent: getLogin,
  }
]

export default routeConf
