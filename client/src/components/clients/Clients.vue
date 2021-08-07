<template>
	<div class="uk-container">
		<div>
				<div>
					<button class="filter-btn uk-width-1-1" id="editFilterBtn" uk-toggle="target: #editFilterBlock; animation: uk-animation-slide-top-small;">Фильтр 
						<span class="filter-btn-icon" uk-icon="icon: settings; ratio:0.8;"></span>
						<span class="filter-btn-label" v-if="filterFieldsCounter > 0">{{ filterFieldsCounter }}</span>
					</button>
				</div>

				<div id="editFilterBlock" style="border-radius: 0px 0px 5px 5px; margin-top: -2px;">
					<div>
						<div class="uk-grid-small" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Номер тел.</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.phoneNumber">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Фамилия</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.lastName">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Имя</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.firstName">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Отчество</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.middleName">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Д.р.</p></div>
							<div class="uk-width-expand">
								<input type="date" class="uk-input main-input" v-model="rawFilter.bdate">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Пол</p></div>
							<div class="uk-width-expand">
								<select class="uk-select" v-model="rawFilter.sex">
									<option value="">Не выбран</option>
									<option value="1">Муж</option>
									<option value="2">Жен</option>
								</select>
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Email</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.email">
							</div>
						</div>
						<div class="margin-small-top">
							<div class="uk-grid-small uk-child-width-1-2" uk-grid>
								<div>
									<button class="uk-button uk-button-secondary uk-button-small uk-width-1-1" v-on:click="resetFilter" style="border-radius: 5px;">Сбросить</button>
								</div>
								<div>
									<button class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" v-on:click="processFilter">Применить</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr class="divider uk-margin-small-top" />
		<div v-for="client, index in clients" :key="index">
			<router-link :to="{ name: 'editclient', params: {id: client.id}}" style="text-decoration: none !important;">
				<div class="preset-container uk-grid-collapse uk-margin-small-bottom" uk-grid>
					<div class="uk-width-expand">
						<p class="common-data"><span>{{ client.lastName }} {{ client.firstName }}</span></p>	
					</div>
					<div>
						<p class="key-number">{{ client.phoneNumber }}</p>
					</div>
					<div>
						<p style="margin-left: 5px; padding: 2px; color: #039566;"><span uk-icon="icon: chevron-right;"></span></p>
					</div>
				</div>
			</router-link>
		</div>
		<a class="uk-button uk-button-primary main-btn uk-width-1-1 uk-button-small uk-margin-small-bottom" v-on:click="showMore" :disabled="loading" v-if="displayMoreBtn"><div uk-spinner="ratio: 0.5" v-if="loading"></div> <div v-else>Показать ещё</div></a>
		</div>
</template>

<script>

import ClientService from '../../services/client.service'
	
export default {
	name: 'Clients',
	data() {
		return {
			clients: [],
			displayMoreBtn: true,
			filterFieldsCounter: 0,
			page: 1,
			filter: {},
			rawFilter: {},
			perPage: process.env.VUE_APP_DEFAULT_PER_PAGE || 5,
			loading: false,
		}
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push("/login")
			return;
		}
		document.getElementById('editFilterBlock').addEventListener('show', () => {
			document.getElementById('editFilterBtn').style.borderRadius = "5px 5px 0px 0px"
		})
		document.getElementById('editFilterBlock').addEventListener('hide', () => {
			document.getElementById('editFilterBtn').style.borderRadius = "5px"
		})
		this.resetFilter()
	},
	methods: {
		moment: window.moment,
		showMore() {
			this.loading = true;
			ClientService.getAllClients(this.page, this.perPage, { createdAt: -1 }, this.filter).then(resp => {
				this.clients = this.clients.concat(resp.data.clients)

				if(resp.data.clients.length == 0){
					if(this.page == 1){
						window.UIkit.notification("Клиенты отсутствуют")
					} else {
						window.UIkit.notification("Все клиенты уже выведены")
					}
				}

				if(resp.data.totalItems == this.clients.length){
					this.displayMoreBtn = false
				} else {
					this.displayMoreBtn = true
				}

				this.loading = false
				this.page += 1
			}, err => {
				window.UIkit.notification(err.response.data.message, {status: "danger"})
				this.loading = false;
			})
		},
		resetFilter(){
			window.UIkit.toggle('#editFilterBtn').toggle()
			this.rawFilter = {
				phoneNumber: '',
				lastName: '',
				firstName: '',
				middleName: '',
				bdate: '',
				sex: '',
				email: '',
			}
			this.filterFieldsCounter = 0;
			this.filter = {}
			this.page = 1
			this.clients = []
			this.showMore()
		},
		processFilter(){
			this.filter = {}
			this.filterFieldsCounter = 0;

			if(this.rawFilter.phoneNumber !== ''){
				this.filter.phoneNumber = this.rawFilter.phoneNumber
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.lastName !== ''){
				this.filter.lastName = this.rawFilter.lastName
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.firstName !== ''){
				this.filter.firstName = this.rawFilter.firstName
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.middleName !== ''){
				this.filter.middleName = this.rawFilter.middleName
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.bdate !== ''){
				this.filter.bdate = this.rawFilter.bdate
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.sex !== ''){
				this.filter.sex = this.rawFilter.sex
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.email !== ''){
				this.filter.email = this.rawFilter.email
				this.filterFieldsCounter += 1
			}
			window.UIkit.toggle('#editFilterBtn').toggle()
			window.filter = this.filter
			this.page = 1
			this.clients = []
			this.showMore()
		}
	}
}

</script>

<style scoped>
	/* rewrite */
.uk-select {
   border: 1px solid #979797 !important;
	border-radius: 5px;
	height: 30px !important;
}
.main-input {
	background-color: #fff !important;
	height: 30px !important;
}
/* endrewrite */
</style>