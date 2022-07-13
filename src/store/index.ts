import type { App } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
const store: any = {}

export const registerStore = (app: App | undefined): void => {
  const pinia = createPinia()
  app?.use(pinia)
}

export { store as default, store, storeToRefs }
