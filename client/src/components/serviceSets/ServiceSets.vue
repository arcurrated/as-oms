<template>
	<div class="uk-container">
		<div>
				<div>
					<button class="uk-button uk-button-primary main-btn uk-width-1-1" v-on:click="create"><span uk-icon="icon: plus-circle; ratio: .6;"></span>&nbsp;&nbsp;Создать сет обслуживания</button>
					<button class="filter-btn uk-width-1-1 uk-margin-small-top" id="editFilterBtn" uk-toggle="target: #editFilterBlock; animation: uk-animation-slide-top-small;">Фильтр 
						<span class="filter-btn-icon" uk-icon="icon: settings; ratio:0.8;"></span>
						<span class="filter-btn-label" v-if="filterFieldsCounter > 0">{{ filterFieldsCounter }}</span>
					</button>
				</div>

				<div id="editFilterBlock" style="border-radius: 0px 0px 5px 5px; margin-top: -2px;">
					<div>
						<div class="uk-grid-small" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Название</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.title">
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
		<div v-for="serviceSet, index in serviceSets" :key="index">
			<router-link :to="{ name: 'editserviceset', params: {id: serviceSet.id}}" style="text-decoration: none !important;">
				<div class="preset-container uk-grid-collapse uk-margin-small-bottom" uk-grid>
					<div class="uk-width-expand">
						<p class="common-data"><span>{{ serviceSet.title }}</span></p>	
					</div>
					<div>
						<p class="key-number">{{ serviceSet.totalPrice }}₽</p>
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
import ServiceSetService from '../../services/serviceSet.service'

export default {
	name: "ServiceSets",
	data(){
		return {
			serviceSets: [],
			filter: {},
			rawFilter: {},
			page: 1,
			perPage: process.env.VUE_APP_DEFAULT_PER_PAGE || 5,
			loading: false,
			filterFieldsCounter: 0,
			displayMoreBtn: true,
		}
	},
	mounted(){
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
			return
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
			ServiceSetService.getAll(this.page, this.perPage, { createdAt: -1 }, this.filter).then(resp => {
				this.serviceSets = this.serviceSets.concat(resp.data.serviceSets)

				if(resp.data.serviceSets.length == 0){
					if(this.page == 1){
						window.UIkit.notification("Клиенты отсутствуют")
					} else {
						window.UIkit.notification("Все клиенты уже выведены")
					}
				}

				if(resp.data.totalItems == this.serviceSets.length){
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
				title: '',
			}
			this.filterFieldsCounter = 0;
			this.filter = {}
			this.page = 1
			this.serviceSets = []
			this.showMore()
		},
		processFilter(){
			this.filter = {}
			this.filterFieldsCounter = 0;

			if(this.rawFilter.title !== ''){
				this.filter.title = this.rawFilter.title
				this.filterFieldsCounter += 1
			}

			window.UIkit.toggle('#editFilterBtn').toggle()
			window.filter = this.filter
			this.page = 1
			this.serviceSets = []
			this.showMore()
		},
		create(){
			const serviceSet = {
				title: '',
				operations: [],
				parts: [],
			}
			ServiceSetService.create(serviceSet).then(resp => {
				const serviceSetId = resp.data.id
				this.$router.push({ name: 'editserviceset', params: {id: serviceSetId }})
			}, error => {
				window.UIkit.notification(error.response.data.message, { status: 'danger' })
			})
		}
	}
}
</script>