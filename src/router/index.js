import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import defaultLayout from "@/components/layout/defaultLayout.vue";
import TaskList from "@/views/Task/TaskList.vue";
import TaskCreate from "@/views/Task/TaskCreate.vue";
import TaskDetail from "@/views/Task/TaskDetail.vue";
import TaskEdit from "@/views/Task/TaskEdit.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: defaultLayout,
      children: [
        {
          path: "",
          component: Home,
          name: "Home",
        },
        {
          path: "tasks",
          component: TaskList,
          name: "tasks",
          meta: {
            breadcrumbs: [
              { isHome: true, path: "/" },
              { label: "Tasks", path: "/tasks " },
            ],
          },
        },
        {
          path: "tasks/create",
          component: TaskCreate,
          name: "taskscreate",
          meta: {
            breadcrumbs: [
              { isHome: true, path: "/" },
              { label: "Tasks", path: "/tasks" },
              { label: "Create" },
            ],
          },
        },
        {
          path: `tasks/detail/:id`,
          component: TaskDetail,
          name: "taskdetail",
          meta: {
            breadcrumbs: [
              { isHome: true, path: "/" },
              { label: "Tasks", path: "/tasks" },
              { label: "Detail" },
            ],
          },
        },
        {
          path: "tasks/edit/:id",
          component: TaskEdit,
          name: "taskupdate",
          meta: {
            breadcrumbs: [
              { isHome: true, path: "/" },
              { label: "Tasks", path: "/tasks" },
              { label: "Edit" },
            ],
          },
        },
      ],
    },
  ],
});

export default router;
