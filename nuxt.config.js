/* 
* nuxt 配置
 */

export default {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0)
      routes.push(...[
        {
          path:'/',
          component:resolve(__dirname,'pages/layout/'),
          children:[
            {
              path:'', // 默认子路由 首页
              name:'home',
              component:resolve(__dirname,'pages/home/')
            },
            {
              path: '/login', // 登录
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',  //注册
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username', // 个人
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings', // 设置
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor', // 编辑
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug', // 文章
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            },
          ]
        }
      ])
    }
  },
  // 注册插件
  plugins:['~/plugins/request.js','~/plugins/dayjs.js'],
  server: {
    port: 8000, // default: 3000
    host: 'localhost' // default: localhost,
  }
}