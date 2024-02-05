import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

import { useUserStore } from "../stores/user-store";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  /*Router.beforeEach(async (to, from, next) => { version 1
    const requiredAuth = to.meta.auth;
    const userStore = useUserStore();
    // si existe el token en memoria
    if (userStore.token) {
      return next();
    }

    //si no existe el token(Se refresco el sitio web)
    if (sessionStorage.getItem("user")) {
      await userStore.refreshToken();
      if (requiredAuth) {
        // Validar al usurio o token
        if (userStore.token) {
          return next();
        }
        return next("/login");
      } else {
        return next();
      }
    } else {
      if (requiredAuth) {
        await userStore.refreshToken();
        if (userStore.token) {
          return next();
        }
        return next("/login");
      }
      next();
    }
  });*/
  /* Router.beforeEach(async (to, from, next) => { version 2
    const requiredAuth = to.meta.auth;
    const userStore = useUserStore();
si no existe el token(Se refresco el sitio web) version 2
    if (userStore.token || sessionStorage.getItem("user")) {
      await userStore.refreshToken();
      if (requiredAuth && !userStore.token) {
        return next("/login");
      }
      return next();
    }

    if (requiredAuth) {
      await userStore.refreshToken();
      if (userStore.token) {
        return next();
      }
      return next("/login");
    }

    next();
  });*/
  Router.beforeEach(async (to, from, next) => {
    const requiredAuth = to.meta.auth;
    const userStore = useUserStore();
    // si existe el token en memoria
    if (userStore.token) {
      return next();
    }
    // si no existe el token(Se refresco el sitio web)version 3
    if (requiredAuth || sessionStorage.getItem("user")) {
      await userStore.refreshToken();
      if (userStore.token) {
        return next();
      }
      return next("/login");
    }
    return next();
  });
  return Router;
});
