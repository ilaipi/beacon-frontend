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
const getCustomers = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./containers/Customers').default)
  }, 'customers')
}
const getCustomer = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./containers/Customer').default)
  }, 'customer')
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
      {
        path: 'customers',
        indexRoute: { getComponent: getCustomers },
        childRoutes: [
          {
            path: '_new',
            getComponent: getCustomer
          },
          {
            path: ':id',
            getComponent: getCustomer
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    getComponent: getLogin,
  }
]

export default routeConf
