<template>
	<div class="uk-container">
		<div class="custom-card">
			<p class="custom-card-header">Клиент</p>
			<div class="custom-card-body">
				<div v-if="loading" class="uk-flex uk-flex-center uk-margin-small-top">
					<div uk-spinner></div>
				</div>
				<div v-else>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Номер телефона</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.phoneNumber"><p>{{ client.phoneNumber }}</p></div>
							<input class="uk-input main-input" v-model="client.phoneNumber" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.phoneNumber = true" v-if="!editMap.phoneNumber"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.phoneNumber = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Фамилия</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.lastName"><p>{{ client.lastName }}</p></div>
							<input class="uk-input main-input" v-model="client.lastName" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.lastName = true" v-if="!editMap.lastName"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.lastName = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Имя</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.firstName"><p>{{ client.firstName }}</p></div>
							<input class="uk-input main-input" v-model="client.firstName" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.firstName = true" v-if="!editMap.firstName"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.firstName = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Отчество</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.middleName"><p>{{ client.middleName }}</p></div>
							<input class="uk-input main-input" v-model="client.middleName" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.middleName = true" v-if="!editMap.middleName"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.middleName = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>День рождения</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.bdate"><p>{{ moment(client.bdate).format('L') }}</p></div>
							<input class="uk-input main-input" type="date" v-model="client.bdate" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.bdate = true" v-if="!editMap.bdate"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.bdate = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Пол</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.sex">
								<p v-if="client.sex == 1">Муж</p>
								<p v-else-if="client.sex == 2">Жен</p>
								<p v-else>Не определен</p>
							</div>
							<select class="uk-select" v-model="client.sex" v-else>
								<option value="">Не выбран</option>
								<option value="1">Муж</option>
								<option value="2">Жен</option>
							</select>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.sex = true" v-if="!editMap.sex"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.sex = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Email</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.email"><p>{{ client.email }}</p></div>
							<input class="uk-input main-input" type="email" v-model="client.email" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.email = true" v-if="!editMap.email"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.email = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button class="uk-button uk-button-primary main-btn uk-button-small uk-margin-small-top uk-margin-bottom uk-width-1-1" style="background: #fe4f70 !important;" v-on:click="remove"><span uk-icon="icon: trash; ratio: 0.8;"></span>&nbsp;&nbsp;Удалить</button>
	</div>
</template>

<script>

import ClientService from '../../services/client.service'
	
export default {
	name: 'editclient',
	data() {
		return { client: null, clientId: null, loading: true, editMap: {}}
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
			return;
		}
		this.clientId = this.$route.params.id
		ClientService.getById(this.clientId).then(resp => {
			this.client = resp.data
			this.client.bdate = this.client.bdate.split('T')[0]
			this.loading = false
		}, err => {
			window.UIkit.notification(err.response.data.message, {status: "danger"})
			this.loading = false
		})
	},
	methods: {
		moment: window.moment,
		update(){
			ClientService.update(this.clientId, this.client).then(() => {
				window.UIkit.notification("Изменения успешно сохранены", {status: "success"})
			}, err => {
				window.UIkit.notification(err.response.data.message, {status: "danger"})
			})
		},
		remove(){
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить пресет?").then(() => {
				ClientService.remove(this.clientId).then(() => {
					window.UIkit.notification("Пресет успешно удален", {status: "success"})
					this.$router.push('/clients')
				}, err => {
					window.UIkit.notification(err.response.data.message, {status: "danger"})
				})
			})
		}
	}
}

</script>

<style scoped>
/* rewrite */
.uk-grid-small {
	margin-left: -10px !important;
}
.uk-grid-small > * {
	padding-left: 10px;
}
.uk-input {
	height: 30px !important;
}
.uk-select {
   border: 1px solid #979797 !important;
	border-radius: 5px;
	height: 30px !important;
}
/* endrewrite */
</style>