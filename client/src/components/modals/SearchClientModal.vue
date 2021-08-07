<template>
	<div id="searchClientToggler" uk-toggle="target: #searchClientBlock; animation: uk-animation-slide-top-small;"></div>
	<div id="searchClientBlock">
		<div>
			<div uk-spinner class="uk-center" v-if="loading"></div>
			<ul class="uk-margin-small-bottom" uk-accordion>
				<li v-for="client in clients" :key="client.id">
					<a class="uk-accordion-title">{{ client.phoneNumber }}</a>
					<div class="uk-accordion-content">
						<p class="param-label">Фамилия</p>
						<p class="param-value">{{ client.lastName }}</p>
						<p class="param-label">Имя</p>
						<p class="param-value">{{ client.firstName }}</p>
						<p class="param-label">Отчество</p>
						<p class="param-value">{{ client.middleName }}</p>
						<p class="param-label">E-mail</p>
						<p class="param-value">{{ client.email }}</p>
						<p class="param-label">Дата рождения</p>
						<p class="param-value">{{ moment(client.bdate).format('L') }}</p>
						<p class="param-label">Пол</p>
						<p class="param-value">
							<span v-if="client.sex == 1">Муж</span>
							<span v-else-if="client.sex == 2">Жен</span>
							<span v-else>Не определен</span>
						</p>
						<a class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" v-on:click="() => {select(client)}">Использовать</a>
					</div>
				</li>
			</ul>
			<a class="uk-button uk-button-secondary uk-button-small uk-width-1-1" style="border-radius: 5px;" v-on:click="toggler.toggle()">Скрыть</a>
		</div>
	</div>
</template>

<script>

import ClientService from '../../services/client.service'

export default {
	name: "searchClientModal",
	data(){
		return { 
			pattern: '', 
			toggler: null, 
			clients: [],
			loading: false,
		}
	},
	props: [ 'searchPattern' ],
	mounted() {
		this.toggler = window.UIkit.toggle("#searchClientToggler")
		this.toggler.toggle()
	},
	watch: {
		searchPattern(newVal) {
			if(newVal != ''){
				this.search(newVal)
			}
		},
	},
	methods: {
		moment: window.moment,
		search(pattern) {
			console.log(pattern)
			let filter = {
				phoneNumber: pattern
			}
			this.loading = true
			this.clients = []
			ClientService.getAllClients(1, 5, null, filter).then(resp => {
				this.clients = resp.data.clients
				this.loading = false
				if(this.clients.length == 0){
					window.UIkit.notification("Совпадений не найдено", { status: "warning" })
				} else {
					this.toggler.toggle()
				}
			}, error => {
				this.loading = false
				let message = error.response.data.message
				if(error.response.status == 500){
					message = "Ошибка сервера"
				} else if(error.response.status == 403){
					message = "У вас недостаточно прав для просмотра содержимого"
				}
				window.UIkit.notification(message, {status: 'danger'})
			})
			this.pattern = pattern
		},
		select(client){
			this.toggler.toggle()
			delete client.createdAt
			delete client.updatedAt
			delete client.id
			this.$emit('autofill', client)
			this.clients = []
		}
	}
}
</script>

<style scoped>
	#searchClientBlock {

    border: 1px solid #128b60;
    border-radius: 5px;
    margin-top: 5px;
    background: #f0fff8;
    padding: 10px;

}
</style>