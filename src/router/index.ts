import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { commonRoutes } from '@/router/commonRoutes'
import { accountRoutes } from '@/router/accountRoutes'

const routes: Array<RouteRecordRaw> = [
  ...commonRoutes,
  ...accountRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  window.document.title = to.meta && title ? `${title} | ВИТЯЗЬ-АЭРО` : 'ВИТЯЗЬ-АЭРО'

  next()
})

router.afterEach(() => {
  const specialWrapper = document.querySelector('#special')
  if (specialWrapper) {
    const imagesButton = specialWrapper.querySelector('.special-images button') as HTMLButtonElement
    if (+imagesButton.value === 0) {
      setTimeout(() => {
        imagesButton.dispatchEvent(new Event('click'))
        imagesButton.dispatchEvent(new Event('click'))
      }, 1)
    }
  }
})

export default router
