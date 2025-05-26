import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import AddJobsView from "@/views/AddJobsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobDetailsView from "@/views/JobDetailsView.vue";
import EdditJobView from "@/views/EdditJobView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsView,
    },
    {
      path: "/jobs/:id",
      name: "job-details",
      component: JobDetailsView,
    },
    {
      path: "/jobs/add",
      name: "add-jobs",
      component: AddJobsView,
    },
    {
      path: "/jobs/edit/:id",
      name: "eddit-jobs",
      component: EdditJobView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
