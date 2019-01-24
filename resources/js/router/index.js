import Vue from 'vue'
import store from '~/store'
import Meta from 'vue-meta'
import routes from './routes'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import { loadMessages } from '~/plugins/i18n'
import iView from 'iview';

Vue.use(iView);
Vue.use(Meta)
Vue.use(Router)

const router = make()

sync(store, router)

export default router

/**
 * Create a new router instance.
 *
 * @return {Router}
 */
function make () {
  const router = new Router({
    scrollBehavior,
    mode: 'history',
    routes: routes.map(beforeEnter)
  })

  router.beforeEach((to, from, next) => {
      iView.LoadingBar.start();
      next();
  });

  router.afterEach(route => {
      iView.LoadingBar.finish();
  });

  // Register before guard.
  router.beforeEach(async (to, from, next) => {
    await loadMessages(store.getters['lang/locale'])

    if (!store.getters['auth/check'] && store.getters['auth/token']) {
      try {
        await store.dispatch('auth/fetchUser')
      } catch (e) { }
    }

    await setLayout(to)
    next()
  })

  // Register after hook.
  router.afterEach((to, from) => {
    router.app.$nextTick(() => {
      router.app.$loading.finish()
    })
  })

  return router
}

/**
 * Add beforeEnter guard to the route.
 *
 * @param {Object} route
 * @param {Object}
 */
function beforeEnter (route) {
  if (route.children) {
    route.children.forEach(beforeEnter)
  }

  return route
}

/**
 * Set the application layout from the matched page component.
 *
 * @param {Route} to
 */
async function setLayout (to) {
  // Get the first matched component.
  let [component] = router.getMatchedComponents({ ...to })

  if (component) {
    await router.app.$nextTick()

    if (typeof component === 'function') {
      component = await component()
    }

    // Start the page loading bar.
    if (component.loading !== false) {
      router.app.$loading.start()
    }

    // Set application layout.
    router.app.setLayout(component.layout || '')
  }
}

/**
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return { selector: to.hash }
  }

  const [component] = router.getMatchedComponents({ ...to }).slice(-1)

  if (component && component.scrollToTop === false) {
    return {}
  }

  return { x: 0, y: 0 }
}
