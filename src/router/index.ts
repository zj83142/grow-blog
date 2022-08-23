import { createRouter, createWebHistory } from 'vue-router'

const _import = (path:string) => () => import(`../pages/${path}.vue`);

const routes = [
  { path: '/', component: _import('Home/index') },
  { path: '/home', component: _import('Home/index') },
  { path: '/login', component: _import('Login/index') },
  { path: '/blogDetail/:id', 
    component: _import('BlogDetail/index'),
  },
  { path: '/editBlog/:id?', 
    component: _import('BlogEdit/index'),
  },
  { path: '/blog', 
    component: _import('Blogs/index'),
    children: [
      {
        path: ':category',
        component: _import('Blogs/List/index')
      },
      {
        path: ':category/:id',
        component: _import('Blogs/Detail/index')
      }, {
        path: 'detail/:id',
        component: _import('BlogDetail/index')
      }
    ]
  },
  { 
    path: '/tools', 
    component: _import('Tools/index'),
    children: [
      {
        path: 'demo/bgcolor',
        component: _import('Tools/Demo/BgColor/index')
      },
      {
        path: 'demo/randomcolor',
        component:  _import('Tools/Demo/RandomColor')
      },
      {
        path: 'demo/hexagonbg',
        component: _import('Tools/Demo/HexagonBg')
      }
    ] 
  },
  { path: '/pictures/:type?', component: _import('Pictures/index') },
  
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
