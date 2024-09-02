import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import("@/views/dashboard/dashboard.vue")
    },
    {
      path: '/users',
      name: 'users',
      component: () => import("@/views/user/user-list.vue")
    },
    {
      path: '/users/add',
      name: 'add-user',
      component: () => import("@/views/user/user-form.vue")
    },
    {
      path: '/users/:id',
      name: 'user-info',
      component: () => import("@/views/user/user-info.vue"),
      props: true
    },
    {
      path: '/users/:id/edit',
      name: 'edit-user',
      component: () => import("@/views/user/user-form.vue"),
      props: true
    }
  ]
})

export default router
