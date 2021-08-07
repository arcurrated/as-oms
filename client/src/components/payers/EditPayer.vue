<template>
	<div class="uk-container">
		<div class="custom-card">
			<p class="custom-card-header">Плательщик</p>
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
							<div class="edit-param-value" v-if="!editMap.phoneNumber"><p>{{ payer.phoneNumber }}</p></div>
							<input class="uk-input main-input" v-model="payer.phoneNumber" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.phoneNumber = true" v-if="!editMap.phoneNumber"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.phoneNumber = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Плательщик</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.title"><p>{{ payer.title }}</p></div>
							<input class="uk-input main-input" v-model="payer.title" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.title = true" v-if="!editMap.title"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.title = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>ИНН</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.INN"><p>{{ payer.INN }}</p></div>
							<input class="uk-input main-input" v-model="payer.INN" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.INN = true" v-if="!editMap.INN"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.INN = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Адрес</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.address"><p>{{ payer.address }}</p></div>
							<input class="uk-input main-input" v-model="payer.address" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.address = true" v-if="!editMap.address"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.address = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button class="uk-button uk-button-primary main-btn uk-button-small uk-margin-small-top uk-margin-bottom uk-width-1-1" style="background: #fe4f70 !important;" v-on:click="remove"><span uk-icon="icon: trash; ratio: 0.8;"></span>&nbsp;&nbsp;Удалить</button>
	</div>
</template>

<script>

import PayerService from '../../services/payer.service'
	
export default {
	name: 'editpayer',
	data() {
		return { payer: null, payerId: null, loading: true, editMap: {}}
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
			return;
		}
		this.payerId = this.$route.params.id
		PayerService.getById(this.payerId).then(resp => {
			this.payer = resp.data
			this.loading = false
		}, err => {
			window.UIkit.notification(err.response.data.message, {status: "danger"})
			this.loading = false
		})
	},
	methods: {
		moment: window.moment,
		update(){
			PayerService.update(this.payerId, this.payer).then(() => {
				window.UIkit.notification("Изменения успешно сохранены", {status: "success"})
			}, err => {
				window.UIkit.notification(err.response.data.message, {status: "danger"})
			})
		},
		remove(){
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить пресет?").then(() => {
				PayerService.remove(this.payerId).then(() => {
					window.UIkit.notification("Пресет успешно удален", {status: "success"})
					this.$router.push('/payers')
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