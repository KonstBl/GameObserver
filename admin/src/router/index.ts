import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import GamesView from "../views/GamesView.vue"
import BlogsView from "../views/BlogsView.vue"
import LoginPage from "../views/LoginPage.vue"
import GameUpdatePage from "../views/GameUpdatePage.vue"
import GameCreatePage from "../views/GameCreatePage.vue"
import UsersListPage from "../views/UsersListPage.vue"
import UserInfoPage from "../views/UserInfoPage.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/adm-games",
    name: "gamesAdm",
    component: GamesView,
  },
  {
    path: "/adm-blogs",
    name: "blogsAdm",
    component: BlogsView,
  },
  {
    path: "/adm-login",
    name: "LoginAdm",
    component: LoginPage,
  },
  {
    path: "/game-update/:id",
    name: "GameUpdate",
    component: GameUpdatePage,
  },
  {
    path: "/game-create",
    name: "GameCreate",
    component: GameCreatePage,
  },
  {
    path: "/users-list-page",
    name: "UsersListPage",
    component: UsersListPage,
  },
  {
    path: "/user-info-page",
    name: "UserInfoPage",
    component: UserInfoPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
