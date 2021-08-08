<template>
	<div class="uk-container">
		<Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ values, setFieldValue }">
			<ul class="uk-margin-remove" uk-accordion="multiple: true;">
				<li class="accordion-container">
					<a class="uk-accordion-title accordion-toggler">Добавить автомобиль</a>
					<div class="uk-accordion-content accordion-content">
						<div class="uk-grid-collapse" uk-grid>
							<div class="uk-width-expand">
								<Field name="vehicle.STSNumber" class='uk-input create-order-input search-input main-input' placeholder="Номер СТС"/>
								<ErrorMessage name="vehicle.STSNumber" class="error-feedback"/>
							</div>
							<div class="uk-width-auto">
								<a class="uk-button uk-button-primary main-btn search-btn" v-on:click="() => {searchVehicle(values)}"><span class="search-icon" uk-icon="icon: search; ratio: 0.5;" ></span>поиск</a>
							</div>
						</div>
						<searchVehicleModal :searchPattern="patternSearchVehicleModal" v-on:autofill="(data) => { fillVehicleData(setFieldValue, data) }"/>
						<Field name="vehicle.licensePlateNumber" class="uk-input main-input uk-margin-small-top" placeholder="Гос. номер"/>
						<ErrorMessage name="vehicle.licensePlateNumber" class='error-feedback'/>
						<div class="uk-grid-small uk-margin-small-top uk-child-width-1-2" uk-grid>
							<div>
								<Field name="vehicle.brand" class="uk-input main-input" placeholder="Марка"/>
								<ErrorMessage name="vehicle.brand" class="error-feedback"/>
							</div>
							<div>
								<Field name="vehicle.model" class="uk-input main-input" placeholder="Модель" />
								<ErrorMessage name="vehicle.model" class="error-feedback"/>
							</div>
						</div>
						<Field name="vehicle.VIN" class="uk-input main-input uk-margin-small-top" placeholder="VIN"/>
						<ErrorMessage name="vehicle.VIN" class="error-feedback" />
						<div class="uk-grid-small uk-margin-small-top uk-child-width-1-3" uk-grid>
							<div>
								<Field name="vehicle.releaseYear" class="uk-input main-input" type="tel" placeholder="Год выпуска" />
								<ErrorMessage name="vehicle.releaseYear" class="error-feedback" />
							</div>
							<div>
								<Field name="vehicle.color" class="uk-input main-input" placeholder="Цвет" />
								<ErrorMessage name="vehicle.color" class="error-feedback" />
							</div>
							<div>
								<Field name="vehicle.engine" class="uk-input main-input" placeholder="Двигатель" />
								<ErrorMessage name="vehicle.engine" class="error-feedback" />
							</div>
						</div>
						<div class="uk-grid-small uk-margin-small-top uk-child-width-1-3" uk-grid>
							<div>
								<Field name="vehicle.engineVolume" class="uk-input main-input" type="tel" placeholder="Объем (см3)" />
								<ErrorMessage name="vehicle.engineVolume" class="error-feedback" />
							</div>
							<div>
								<Field name="vehicle.enginePower" class="uk-input main-input" placeholder="Мощь (кВт/л.с.)" />
								<ErrorMessage name="vehicle.enginePower" class="error-feedback" />
							</div>
							<div>
								<Field name="mileageInit" type="tel" class="uk-input main-input" placeholder="Пробег" />
								<ErrorMessage name="mileageInit" class="error-feedback" />
							</div>
						</div>
						<h4 class="header uk-margin-small-top">Собственник</h4>
						<Field name="vehicle.ownerFIO" class="uk-input main-input" placeholder="ФИО собственника" />
						<ErrorMessage name="vehicle.ownerFIO" class="error-feedback" />
						<div class="uk-grid-small uk-child-width-1-2 uk-margin-small-top" uk-grid>
							<div>
								<Field name="vehicle.ownerRepublic" class="uk-input main-input" placeholder="Республика, край, область" />
								<ErrorMessage name="vehicle.ownerRepublic" class="error-feedback" />
							</div>
							<div>
								<Field name="vehicle.ownerDistrict" class="uk-input main-input" placeholder="Район" />
								<ErrorMessage name="vehicle.ownerDistrict" class="error-feedback" />
							</div>
						</div>
						<div class="uk-grid-small uk-margin-small-top uk-child-width-1-2" uk-grid>
							<div>
								<Field name="vehicle.ownerCity" class="uk-input main-input" placeholder="Нас. пункт" />
								<ErrorMessage name="vehicle.ownerCity" class="error-feedback" />
							</div>
							<div>
								<Field name="vehicle.ownerStreet" class="uk-input main-input" placeholder="Улица" />
								<ErrorMessage name="vehicle.ownerStreet" class="error-feedback" />
							</div>
						</div>
						<div class="uk-grid-small uk-margin-small-top uk-child-width-1-2" uk-grid>
							<div>
								<Field name="vehicle.ownerHouse" class="uk-input main-input" placeholder="Дом" />
								<ErrorMessage name="vehicle.ownerHouse" class="error-feedback" />
							</div>
							<div>
								<Field name="vehicle.ownerAppartment" class="uk-input main-input" placeholder="Квартира" />
								<ErrorMessage name="vehicle.ownerAppartment" class="error-feedback" />
							</div>
						</div>
						<h4 class="header uk-margin-small-top">СТС выдано</h4>
						<Field name="vehicle.STSReleaseDepartment" class="uk-input main-input" placeholder="Орган, выдавший документ" />
						<ErrorMessage name="vehicle.STSReleaseDepartment" class="error-feedback" />
						<div class="uk-grid-small uk-margin-small-top" uk-grid>
							<div class="uk-width-auto">
								<p style="line-height: 30px;margin:0px;">Дата выдачи</p>
							</div>
							<div class="uk-width-expand">
								<div class="uk-inline uk-width-1-1">
									<span class="uk-form-icon" uk-icon="icon: calendar;"></span>
									<Field name="vehicle.STSReleaseDate" class="uk-input main-input" type="date" placeholder="Дата выдачи" />
								</div>
							<ErrorMessage name="vehicle.STSReleaseDate" class="error-feedback" />
							</div>
						</div>
					</div>
				</li>


				<li class="accordion-container">
					<a class="uk-accordion-title accordion-toggler">Добавить клиента</a>
					<div class="uk-accordion-content accordion-content">
						<div class="uk-grid-collapse" uk-grid>
							<div class="uk-width-expand">
								<div class="uk-inline uk-width-1-1">
									<span class="uk-form-icon" uk-icon="icon: receiver;"></span>
									<Field name="client.phoneNumber" type="tel" class='uk-input create-order-input search-input main-input' placeholder="Номер телефона"/>
								</div>
								<ErrorMessage name="client.phoneNumber" class="error-feedback"/>
							</div>
							<div class="uk-width-auto">
								<a class="uk-button uk-button-primary main-btn search-btn" v-on:click="() => {searchClient(values)}"><span class="search-icon" uk-icon="icon: search; ratio: 0.5;" ></span>поиск</a>
							</div>
						</div>
						<searchClientModal :searchPattern="patternSearchClientModal" v-on:autofill="(data) => { fillClientData(setFieldValue, data) }"/>
						<div class="uk-grid-small uk-margin-small-top uk-child-width-1-2" uk-grid>
							<div>
								<Field name="client.lastName" class="uk-input main-input" placeholder="Фамилия" />
								<ErrorMessage name="client.lastName" class="error-feedback"/>
							</div>
							<div>
								<Field name="client.firstName" class="uk-input main-input" placeholder="Имя"/>
								<ErrorMessage name="client.firstName" class="error-feedback"/>
							</div>
						</div>
						<div class="uk-grid-small uk-margin-small-top uk-child-width-1-2" uk-grid>
							<div>
								<Field name="client.middleName" class="uk-input main-input" placeholder="Отчество"/>
								<ErrorMessage name="client.middleName" class="error-feedback"/>
							</div>
							<div>
								<Field name="client.email" class="uk-input main-input" placeholder="E-mail" />
								<ErrorMessage name="client.email" class="error-feedback"/>
							</div>
						</div>
						<div class="uk-grid-small uk-margin-small-top" uk-grid>
							<div class="uk-width-auto">
								<p style="line-height: 30px;margin:0px;">Дата рождения</p>
							</div>
							<div class="uk-width-expand">
								<div class="uk-inline uk-width-1-1">
									<span class="uk-form-icon" uk-icon="icon: calendar;"></span>
									<Field name="client.bdate" class="uk-input main-input" type="date" placeholder="Дата рождения" />
								</div>
							<ErrorMessage name="client.bdate" class="error-feedback" />
							</div>
						</div>
						<div class="uk-margin-small-top uk-width-1-1">
							<Field name='client.sex' as="select" class="uk-select">
								<option value=0 selected>Пол не выбран</option>
								<option value=1>Мужской пол</option>
								<option value=2>Женский пол</option>
							</Field>
							<ErrorMessage name="client.sex" class="error-feedback"/>
						</div>
					</div>
				</li>
				<li class="accordion-container">
					<a class="uk-accordion-title accordion-toggler">Добавить плательщика</a>
					<div class="uk-accordion-content accordion-content">
						<a class="uk-button uk-button-primary main-btn uk-width-1-1" v-on:click="() => useClientPersonals(values, setFieldValue)">
							<span uk-icon="icon: user; ratio: .6;" style="position: relative;bottom: 1px;"></span>
						&nbsp;Использовать данные клиента</a>
						<div class="uk-grid-collapse uk-margin-small-top" uk-grid>
							<div class="uk-width-expand">
								<div class="uk-inline uk-width-1-1">
									<span class="uk-form-icon" uk-icon="icon: receiver;"></span>
									<Field name="payer.phoneNumber" type="tel" class='uk-input create-order-input search-input main-input' placeholder="Номер телефона"/>
								</div>
								<ErrorMessage name="payer.phoneNumber" class="error-feedback"/>
							</div>
							<div class="uk-width-auto">
								<a class="uk-button uk-button-primary main-btn search-btn" v-on:click="() => {searchPayer(values)}"><span class="search-icon" uk-icon="icon: search; ratio: 0.5;" ></span>поиск</a>
							</div>
						</div>
						<searchPayerModal :searchPattern="patternSearchPayerModal" v-on:autofill="(data) => { fillPayerData(setFieldValue, data) }"/>
						<Field name="payer.title" class="uk-input main-input uk-margin-small-top" placeholder="Плательщик"/>
						<ErrorMessage name="payer.title" class='error-feedback'/>
						<div class="uk-grid-small uk-margin-small-top uk-child-width-1-2" uk-grid>
							<div>
								<Field name="payer.INN" type="tel" class="uk-input main-input" placeholder="ИНН"/>
								<ErrorMessage name="payer.INN" class="error-feedback"/>
							</div>
							<div>
								<Field name="payer.address" class="uk-input main-input" placeholder="Адрес" />
								<ErrorMessage name="payer.address" class="error-feedback"/>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<p class="input-header">Причина обращения</p>
			<Field name="reason" class="uk-textarea main-input" placeholder="причина обращения" as="textarea" rows=5></Field>
			<ErrorMessage name="reason" class="error-feedback"/>

			<p class="input-header">Заметки</p>
			<Field name="notes" class="uk-textarea main-input" placeholder="заметки" as="textarea" rows=5></Field>
			<ErrorMessage name="notes" class="error-feedback"/>
			<button class="uk-button uk-button-primary uk-width-1-1 uk-margin-top main-btn">Создать</button>
			<div class="uk-margin-bottom"></div>
		</Form>
	</div>
</template>

<script>

import OrderService from '../services/order.service'
import { Form, Field, ErrorMessage } from "vee-validate"
import searchVehicleModal from './modals/SearchVehicleModal.vue'
import searchClientModal from './modals/SearchClientModal.vue'
import searchPayerModal from './modals/SearchPayerModal.vue'
import * as yup from "yup"

export default {
	name: 'createOrder',
	components: { Form, Field, ErrorMessage, searchVehicleModal, searchClientModal, searchPayerModal },
	data() {
		let schema = yup.object().shape({
			vehicle: yup.object().shape({
				STSNumber: yup.string().required("Поле обязательно для заполнения"),
				licensePlateNumber: yup.string().required("Поле обязательно для заполнения"),
				VIN: yup.string(),
				brand: yup.string(),
				model: yup.string(),
				releaseYear: yup.number(),
				color: yup.string(),
				engine: yup.string(),
				engineVolume: yup.number(),
				enginePower: yup.string(),
				ownerFIO: yup.string().required("Поле обязательно для заполнения"),
				ownerRepublic: yup.string(),
				ownerDistrict: yup.string(),
				ownerCity: yup.string(),
				ownerStreet: yup.string(),
				ownerHouse: yup.string(),
				ownerAppartment: yup.string(),
				STSReleaseDepartment: yup.string(),
				STSReleaseDate: yup.date().required("Введите дату").typeError("Некорректная дата"),
			}),
			mileageInit: yup.number().required("Поле обязательно для заполнения"),
			client: yup.object().shape({
				phoneNumber: yup.string().required("Поле обязательно для заполнения"),
				firstName: yup.string().required("Поле обязательно для заполнения"),
				lastName: yup.string().required("Поле обязательно для заполнения"),
				middleName: yup.string(),
				bdate: yup.date().typeError("Некорректная дата"),
				sex: yup.number().required("Поле обязательно для заполнения"),
				email: yup.string().email("Неверно введен адрес"),
			}),
			payer: yup.object().shape({
				phoneNumber: yup.string().required("Поле обязательно для заполнения"),
				title: yup.string(),
				INN: yup.string(),
				address: yup.string(),
			}),
			reason: yup.string(),
			notes: yup.string(),
			status: yup.number().default(),
		})
		return { schema, patternSearchVehicleModal: '', patternSearchClientModal: '', patternSearchPayerModal: '' }
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
		}
	},
	methods: {
		handleSubmit(order){
			order.mileageDone = order.mileageInit
			OrderService.create(order).then((resp) => {
				window.UIkit.notification("Заказ-наряд успешно создан", {status: "success"})
				this.$router.push({ name: 'editorder', params: {id: resp.data.id}})
			}, error => {
				let message = ''
				if(error.response.status == 500){
					message = "Ошибка сервера"
				} else {
					message = error.response.data.message
				}
				window.UIkit.notification(message, {status: "danger"})
			})
		},
		searchVehicle(values){
			if(!values.vehicle.STSNumber){
				window.UIkit.notification("Введите часть номера", {status: "warning"})
			} else {
				this.patternSearchVehicleModal = ''
				setTimeout(() => { // костыль, чтобы движок успел отследить смену значения
					this.patternSearchVehicleModal = values.vehicle.STSNumber
				}, 30)
			}
		},
		fillVehicleData(setFieldValue, data){
			for(let index in data){
				setFieldValue(`vehicle.${index}`, data[index])
			}
			setFieldValue("vehicle.STSReleaseDate", data.STSReleaseDate.split('T')[0])
		},
		searchClient(values){
			if(!values.client.phoneNumber){
				window.UIkit.notification("Введите часть номера", {status: "warning"})
			} else {
				this.patternSearchClientModal = ''
				setTimeout(() => {
					this.patternSearchClientModal = values.client.phoneNumber
				}, 30)
			}
		},
		fillClientData(setFieldValue, data){
			for(let index in data){
				setFieldValue(`client.${index}`, data[index])
			}
			setFieldValue("client.bdate", data.bdate.split('T')[0])
		},
		searchPayer(values) {
			if(!values.payer.phoneNumber){
				window.UIkit.notification("Введите часть номера", {status: "warning"})
			} else {
				this.patternSearchPayerModal = ''
				setTimeout(() => {
					this.patternSearchPayerModal = values.payer.phoneNumber
				}, 30)
			}
		},
		fillPayerData(setFieldValue, data){
			for(let index in data){
				setFieldValue(`payer.${index}`, data[index])
			}
		},
		useClientPersonals(values, setFieldValue) {
			setFieldValue("payer.phoneNumber", values.client.phoneNumber)
			setFieldValue("payer.title", `${values.client.lastName || ''} ${values.client.firstName || ''} ${values.client.middleName || ''}`)
			setFieldValue("payer.address", `${values.vehicle.ownerCity || ''}, ул ${values.vehicle.ownerStreet || ''}, дом ${values.vehicle.ownerHouse || ''}, кв ${values.vehicle.ownerAppartment || ''}`)
		},
	}
}

</script>

<style scoped>
.accordion-container{
	margin-top: 10px;
	background: #d3e2db;
	border: 1px solid #01c587;
	border-radius: 10px;
	overflow: hidden;
}
.accordion-toggler {
	font-size: 1.1em;
	font-weight: 600;
	padding: 15px 20px;
	background: #f0fff8;
	color: #138a60;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.accordion-content {
	margin: 0px;
	padding: 10px;
}
.accordion-content .main-btn {
	line-height: 28px;
}
.accordion-content input{
	height: 30px;
	padding: 0px 5px;
}
.search-input {
 border-radius: 5px 0px 0px 5px !important;
}
.search-btn {
	padding: 0px 15px;
	line-height: 28px;
	border-radius:  0px 5px 5px 0px;
}
.search-btn > span {
	position: relative;
	bottom: 1px;
}

.search-icon {
	margin-right: 5px;
}
.header {
	margin: 0px;
	color:  #537564;
	margin-left: 3px;
	font-weight: 600;
}

/* rewrite */
.uk-grid-small {
	margin-left: -10px !important;
}
.uk-grid-small > * {
	padding-left: 10px;
}
.uk-radio {
	height: 13px !important;
	width: 13px !important;
	position: relative;
	top:  1px;
}
.uk-radio:checked {
	background-color: #128b60 !important;
}
.uk-select {
	background-color: #f0fff8 !important;
   border: 1px solid #979797 !important;
	border-radius: 5px;
	height: 30px !important;
}
/* endrewrite */
</style>