import i18n from '@/plugins/i18n.ts'
import router from '@/plugins/router.ts'
import App from '@/App.vue'
import { createApp } from 'vue'

const app = createApp(App)


app.use(i18n)
app.use(router)

app.mount('#app')
