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
							<div class="filter-label-container"><p class="filter-label">Номер СТС</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.STSNumber">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Гос. номер</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.licensePlateNumber">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">VIN</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.VIN">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Марка</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.brand">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Модель</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.model">
							</div>
						</div>
						<div class="uk-grid-small margin-small-top" uk-grid>
							<div class="filter-label-container"><p class="filter-label">Год выпуска</p></div>
							<div class="uk-width-expand">
								<input type="text" class="uk-input main-input" v-model="rawFilter.releaseYear">
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
		<div v-for="vehicle, index in vehicles" :key="index">
			<router-link :to="{ name: 'editvehicle', params: {id: vehicle.id}}" style="text-decoration: none !important;">
				<div class="preset-container uk-grid-collapse uk-margin-small-bottom" uk-grid>
					<div class="uk-width-expand">
						<p class="common-data"><span>{{ vehicle.brand }} {{ vehicle.model }}</span> {{ vehicle.releaseYear }} г.в.</p>	
					</div>
					<div>
						<p class="key-number">{{ vehicle.licensePlateNumber }}</p>
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

import VehicleService from '../../services/vehicle.service'
	
export default {
	name: 'Vehicles',
	data() {
		return {
			vehicles: [],
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
		showMore() {
			this.loading = true;
			VehicleService.getAllVehicles(this.page, this.perPage, { createdAt: -1 }, this.filter).then(resp => {
				this.vehicles = this.vehicles.concat(resp.data.vehicles)

				if(resp.data.vehicles.length == 0){
					if(this.page == 1){
						window.UIkit.notification("Автомобили отсутствуют")
					} else {
						window.UIkit.notification("Все автомобили уже выведены")
					}
				}

				if(resp.data.totalItems == this.vehicles.length){
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
				STSNumber: '',
				licensePlateNumber: '',
				VIN: '',
				brand: '',
				model: '',
				releaseYear: '',
			}
			this.filterFieldsCounter = 0;
			this.filter = {}
			this.page = 1
			this.vehicles = []
			this.showMore()
		},
		processFilter(){
			this.filter = {}
			this.filterFieldsCounter = 0;

			if(this.rawFilter.STSNumber !== ''){
				this.filter.STSNumber = this.rawFilter.STSNumber
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.licensePlateNumber !== ''){
				this.filter.licensePlateNumber = this.rawFilter.licensePlateNumber
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.VIN !== ''){
				this.filter.VIN = this.rawFilter.VIN
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.brand !== ''){
				this.filter.brand = this.rawFilter.brand
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.model !== ''){
				this.filter.model = this.rawFilter.model
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.releaseYear !== ''){
				this.filter.releaseYear = this.rawFilter.releaseYear
				this.filterFieldsCounter += 1
			}
			window.UIkit.toggle('#editFilterBtn').toggle()
			window.filter = this.filter
			this.page = 1
			this.vehicles = []
			this.showMore()
		}
	}
}

</script>

<style scoped>
	/* rewrite */
.uk-modal-body, .uk-modal-header, .uk-modal-footer {
	padding: 10px 15px !important;
}
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