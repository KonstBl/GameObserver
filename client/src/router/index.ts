import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import SignUp from "../components/SignUp.vue"
import MainView from "../views/MainView.vue"
import GamesView from "../views/GamesView.vue"
import BlogsView from "../views/BlogsView.vue"
import ProfileView from "../views/ProfileView.vue"
import GamePage from "../views/GamePage.vue"
import BlogPage from "../views/BlogPage.vue"
import LoginPage from "../views/LoginPage.vue"
import BlogCreatePage from "../views/BlogCreatePage.vue"
import BlogUpdatePage from "../views/BlogUpdatePage.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "games",
    component: GamesView,
  },
  {
    path: "/blogs",
    name: "blogs",
    component: BlogsView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/game-page/:id",
    name: "GamePage",
    component: GamePage,
  },
  {
    path: "/blog-page/:id",
    name: "BlogPage",
    component: BlogPage,
  },
  {
    path: "/blog-create-page",
    name: "BlogCreatePage",
    component: BlogCreatePage,
  },

  {
    path: "/blog-update-page/:id",
    name: "BlogUpdate",
    component: BlogUpdatePage,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
