<template>
	<div class="uk-container">
		<div class="custom-card">
			<p class="custom-card-header">Автомобиль</p>
			<div class="custom-card-body">
				<div v-if="loading" class="uk-flex uk-flex-center uk-margin-small-top">
					<div uk-spinner></div>
				</div>
				<div v-else>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Номер СТС</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.STSNumber"><p>{{ vehicle.STSNumber }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.STSNumber" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.STSNumber = true" v-if="!editMap.STSNumber"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.STSNumber = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Гос. номер</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.licensePlateNumber"><p>{{ vehicle.licensePlateNumber }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.licensePlateNumber" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.licensePlateNumber = true" v-if="!editMap.licensePlateNumber"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.licensePlateNumber = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Марка</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.brand"><p>{{ vehicle.brand }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.brand" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.brand = true" v-if="!editMap.brand"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.brand = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Модель</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.model"><p>{{ vehicle.model }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.model" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.model = true" v-if="!editMap.model"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.model = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>VIN</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.VIN"><p>{{ vehicle.VIN }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.VIN" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.VIN = true" v-if="!editMap.VIN"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.VIN = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Год выпуска</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.releaseYear"><p>{{ vehicle.releaseYear }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.releaseYear" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.releaseYear = true" v-if="!editMap.releaseYear"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.releaseYear = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Цвет</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.color"><p>{{ vehicle.color }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.color" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.color = true" v-if="!editMap.color"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.color = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Двигатель</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.engine"><p>{{ vehicle.engine }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.engine" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.engine = true" v-if="!editMap.engine"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.engine = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Объем дв. (см3)</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.engineVolume"><p>{{ vehicle.engineVolume }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.engineVolume" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.engineVolume = true" v-if="!editMap.engineVolume"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.engineVolume = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Мощь (кВт/л.с.)</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.enginePower"><p>{{ vehicle.enginePower }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.enginePower" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.enginePower = true" v-if="!editMap.enginePower"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.enginePower = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<h4 class="header uk-margin-small-top">Данные владельца</h4>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>ФИО</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.ownerFIO"><p>{{ vehicle.ownerFIO }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.ownerFIO" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.ownerFIO = true" v-if="!editMap.ownerFIO"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.ownerFIO = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Респ, край, обл.</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.ownerRepublic"><p>{{ vehicle.ownerRepublic }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.ownerRepublic" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.ownerRepublic = true" v-if="!editMap.ownerRepublic"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.ownerRepublic = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Район</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.ownerDistrict"><p>{{ vehicle.ownerDistrict }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.ownerDistrict" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.ownerDistrict = true" v-if="!editMap.ownerDistrict"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.ownerDistrict = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Нас. пункт</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.ownerCity"><p>{{ vehicle.ownerCity }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.ownerCity" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.ownerCity = true" v-if="!editMap.ownerCity"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.ownerCity = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Улица</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.ownerStreet"><p>{{ vehicle.ownerStreet }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.ownerStreet" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.ownerStreet = true" v-if="!editMap.ownerStreet"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.ownerStreet = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Дом</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.ownerHouse"><p>{{ vehicle.ownerHouse }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.ownerHouse" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.ownerHouse = true" v-if="!editMap.ownerHouse"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.ownerHouse = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Квартира</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.ownerAppartment"><p>{{ vehicle.ownerAppartment }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.ownerAppartment" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.ownerAppartment = true" v-if="!editMap.ownerAppartment"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.ownerAppartment = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<h4 class="header uk-margin-small-top">СТС Выдано</h4>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Орган</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.STSReleaseDepartment"><p>{{ vehicle.STSReleaseDepartment }}</p></div>
							<input class="uk-input main-input" v-model="vehicle.STSReleaseDepartment" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.STSReleaseDepartment = true" v-if="!editMap.STSReleaseDepartment"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.STSReleaseDepartment = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Дата</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-if="!editMap.STSReleaseDate"><p>{{ moment(vehicle.STSReleaseDate).format('L') }}</p></div>
							<input class="uk-input main-input" type="date" v-model="vehicle.STSReleaseDate" v-else>
						</div>
						<div>
							<a class="edit-btn" v-on:click="editMap.STSReleaseDate = true" v-if="!editMap.STSReleaseDate"><span uk-icon="icon: pencil"></span></a>
							<a class="edit-btn" style="padding: 5px 0px" v-on:click="editMap.STSReleaseDate = false; update();" v-else><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button class="uk-button uk-button-primary main-btn uk-button-small uk-margin-small-top uk-margin-bottom uk-width-1-1" style="background: #fe4f70 !important;" v-on:click="remove"><span uk-icon="icon: trash; ratio: 0.8;"></span>&nbsp;&nbsp;Удалить</button>
	</div>
</template>

<script>

import VehicleService from '../../services/vehicle.service'
	
export default {
	name: 'editvehicle',
	data() {
		return { vehicle: null, vehicleId: null, loading: true, editMap: {}}
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
			return;
		}
		this.vehicleId = this.$route.params.id
		VehicleService.getById(this.vehicleId).then(resp => {
			this.vehicle = resp.data
			this.vehicle.STSReleaseDate = this.vehicle.STSReleaseDate.split('T')[0]
			this.loading = false
		}, err => {
			window.UIkit.notification(err.response.data.message, {status: "danger"})
			this.loading = false
		})
	},
	methods: {
		moment: window.moment,
		update(){
			VehicleService.update(this.vehicleId, this.vehicle).then(() => {
				window.UIkit.notification("Изменения успешно сохранены", {status: "success"})
			}, err => {
				window.UIkit.notification(err.response.data.message, {status: "danger"})
			})
		},
		remove(){
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить пресет?").then(() => {
				VehicleService.remove(this.vehicleId).then(() => {
					window.UIkit.notification("Пресет успешно удален", {status: "success"})
					this.$router.push('/vehicles')
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
/* endrewrite */
</style>