<template>
	<div class="uk-container">
		<Form @submit="handleLogin" class='uk-margin-top' :validation-schema="schema">
			<!--<div class='uk-alert-warning' v-if="message" uk-alert>
				<p>{{ message }}</p>
			</div>-->
			<div class="uk-margin">
				<Field class='uk-input main-input' placeholder="имя пользователя" name="username" type="text" />
				<ErrorMessage name="username" class="error-feedback" />
			</div>

			<div class="uk-margin">
				<Field class="uk-input main-input" placeholder="пароль" name="password" type="password" />
				<ErrorMessage name="password" class="error-feedback" />	
			</div>
			<button class='uk-button uk-width-1-1 uk-button-primary main-btn' :disabled="loading"><div uk-spinner="ratio: 0.5" v-if="loading"></div> Войти</button>
		</Form>
	</div>
</template>

<script>

import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"

export default {
	name: "login",
	components: {
		Form, Field, ErrorMessage
	},
	data() {
		const schema = yup.object().shape({
			username: yup.string().required("Поле обязательно к заполнению"),
			password: yup.string().required("Поле обязательно к заполнению"),
		})
		return {
			loading: false,
			message: "",
			schema
		}
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		}
	},
	created() {
		if(this.loggedIn){
			this.$router.push('/orders')
		}
	},
	methods: {
		handleLogin(user) {
			this.loading = true
			this.$store.dispatch('auth/login', user).then(() => {
				window.UIkit.notification("Вы успешно вошли в систему", {status: 'success'})
				this.$router.push('/orders')
			}, error => {
				this.loading = false
				if(error.response.status == 401){
					this.message = "Неправильный логин или пароль"
				} else if(error.response.status == 500) {
					this.message = "Ошибка сервера"
				} else {
					this.message ="Непредвиденная ошибка"
				}
				window.UIkit.notification(this.message, {status: "danger"})
				//this.message = error.response.data.message
			})
		}
	}
}

</script>

<style scoped>
	
</style>