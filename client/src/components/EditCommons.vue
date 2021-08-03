<template>
	<div class="custom-card">
		<p class="custom-card-header">Редактирование основных переменных</p>
		<div class="custom-card-body">
			<div v-if="loading" class="uk-flex uk-flex-center uk-margin-small-top">
				<div uk-spinner></div>
			</div>
			<div v-else>
				<input type="text" v-model="commons.organizationTitle" placeholder="Название организации" class="uk-input main-input uk-margin-small-top">
				<input type="text" v-model="commons.organizationAddress" placeholder="Адрес организации" class="uk-input main-input uk-margin-small-top">
				<textarea class="uk-margin-small-top uk-textarea main-input" rows="8" v-model="commons.orderAgreementText" placeholder="Текст соглашения (под з/н)">
					
				</textarea>
				<input type="number" v-model="commons.currentOrderNumber" placeholder="Следущий номер з/н" class="uk-input main-input uk-margin-small-top" >
				<button class="uk-button uk-button-primary main-btn uk-width-1-1 uk-margin-small-top" v-on:click="update" :disabled="updating"><div uk-spinner="ratio: 0.5" v-if="updating"></div>Обновить</button>
			</div>
		</div>
	</div>
</template>

<script>

import CommonsService from '../services/commons.service'

export default {
	name: "EditCommons",
	data(){
		return { 
			commons: {},
			loading: false,
			updating: false,
		}
	},
	mounted() {
		this.loading = true
		CommonsService.get().then(resp => {
			this.commons = resp.data
			this.loading = false
		}, error => {
			window.UIkit.notification(error.response.data.message, { status: 'danger' })
			this.loading = false
		})
	},
	methods: {
		update(){
			this.updating = true
			CommonsService.update(this.commons).then(() => {
				window.UIkit.notification("Переменные успешно обновлены", { status: 'success' })
				this.updating = false
			}, error => {
				window.UIkit.notification(error.response.data.message, { status: 'danger' })
				this.updating = false
			})
		}
	}
}
</script>