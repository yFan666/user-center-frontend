export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎页' },
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canUser', // 权限
    routes: [
      { path: '/admin', redirect: '/admin/user-manage' },
      { path: '/admin/user-manage', name: '用户管理', component: './Admin/UserManage' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
