<template>
	<div class="uk-container">
		<Form @submit="handleRegister" class="uk-margin-top" :validation-schema="schema">
			<!--<div class='uk-alert-warning' v-if="message" uk-alert>
				<p>{{ message }}</p>
			</div>-->
			<div v-if="!successful">
				<div class="uk-margin">
					<Field class='uk-input main-input' name="username" placeholder="имя пользователя" type="text"/>
					<ErrorMessage name="username" class='error-feedback'/>
				</div>
				<div class="uk-margin">
					<Field class='uk-input main-input' name="password" placeholder="придумайте пароль" type="password" />
					<ErrorMessage name="password" class="error-feedback" />
				</div>
				<div class="uk-margin">
					<Field class='uk-input main-input' name="repeatPassword" placeholder="повторите пароль" type="password" />
					<ErrorMessage name="password" class="error-feedback" />
				</div>
				
				<button class='uk-button uk-width-1-1 uk-button-primary main-btn' :disabled="loading"><div uk-spinner="ratio: 0.5" v-if="loading"></div> Зарегистрироваться</button>
			</div>
		</Form>
	</div>
</template>

<script>

import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"

export default {
	name: 'register',
	components: { Form, Field, ErrorMessage },
	data() {
		const schema = yup.object().shape({
			username: yup.string().required("Поле обязательно для заполнения").min(3, "Минимум 3 символа").max(15, "Максимум 15 символов").matches(/^[a-zA-Z0-9]+$/, "Только латинница и цифры"),
			password: yup.string().required("Поле обязательно для заполнения").min(5, "Минимум 3 символа").max(15, "Максимум 15 символов")
		})
		return {
			loading: false,
			successful: false,
			message: '',
			schema
		}
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn
		}
	},
	mounted() {
		if(this.loggedIn){
			this.$router.push('/orders')
		}
	},
	methods: {
		handleRegister(user) {
			if(user.password !== user.repeatPassword){
				window.UIkit.notification("Пароли не совпадают", {status: "danger"})
				return
			}
			this.message = ''
			this.successful = false
			this.loading = true

			this.$store.dispatch("auth/register", user).then(data => {
				this.message = data.message
				window.UIkit.notification("Вы успешно зарегистрировались", {status: "success"})
				this.$router.push('/login')
				this.successful = true
				this.loading = false
			}, error => {
				if(error.response.status == 409){
					this.message = 'Имя пользователя уже занято'
				} else if(error.response.status == 500) {
					this.message = "Ошибка сервера"
				} else {
					this.message = error.response.data.message
				}
				window.UIkit.notification(this.message, {status: "danger"})
				this.loading = false
				this.successful = false
			})
		}
	}
}

</script>