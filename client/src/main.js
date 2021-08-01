import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UIkit from "uikit"
import Icons from 'uikit/dist/js/uikit-icons'
import moment from 'moment'
import { rubles } from 'rubles'
//import "./assets/uikit.css"
import "uikit/dist/css/uikit.min.css"
import "./assets/css/custom.css"
//import "uikit/src/scss/uikit-theme.scss"
//import "uikit/src/less/uikit.less"
// comment

UIkit.use(Icons)
window.UIkit = UIkit
moment.locale('ru')
window.moment = moment
window.rubles = rubles

createApp(App).use(router).use(store).mount('#app')
