import { createWebHistory, createRouter } from 'vue-router'
import login from './components/Login.vue'
import register from './components/Register.vue'

const profile = () => import('./components/Profile.vue')
const orders = () => import('./components/Orders.vue')
const createOrder = () => import('./components/CreateOrder.vue')
const editOrder = () => import('./components/EditOrder.vue')
const printOrder = () => import('./components/PrintOrder.vue')

const routes = [
	{
		path: "/",
		component: orders,
		meta: {title: 'Заказ-наряды'}
	},
	{
		path: "/profile",
		name: "proile",
		component: profile,
		meta: {title: 'Мой профиль'}
	},
	{
		path: "/orders",
		name: "orders",
		component: orders,
		meta: {title: 'Заказ-наряды'}
	},
	{
		path: "/createorder",
		name: "createorder",
		component: createOrder,
		meta: {title: "Создать заказ-наряд"}
	},
	{
		path: "/editorder/:id",
		name: "editorder",
		component: editOrder,
		meta: {title: "Редактирование заказ-наряда" }
	},
	{
		path: '/printorder/:id',
		name: 'printorder',
		component: printOrder,
		meta: {title: "Печать заказ-наряда"}
	},
	{
		path: "/login",
		component: login,
		meta: {title: 'Вход'}
	},
	{
		path: "/register",
		component: register,
		meta: {title: 'Регистрация'}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

const DEFAULT_TITLE = 'Управление автосервисом';
router.afterEach((to) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    document.title = to.meta.title || DEFAULT_TITLE
});

export default router