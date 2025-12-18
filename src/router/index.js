import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import defaultLayout from '@/components/layout/defaultLayout.vue';
import TaskList from '@/views/Task/TaskList.vue';
import TaskCreate from '@/views/Task/TaskCreate.vue';
import TaskDetail from '@/views/Task/TaskDetail.vue';
import TaskUpdate from '@/views/Task/TaskUpdate.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'/',
      component: defaultLayout,
      children:[
        {
          path:'tasks',
          component:TaskList,
          name:'tasks'
        },
        {
          path:'tasks/create',
          component:TaskCreate,
          name:'taskscreate'
        },
        {
          path:'tasks/detail',
          component:TaskDetail,
          name:'taskdetail'
        },
        {
          path:'tasks/update',
          component:TaskUpdate,
          name:'taskupdate'
        }
      ]
    }
  ]
})

export default router
