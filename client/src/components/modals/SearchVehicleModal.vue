<template>
	<div id="searchVehicleToggler" uk-toggle="target: #searchVehicleBlock; animation: uk-animation-slide-top-small;"></div>
	<div id="searchVehicleBlock">
		<div>
			<div uk-spinner class="uk-center" v-if="loading"></div>
			<ul class="uk-margin-small-bottom" uk-accordion>
				<li v-for="vehicle in vehicles" :key="vehicle.id">
					<a class="uk-accordion-title">{{ vehicle.STSNumber }}</a>
					<div class="uk-accordion-content">
						<p class="param-label">Гос. номер</p>
						<p class="param-value">{{ vehicle.licensePlateNumber }}</p>
						<p class="param-label">Марка</p>
						<p class="param-value">{{ vehicle.brand }}</p>
						<p class="param-label">Модель</p>
						<p class="param-value">{{ vehicle.model }}</p>
						<p class="param-label">VIN</p>
						<p class="param-value">{{ vehicle.VIN }}</p>
						<p class="param-label">Год выпуска</p>
						<p class="param-value">{{ vehicle.releaseYear }}</p>
						<p class="param-label">Цвет</p>
						<p class="param-value">{{ vehicle.color }}</p>
						<p class="param-label">Двигатель</p>
						<p class="param-value">{{ vehicle.engine }}</p>
						<p class="param-label">Объем двигателя</p>
						<p class="param-value">{{ vehicle.engineVolume }}</p>
						<p class="param-label">Мощность двигателя</p>
						<p class="param-value">{{ vehicle.enginePower }}</p>
						<p class="param-label">ФИО собственника</p>
						<p class="param-value">{{ vehicle.ownerFIO }}</p>
						<p class="param-label">Республика, край, область</p>
						<p class="param-value">{{ vehicle.ownerRepublic }}</p>
						<p class="param-label">Район</p>
						<p class="param-value">{{ vehicle.ownerDistrict }}</p>
						<p class="param-label">Населенный пункт</p>
						<p class="param-value">{{ vehicle.ownerCity }}</p>
						<p class="param-label">Улица</p>
						<p class="param-value">{{ vehicle.ownerStreet }}</p>
						<p class="param-label">Дом</p>
						<p class="param-value">{{ vehicle.ownerHouse }}</p>
						<p class="param-label">Квартира</p>
						<p class="param-value">{{ vehicle.ownerAppartment }}</p>
						<p class="param-label">Орган, выдавший документ</p>
						<p class="param-value">{{ vehicle.STSReleaseDepartment }}</p>
						<p class="param-label">Когда выдан</p>
						<p class="param-value">{{ moment(vehicle.STSReleaseDate).format('L') }}</p>
						<a class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" v-on:click="() => {select(vehicle)}">Использовать</a>
					</div>
				</li>
			</ul>
			<a class="uk-button uk-button-secondary uk-button-small uk-width-1-1" style="border-radius: 5px;" v-on:click="toggler.toggle()">Скрыть</a>
		</div>
	</div>
</template>

<script>

import VehicleService from '../../services/vehicle.service'

export default {
	name: "searchVehicleModal",
	data(){
		return { 
			pattern: '', 
			toggler: null, 
			vehicles: [],
			loading: false,
		}
	},
	props: [ 'searchPattern' ],
	mounted() {
		this.toggler = window.UIkit.toggle("#searchVehicleToggler")
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
				STSNumber: pattern,
			}
			this.loading = true
			this.vehicles = []
			VehicleService.getAllVehicles(1, 5, null, filter).then(resp => {
				this.vehicles = resp.data.vehicles
				this.loading = false
				if(this.vehicles.length == 0){
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
		select(vehicle){
			this.toggler.toggle()
			delete vehicle.createdAt
			delete vehicle.updatedAt
			delete vehicle.id
			this.$emit('autofill', vehicle)
			this.vehicles = []
		}
	}
}
</script>

<style scoped>
	#searchVehicleBlock {

    border: 1px solid #128b60;
    border-radius: 5px;
    margin-top: 5px;
    background: #f0fff8;
    padding: 10px;

}
</style>