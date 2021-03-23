const routes = [
  { path: '/login', component: './login', syncValidAuth: true },
  {
    path: '/',
    component: '../auth',
    routes: [
      {
        path: '/', component: '../layouts',
        routes: [
          { path: '/', component: './dashboard' },
          {
            path: '/components', component: './reComponents',
            routes: [
              { path: '/components', redirect: '/components/field' },
              { path: 'field', component: './reComponents/field/demos'},
              { path: 'modalWrapper', component: './reComponents/modalWrapper/demos'},
            ]
          },
          {
            path: '/maliang', component: './maliang'
          },
          { path: '/*', component: './404' },
        ],
      },

    ],
  },
]

module.exports = routes
