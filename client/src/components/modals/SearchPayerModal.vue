<template>
	<div id="searchPayerToggler" uk-toggle="target: #searchPayerBlock; animation: uk-animation-slide-top-small;"></div>
	<div id="searchPayerBlock">
		<div>
			<div uk-spinner class="uk-center" v-if="loading"></div>
			<ul class="uk-margin-small-bottom" uk-accordion>
				<li v-for="payer in payers" :key="payer.id">
					<a class="uk-accordion-title">{{ payer.phoneNumber }}</a>
					<div class="uk-accordion-content">
						<p class="param-label">Плательщик</p>
						<p class="param-value">{{ payer.title }}</p>
						<p class="param-label">ИНН</p>
						<p class="param-value">{{ payer.INN }}</p>
						<p class="param-label">Адрес</p>
						<p class="param-value">{{ payer.address }}</p>
						<button class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" v-on:click="() => {select(payer)}">Использовать</button>
					</div>
				</li>
			</ul>
			<button class="uk-button uk-button-secondary uk-button-small uk-width-1-1" style="border-radius: 5px;" v-on:click="toggler.toggle()">Скрыть</button>
		</div>
	</div>
</template>

<script>

import PayerService from '../../services/payer.service'

export default {
	name: "searchPayerModal",
	data(){
		return { 
			pattern: '', 
			toggler: null, 
			payers: [],
			loading: false,
		}
	},
	props: [ 'searchPattern' ],
	mounted() {
		this.toggler = window.UIkit.toggle("#searchPayerToggler")
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
		search(pattern) {
			console.log(pattern)
			let filter = {
				phoneNumber: pattern
			}
			this.loading = true
			this.payers = []
			PayerService.getAllPayers(1, 5, null, filter).then(resp => {
				this.payers = resp.data.payers
				this.loading = false
				if(this.payers.length == 0){
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
		select(payer){
			this.toggler.toggle()
			delete payer.createdAt
			delete payer.updatedAt
			delete payer.id
			this.$emit('autofill', payer)
			this.payers = []
		}
	}
}
</script>


<style scoped>
	#searchPayerBlock {

    border: 1px solid #128b60;
    border-radius: 5px;
    margin-top: 5px;
    background: #f0fff8;
    padding: 10px;

}
</style>