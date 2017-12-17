import Layout from './pages/layout'

const getDashboard = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/Dashboard').default)
  }, 'dashboard')
}
const getPasswd = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./containers/Passwd').default)
  }, 'passwd')
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
const getBurnintests = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./containers/Burnintests').default)
  }, 'burnintests')
}
const getBurninbeats = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./containers/Burninbeats').default)
  }, 'burninbeats')
}
const routeConf = [
  {
    path: '/',
    component: Layout,
    indexRoute: { getComponent: getBurnintests },
    childRoutes: [
      {
        path: 'dashboard',
        getComponent: getDashboard
      },
      {
        path: 'passwd',
        getComponent: getPasswd
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
      },
      {
        path: 'burnintests',
        indexRoute: { getComponent: getBurnintests },
        childRoutes: [
          {
            path: ':burnintest',
            getComponent: getBurninbeats
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
