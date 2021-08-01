<template>
	<div class="uk-container">
		<div class="custom-card uk-margin-bottom">
			<p class="custom-card-header">
				Данные
			</p>
			<div class="custom-card-body">
				<p class="uk-text-bold uk-margin-small-bottom uk-margin-small-top">Имя пользователя<pre>{{ currentUser.username }}</pre></p>
				<p class="uk-text-bold uk-margin-remove">Права доступа<pre>{{ currentUser.role }}</pre></p>
				<button id="changePasswordBtn" class="uk-button uk-button-primary main-btn uk-width-1-1 uk-button-small" uk-toggle="target: #changePasswordBlock">Изменить пароль</button>
				<div id="changePasswordBlock" class="uk-margin-small-top">
					<Form :validation-schema="schema" @submit="handleChangePassword">
						<Field name="lastPassword" type="password" class="uk-input main-input uk-margin-small-top" placeholder="Старый пароль"/>
						<ErrorMessage name="lastPassword" class="error-feedback"/>

						<Field name="password" type="password" class="uk-input main-input uk-margin-small-top" placeholder="Новый пароль"/>
						<ErrorMessage name="password" class="error-feedback"/>

						<Field name="passwordRepeat" type="password" class="uk-input main-input uk-margin-small-top" placeholder="Повторите новый пароль"/>
						<ErrorMessage name="passwordRepeat" class="error-feedback"/>

						<button class="uk-button uk-button-primary main-btn uk-width-1-1 uk-margin-small-top">Изменить</button>
					</Form>
				</div>
			</div>
		</div>
		
		<div class="custom-card uk-margin-bottom" v-if="currentUser.role=='admin'">
			<p class="custom-card-header">Управление аккаунтами</p>
			<div class="custom-card-body">
				<div v-for="user, index in users" :key="index">
					<div class="user-data-container uk-grid-small uk-margin-small-top" uk-grid v-if="user.username != currentUser.username">
						<div class="uk-width-expand">
							<p style="font-size: 1.1em; font-family: monospace;">{{ user.username }}</p>
						</div>
						<div>
							<button class="uk-button uk-button-primary main-btn uk-button-small" v-on:click="() => {updatePassword(index)}">изм пароль</button>
						</div>
						<div>
							<div v-if="!user.editing">
								<p v-if="user.role==0">guest</p>
								<p v-else-if="user.role == 1">moder</p>
								<p v-else-if="user.role == 2">admin</p>
								<p v-else-if="user.role > 2">god</p>
								<p v-else>dust</p>
							</div>
							<div v-else>
								<select class="uk-select" v-model="user.role">
									<option value="0">guest</option>
									<option value="1">moder</option>
									<option value="2">admin</option>
								</select>
							</div>
						</div>
						<div v-if="!user.editing"><a class="delete-btn" style="padding-top:5px;padding-bottom: 5px;" v-on:click="() => {deleteUser(index)}"><span uk-icon="icon: trash"></span></a></div>
						<div v-if="!user.editing"><a class="edit-btn" style="padding-top:5px;padding-bottom: 5px;" v-on:click="user.editing=true"><span uk-icon="icon: pencil"></span></a></div>
						<div v-if="user.editing">
							<div class="done-btn" style="padding: 5px; width: 30px;" v-on:click="() => {
								user.editing=false;updateUser(index);
							}"><span uk-icon="icon:check;"></span></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="uk-margin-bottom">
			<EditCommons />
		</div>
	</div>
</template>

<script>

import { Form, Field, ErrorMessage } from 'vee-validate'
import EditCommons from './EditCommons.vue'
import * as yup from "yup"

import UserService from '../services/user.service'
	
export default {
	name: 'profile', 
	components: { Form, Field, ErrorMessage, EditCommons },
	data(){
		const schema = yup.object().shape({
			lastPassword: yup.string().required("Required"),
			password: yup.string().required("Required").min(5, "Min 5 chars").max(15, "Max 15 chars"),
			passwordRepeat: yup.string()
		})
		return { schema, currentUser: {}, users: [] }
	},
	computed: {
		
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
		}
		this.currentUser = this.$store.state.auth.user
		window.UIkit.toggle('#changePasswordBtn').toggle()

		if(this.currentUser.role == 'admin'){
			this.reloadUsers()
		}
	},
	methods: {
		reloadUsers(){
			UserService.getAllUsers().then((resp) => {
				this.users = resp.data
			}, error => {
				window.UIkit.notification(error.response.data.message, {status: "danger"})
			})
		},
		handleChangePassword(data, { resetForm }){
			data.username = this.currentUser.username
			if(data.password != data.passwordRepeat){
				window.UIkit.notification("Пароли не совпадают", {status: "danger"})
			} else {
				UserService.setPassword(data).then(() => {
					resetForm()
					window.UIkit.notification("Пароль успешно изменен", {status: "success"})
					window.UIkit.toggle('#changePasswordBtn').toggle()
				}, error => {
					window.UIkit.notification(error.response.data.message, {status: 'danger'})
				})
			}
		},
		updatePassword(index){
			const data = {
				username: this.users[index].username,
				password: window.prompt("Введите новый пароль:")
			}
			console.log(data)
			UserService.setPassword(data).then(() => {
				window.UIkit.notification("Пароль успешно изменен", {status: "success"})
			}, error => {
				window.UIkit.notification(error.response.data.message, {status: "danger"})
			})
		},
		updateUser(index){
			//update role
			const user = this.users[index]
			const data = {
				username: user.username,
				role: user.role
			}
			UserService.setRole(data).then(() => {
				window.UIkit.notification("Статус успешно изменен", {status: "success"})
			}, error => {
				window.UIkit.notification(error.response.data.message, {status: "danger"})
			})
		},
		deleteUser(index){
			const username = this.users[index].username
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить пользователя " + username).then(() => {
				UserService.deleteUser(username).then(() => {
					window.UIkit.notification("Пользователь успешно удален", { status: "success" })
					this.reloadUsers()
				}, error => {
					window.UIkit.notification(error.response.data.message, {status: "danger"})	
				})	
			}, () => {})
		}
	}
}

</script>


<style scoped>
.user-data-container p {
	margin: 0px;
	line-height: 30px;
}

	/* rewrite */
.uk-grid-small {
	margin-left: -10px !important;
}
.uk-grid-small > * {
	padding-left: 10px;
}
.uk-select {
	background-color: #f0fff8 !important;
   border: 1px solid #979797 !important;
	border-radius: 5px;
	height: 30px !important;
}
</style>