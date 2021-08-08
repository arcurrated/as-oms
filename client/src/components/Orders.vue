<template>
	<div class="">
		<div class="uk-container">
			<div class='uk-alert-warning' v-if="errorMessage" uk-alert>
				<p>{{ errorMessage }}</p>
			</div>
		</div>
		<div style="">
			<div class="uk-container">
				<p class="uk-text-large uk-margin-remove header"><span uk-icon="icon:history; ratio: 0.7;" style=""></span>&nbsp;Последние открытые заказ-наряды</p>
			</div>
			<div class="uk-container uk-padding-remove">
				<div class="last-opened-container">
					<div style="display: flex;">
						<div class="last-opened-order-container" v-for="order in lastOpenedOrders" :key="order.id">
							<router-link :to="{ name: 'editorder', params: {id: order.id}}" style="text-decoration: none !important;">
								<div class="last-opened-order-header">
									<p>З/Н №{{ order.number }}</p>
								</div>
								<div class="last-opened-order-body">
									<p class="brand">{{ order.vehicle.brand }}</p>
									<p class="model">{{ order.vehicle.model }}</p>
									<p class="license-plate-number">{{ order.vehicle.licensePlateNumber }}</p>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="uk-container">
			<p class="uk-text-large uk-margin-remove header"><span uk-icon="icon: database; ratio: 0.7;"></span>&nbsp;<span v-if="filterFieldsCounter==0">Все</span><span v-else>Найденные</span> заказ-наряды ({{ totalOrdersCount }})</p>
			<div class="uk-margin-small-bottom uk-grid-collapse" uk-grid>
				<div class="uk-width-1-2">
					<button class="filter-btn uk-width-1-1" id="editFilterBtn" uk-toggle="target: #editFilterBlock; animation: uk-animation-slide-top-small;">Фильтр 
						<span class="filter-btn-icon" uk-icon="icon: settings; ratio:0.8;"></span>
						<span class="filter-btn-label" v-if="filterFieldsCounter > 0">{{ filterFieldsCounter }}</span>
					</button>
				</div>
				<div class="uk-width-1-2">
					<a class="sort-label" v-if="!editingSort" v-on:click="editingSort = true">{{ sort.title }}</a>
					<div style="margin-left: 5px;" v-else>
						<select v-model="sort" class="uk-select" style="height: 36px !important;">
							<option v-for="sort, index in sortMap" :key="index" v-bind:value="sort">{{ sort.title }}</option>
						</select>
					</div>
				</div>



				<div id="editFilterBlock">
					<div>
						<div>
							<div class="uk-grid-small" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Номер</p></div>
								<div class="uk-width-expand">
									<input type="number" class="uk-input main-input" v-model="rawFilter.number">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Статус</p></div>
								<div class="uk-width-expand">
									<select class='uk-select uk-width-1-1' v-model="rawFilter.status">
										<option value="">Любой</option>
										<option value="0">В плане</option>
										<option value="1">Открыт</option>
										<option value="2">В работе</option>
										<option value="3">Ожидает запчасти</option>
										<option value="4">Выполнен</option>
										<option value="5">Оплачен</option>
									</select>
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Дата от</p></div>
								<div class="uk-width-expand">
									<input type="date" class="uk-input main-input" v-model="rawFilter.dateFrom">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Дата до</p></div>
								<div class="uk-width-expand">
									<input type="date" class="uk-input main-input" v-model="rawFilter.dateTo">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Гос. номер</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.vehicle.licensePlateNumber">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">VIN</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.vehicle.VIN">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Марка</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.vehicle.brand">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Модель</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.vehicle.model">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Год выпуска</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.vehicle.releaseYear">
								</div>
							</div>
							<h4 class="filter-block-header">Данные клиента</h4>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Фамилия</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.client.lastName">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Имя</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.client.firstName">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Отчество</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.client.middleName">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Пол</p></div>
								<div class="uk-width-expand">
									<select class="uk-select" v-model="rawFilter.client.sex">
										<option value="">Не выбран</option>
										<option value='1'>Муж</option>
										<option value='2'>Жен</option>
									</select>
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Телефон</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.client.phoneNumber">
								</div>
							</div>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Email</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.client.email">
								</div>
							</div>


							<h4 class="filter-block-header">Данные плательщика</h4>
							<div class="uk-grid-small margin-small-top" uk-grid>
								<div class="filter-label-container"><p class="filter-label">Телефон</p></div>
								<div class="uk-width-expand">
									<input type="text" class="uk-input main-input" v-model="rawFilter.payer.phoneNumber">
								</div>
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
			<hr class="divider" />
			<div class='uk-width-1-1 uk-margin-bottom' v-for="order in orders" :key="order.id">
				<router-link :to="{ name: 'editorder', params: {id: order.id}}" style="text-decoration: none !important;">
					<div class="order-container">
						<div class="order-header uk-grid-collapse" uk-grid>
							<div class="uk-width-expand">
								<p class="order-common-data">З/н <span class="main-color">№{{ order.number }}</span> от {{ moment(order.createdAt).format('L') }}</p>
							</div>
							<div class="uk-width-auto">
								<p class="order-status" style="background: #64736f;" v-if="order.status==1">открыт</p>
								<p class="order-status" style="background: #ff6160;" v-else-if="order.status==2">в работе</p>
								<p class="order-status" style="background: #fea154;" v-else-if="order.status==3">ожидает з/ч</p>
								<p class="order-status" style="background: #fea154;" v-else-if="order.status==4">выполнен</p>
								<p class="order-status" style="background: #4aae6e;" v-else-if="order.status==5">оплачен</p>
								<p class="order-status" style="background: #64736f;" v-else>в плане</p>
							</div>
						</div>
						<div class="order-body">
							<p>{{ order.vehicle.brand }} {{ order.vehicle.model }} 
								<span class="release-year">({{ order.vehicle.releaseYear }} г.в.)</span>&nbsp;
								<span class="license-plate-number">{{ order.vehicle.licensePlateNumber }}</span>&nbsp;
								<span class="color">{{ order.vehicle.color }}</span>
							</p>
							<p>
								{{ order.client.lastName }} {{ order.client.firstName }} {{ order.client.middleName }}&nbsp;
								<span class="phone-number"><span uk-icon="icon: receiver; ratio: .6;"></span>{{ order.client.phoneNumber }}</span>
							</p>
							<div class="uk-grid-collapse uk-child-width-1-3 prices" uk-grid>
								<div>Работ на {{ order.totalOperationsPrice }}₽</div>
								<div>З/Ч на {{ order.totalPartsPrice }}₽</div>
								<div>Итого <span class="total-price">{{ order.totalPrice }}₽</span></div>
							</div>
						</div>
					</div>
				</router-link>
			</div>
			<a class="uk-button uk-button-primary main-btn uk-width-1-1 uk-button-small uk-margin-small-bottom" v-on:click="showMore" :disabled="loading" v-if="displayMoreBtn"><div uk-spinner="ratio: 0.5" v-if="loading"></div> <div v-else>Показать ещё</div></a>
		</div>
	</div>
</template>

<script>

import OrderService from '../services/order.service'

export default {
	name: "orders",
	data() {
		const sortMap = [
			{
				title: 'Сортировка по дате создания ▼',
				preset: { createdAt: -1 }
			},
			{
				title: 'Сортировка по дате создания ▲',
				preset: { createdAt: 1 }
			},
			{
				title: 'Сортировка по чеку ▼',
				preset: { totalPrice: -1 }
			},
			{
				title: 'Сортировка по чеку ▲',
				preset: { totalPrice: 1 }
			},
		]
		const rawFilter = {vehicle: {}, client: {}, payer: {}}
		return { 
			orders: [], 
			totalOrdersCount: 0,
			lastOpenedOrders: [],
			filterFieldsCounter: 0,
			sort: sortMap[0],
			sortMap,
			editingSort: false,
			filter: {},
			rawFilter, 
			errorMessage: '', 
			page: 1,
			perPage: process.env.VUE_APP_DEFAULT_PER_PAGE || 5,
			loading: false, 
			displayMoreBtn: true,
		}
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
		}
		document.getElementById('editFilterBlock').addEventListener('show', () => {
			document.getElementById('editFilterBtn').style.borderRadius = "5px 5px 0px 0px"
		})
		document.getElementById('editFilterBlock').addEventListener('hide', () => {
			document.getElementById('editFilterBtn').style.borderRadius = "5px"
		})
		this.resetFilter()
		OrderService.getLastOpenedOrders(1, 5).then(resp => {
			this.lastOpenedOrders = resp.data.orders
		}, error => {
			if(error.response.status == 403){
				this.errorMessage = "У вас нет прав доступа для просмотра содержимого"
			} else if(error.response.status == 500){
				this.errorMessage = "Ошибка на сервере"
			}
		})
	},
	watch: {
		sort() {
			this.page = 1
			this.orders = []
			this.showMore()
			this.editingSort = false
		}
	},
	methods: {
		moment: window.moment,
		showMore(){
			this.loading = true;
			OrderService.getAllOrders(this.page, this.perPage, this.sort.preset, this.filter).then(resp => {
				this.orders = this.orders.concat(resp.data.orders)
				this.totalOrdersCount = resp.data.totalItems

				if(resp.data.orders.length == 0){
					if(this.page == 1){
						window.UIkit.notification("Заказ-наряды отсутствуют")
					} else {
						window.UIkit.notification("Все заказ-наряды уже выведены")
					}
				}

				if(resp.data.totalItems == this.orders.length){
					this.displayMoreBtn = false
				} else {
					this.displayMoreBtn = true
				}
				this.loading = false
				this.page += 1

			}, error => {
				this.loading = false
				if(error.response.status == 403){
					this.errorMessage = "У вас нет прав доступа для просмотра содержимого"
				} else if(error.response.status == 500){
					window.UIkit.notification("Ошибка на сервере", {status: "danger"})
				}
			})
		},
		resetFilter(){
			window.UIkit.toggle('#editFilterBtn').toggle()
			this.rawFilter = {
				number: '',
				status: '',
				dateFrom: '',
				dateTo: '',
				vehicle: {
					licensePlateNumber: '',
					VIN: '',
					brand: '',
					model: '',
					releaseYear: '',
				},
				client: {
					lastName: '',
					firstName: '',
					middleName: '',
					sex: '',
					phoneNumber: '',
					email: '',
				},
				payer: {
					phoneNumber: '',
				}
			}
			this.filterFieldsCounter = 0;
			this.filter = {}
			this.page = 1
			this.orders = []
			this.showMore()
		},
		processFilter(){
			this.filter = {
				vehicle: {},
				client: {},
				payer: {},
			}
			this.filterFieldsCounter = 0;

			if(this.rawFilter.number !== ''){
				this.filter.number = this.rawFilter.number
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.status !== ''){
				this.filter.status = this.rawFilter.status
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.dateFrom !== ''){
				this.filter.dateFrom = this.rawFilter.dateFrom
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.dateTo !== ''){
				this.filter.dateTo = this.rawFilter.dateTo
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.vehicle.licensePlateNumber !== ''){
				this.filter.vehicle.licensePlateNumber = this.rawFilter.vehicle.licensePlateNumber
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.vehicle.VIN !== ''){
				this.filter.vehicle.VIN = this.rawFilter.vehicle.VIN
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.vehicle.brand !== ''){
				this.filter.vehicle.brand = this.rawFilter.vehicle.brand
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.vehicle.model !== ''){
				this.filter.vehicle.model = this.rawFilter.vehicle.model
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.vehicle.releaseYear !== ''){
				this.filter.vehicle.releaseYear = this.rawFilter.vehicle.releaseYear
				this.filterFieldsCounter += 1
			}

			if(this.rawFilter.client.lastName !== ''){
				this.filter.client.lastName = this.rawFilter.client.lastName
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.client.firstName !== ''){
				this.filter.client.firstName = this.rawFilter.client.firstName
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.client.middleName !== ''){
				this.filter.client.middleName = this.rawFilter.client.middleName
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.client.sex !== ''){
				this.filter.client.sex = this.rawFilter.client.sex
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.client.phoneNumber !== ''){
				this.filter.client.phoneNumber = this.rawFilter.client.phoneNumber
				this.filterFieldsCounter += 1
			}
			if(this.rawFilter.client.email !== ''){
				this.filter.client.email = this.rawFilter.client.email
				this.filterFieldsCounter += 1
			}

			if(this.rawFilter.payer.phoneNumber !== ''){
				this.filter.payer.phoneNumber = this.rawFilter.payer.phoneNumber
				this.filterFieldsCounter += 1
			}
			window.UIkit.toggle('#editFilterBtn').toggle()
			window.filter = this.filter
			this.page = 1
			this.orders = []
			this.showMore()
		}
	}
}

</script>

<style scoped>
.header {
	color:  #dff0e6;
	font-size: 1.4em;
	padding-bottom: 5px;
}
.header > span {
	position: relative;
	bottom:  1px;
}

.last-opened-container {
	overflow-x: scroll;
	padding: 0px 15px 12px 15px;
	overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.last-opened-container::-webkit-scrollbar {
	width: 0;
	height: 0;
}

.last-opened-order-container {
    display: inline-block;
    border: 1px solid #00c486;
    margin-right: 10px;
    border-radius: 8px;
    background: #d5e2db;
    cursor: pointer;
}
.last-opened-order-header p {
	width: 110px;
    font-size: 1em;
    padding: 7px;
    color: #138c61;
    background: #f0fff8;
    border-radius: 8px 8px 0px 0px;
    margin:  0px;
}
.last-opened-order-body{
	margin-top: 7px;
}
.last-opened-order-body .brand, .last-opened-order-body .model {

    padding: 0px 7px;
    line-height: 14px;
    margin: 0px;
    color: #547465;
    font-size: 1.3em;

}
.last-opened-order-body .license-plate-number {

    margin: 7px;
    padding: 5px;
    text-align: center;
    background: #039566;
    border-radius: 3px;
    color: #fff;
    font-weight: 700;

}

.sort-label {

    text-align: right;
    margin: 0px;
    color: #6fdf97;
    display: block;
}

.order-container {
  background: #d5e2db;
  border-radius: 7px;
  color: #537565;
}

.order-header {
  background: #f0fff8;
  color: #48514c;
  border-radius: 7px 7px 0px 0px;
}

.order-common-data, .order-status {
  padding: 0px 10px;
  line-height: 30px;
}
.order-common-data{
  font-size:  1.2em;
}
.order-status {
  border-radius: 0px 7px 0px 0px;
  text-transform: uppercase;
  background: #ff6160;
  color: #fff;
  width: 85px;
  padding: 0px;
  text-align: center;
}

.order-body {
  padding: 4px 10px 0px 10px;
}

.order-body p {
  margin: 0px;
}

.order-body .phone-number, .order-body .license-plate-number {
	font-size: 1.1em;
	color: #466055;
}

.prices {
  color:  #434945;
  text-align: center;
  font-size: 0.9em;
  padding: 4px 0px 8px 0px;
  font-weight: 700;
}

.prices > div {
  border-left: 1px solid #b9c4be;
}
.prices > div:first-of-type {
  border: none;
  text-align: left;
}
.prices > div:last-of-type {
  text-align: right;
}

.prices .total-price {
  background: #38ab66;
  padding:  0px 3px;
  border-radius: 3px;
  color: #fff;
}

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