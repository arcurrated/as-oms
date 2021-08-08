<template>
	<div class="uk-container">
		<div v-if="order">
			<ul class="uk-margin-remove" uk-accordion="multiple: true;">
				<li class="accordion-container">
					<a class="uk-accordion-title accordion-toggler"><span uk-icon="icon: info; ratio: 0.9;"></span>&nbsp;&nbsp;Данные з/н №{{ order.number }} <span style="color:#807e7f;">от {{ moment(order.createdAt).format('L') }}</span></a>
					<div class="uk-accordion-content accordion-content">
						<h4 class="header">Данные об автомобиле (СТС)</h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Серия, номер СТС</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleSTSNumber" v-on:click="editMap.vehicleSTSNumber=true">
									<p>{{ order.vehicle.STSNumber }}</p>
								</div>
								<input type="text" class="uk-input main-input" v-model="order.vehicle.STSNumber" v-else>
							</div>
							<div v-if="editMap.vehicleSTSNumber">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleSTSNumber=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Гос. номер</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleLicensePlateNumber" v-on:click="editMap.vehicleLicensePlateNumber=true">
									<p>{{ order.vehicle.licensePlateNumber }}</p>
								</div>
								<input type="text" class="uk-input main-input" v-model="order.vehicle.licensePlateNumber" v-else>
							</div>
							<div v-if="editMap.vehicleLicensePlateNumber">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleLicensePlateNumber=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Марка</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleBrand" v-on:click="editMap.vehicleBrand=true">
									<p>{{ order.vehicle.brand }}</p>
								</div>
								<input type="text" class="uk-input main-input" v-model="order.vehicle.brand" v-else>
							</div>
							<div v-if="editMap.vehicleBrand">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleBrand=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Модель</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleModel" v-on:click="editMap.vehicleModel=true">
									<p>{{ order.vehicle.model }}</p>
								</div>
								<input type="text" class="uk-input main-input" v-model="order.vehicle.model" v-else>
							</div>
							<div v-if="editMap.vehicleModel">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleModel=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>VIN-номер</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleVIN" v-on:click="editMap.vehicleVIN=true">
									<p>{{ order.vehicle.VIN }}</p>
								</div>
								<input type="text" class="uk-input main-input" v-model="order.vehicle.VIN" v-else>
							</div>
							<div v-if="editMap.vehicleVIN">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleVIN=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Год выпуска</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleReleaseYear" v-on:click="editMap.vehicleReleaseYear=true">
									<p>{{ order.vehicle.releaseYear }}</p>
								</div>
								<input type="tel" class="uk-input main-input" v-model="order.vehicle.releaseYear" v-else>
							</div>
							<div v-if="editMap.vehicleReleaseYear">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleReleaseYear=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Цвет</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleColor" v-on:click="editMap.vehicleColor=true">
									<p>{{ order.vehicle.color }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.color" v-else>
							</div>
							<div v-if="editMap.vehicleColor">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleColor=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Двигатель</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleEngine" v-on:click="editMap.vehicleEngine=true">
									<p>{{ order.vehicle.engine }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.engine" v-else>
							</div>
							<div v-if="editMap.vehicleEngine">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleEngine=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Объем дв. (см3)</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleEngineVolume" v-on:click="editMap.vehicleEngineVolume=true">
									<p>{{ order.vehicle.engineVolume }}</p>
								</div>
								<input type="tel" class="uk-input main-input" v-model="order.vehicle.engineVolume" v-else>
							</div>
							<div v-if="editMap.vehicleEngineVolume">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleEngineVolume=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Мощь (кВт/л.с.)</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleEnginePower" v-on:click="editMap.vehicleEnginePower=true">
									<p>{{ order.vehicle.enginePower }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.enginePower" v-else>
							</div>
							<div v-if="editMap.vehicleEnginePower">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleEnginePower=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Старт. пробег</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.mileageInit" v-on:click="editMap.mileageInit=true">
									<p>{{ order.mileageInit }}</p>
								</div>
								<input type="tel" class="uk-input main-input" v-model="order.mileageInit" v-else>
							</div>
							<div v-if="editMap.mileageInit">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.mileageInit=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Оконч. пробег</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.mileageDone" v-on:click="editMap.mileageDone=true">
									<p>{{ order.mileageDone }}</p>
								</div>
								<input type="tel" class="uk-input main-input" v-model="order.mileageDone" v-else>
							</div>
							<div v-if="editMap.mileageDone">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.mileageDone=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>



						<h4 class="header uk-margin-small-top">Собственник</h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>ФИО</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleOwnerFIO" v-on:click="editMap.vehicleOwnerFIO=true">
									<p>{{ order.vehicle.ownerFIO }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.ownerFIO" v-else>
							</div>
							<div v-if="editMap.vehicleOwnerFIO">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleOwnerFIO=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>



						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Респ, край, обл.</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleOwnerRepublic" v-on:click="editMap.vehicleOwnerRepublic=true">
									<p>{{ order.vehicle.ownerRepublic }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.ownerRepublic" v-else>
							</div>
							<div v-if="editMap.vehicleOwnerRepublic">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleOwnerRepublic=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Район</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleOwnerDistrict" v-on:click="editMap.vehicleOwnerDistrict=true">
									<p>{{ order.vehicle.ownerDistrict }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.ownerDistrict" v-else>
							</div>
							<div v-if="editMap.vehicleOwnerDistrict">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleOwnerDistrict=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Нас. пункт</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleOwnerCity" v-on:click="editMap.vehicleOwnerCity=true">
									<p>{{ order.vehicle.ownerCity }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.ownerCity" v-else>
							</div>
							<div v-if="editMap.vehicleOwnerCity">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleOwnerCity=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Улица</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleOwnerStreet" v-on:click="editMap.vehicleOwnerStreet=true">
									<p>{{ order.vehicle.ownerStreet }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.ownerStreet" v-else>
							</div>
							<div v-if="editMap.vehicleOwnerStreet">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleOwnerStreet=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Дом</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleOwnerHouse" v-on:click="editMap.vehicleOwnerHouse=true">
									<p>{{ order.vehicle.ownerHouse }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.ownerHouse" v-else>
							</div>
							<div v-if="editMap.vehicleOwnerHouse">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleOwnerHouse=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Квартира</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleOwnerAppartment" v-on:click="editMap.vehicleOwnerAppartment=true">
									<p>{{ order.vehicle.ownerAppartment }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.ownerAppartment" v-else>
							</div>
							<div v-if="editMap.vehicleOwnerAppartment">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleOwnerAppartment=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>



						<h4 class="header uk-margin-small-top">СТС Выдано</h4>

						<div class='uk-grid-small edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Орган</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleSTSReleaseDepartment" v-on:click="editMap.vehicleSTSReleaseDepartment=true">
									<p>{{ order.vehicle.STSReleaseDepartment }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.vehicle.STSReleaseDepartment" v-else>
							</div>
							<div v-if="editMap.vehicleSTSReleaseDepartment">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleSTSReleaseDepartment=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Когда</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.vehicleSTSReleaseDate" v-on:click="editMap.vehicleSTSReleaseDate=true">
									<p>{{ moment(order.vehicle.STSReleaseDate).format('L') }}</p>
								</div>
								<input type="date" class="uk-input main-input" v-model="order.vehicle.STSReleaseDate" v-else>
							</div>
							<div v-if="editMap.vehicleSTSReleaseDate">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.vehicleSTSReleaseDate=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<h4 class="header uk-margin-small-top">Клиент</h4>

						<div class='uk-grid-small edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Телефон</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.clientPhoneNumber" v-on:click="editMap.clientPhoneNumber=true">
									<p>{{ order.client.phoneNumber }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.client.phoneNumber" v-else>
							</div>
							<div v-if="editMap.clientPhoneNumber">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.clientPhoneNumber=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Фамилия</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.clientLastName" v-on:click="editMap.clientLastName=true">
									<p>{{ order.client.lastName }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.client.lastName" v-else>
							</div>
							<div v-if="editMap.clientLastName">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.clientLastName=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Имя</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.clientFirstName" v-on:click="editMap.clientFirstName=true">
									<p>{{ order.client.firstName }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.client.firstName" v-else>
							</div>
							<div v-if="editMap.clientFirstName">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.clientFirstName=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Отчество</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.clientMiddleName" v-on:click="editMap.clientMiddleName=true">
									<p>{{ order.client.middleName }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.client.middleName" v-else>
							</div>
							<div v-if="editMap.clientMiddleName">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.clientMiddleName=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>День рождения</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.clientBdate" v-on:click="editMap.clientBdate=true">
									<p>{{ moment(order.client.bdate).format('L') }}</p>
								</div>
								<input type="date" class="uk-input main-input" v-model="order.client.bdate" v-else>
							</div>
							<div v-if="editMap.clientBdate">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.clientBdate=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Пол</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.clientSex" v-on:click="editMap.clientSex=true">
									<p>
										<span v-if="order.client.sex == 1">Муж</span>
										<span v-else-if="order.client.sex == 2">Жен</span>
										<span v-else>Не выбран</span>
									</p>
								</div>
								<select class="uk-select" style="line-height: 24px !important; height: 24px !important;" v-model="order.client.sex" v-else>
									<option value="0">Не выбран</option>
									<option value="1">Муж</option>
									<option value="2">Жен</option>
								</select>
							</div>
							<div v-if="editMap.clientSex">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.clientSex=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>



						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Email</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.clientEmail" v-on:click="editMap.clientEmail=true">
									<p>{{ order.client.email }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.client.email" v-else>
							</div>
							<div v-if="editMap.clientEmail">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.clientEmail=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>



						<h4 class="header uk-margin-small-top">Плательщик</h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Телефон</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.payerPhoneNumber" v-on:click="editMap.payerPhoneNumber=true">
									<p>{{ order.payer.phoneNumber }}</p>
								</div>
								<input type="tel" class="uk-input main-input" v-model="order.payer.phoneNumber" v-else>
							</div>
							<div v-if="editMap.payerPhoneNumber">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.payerPhoneNumber=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Плательщик</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.payerTitle" v-on:click="editMap.payerTitle=true">
									<p>{{ order.payer.title }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.payer.title" v-else>
							</div>
							<div v-if="editMap.payerTitle">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.payerTitle=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>ИНН</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.payerINN" v-on:click="editMap.payerINN=true">
									<p>{{ order.payer.INN }}</p>
								</div>
								<input type="tel" class="uk-input main-input" v-model="order.payer.INN" v-else>
							</div>
							<div v-if="editMap.payerINN">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.payerINN=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Адрес</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.payerAddress" v-on:click="editMap.payerAddress=true">
									<p>{{ order.payer.address }}</p>
								</div>
								<input class="uk-input main-input" v-model="order.payer.address" v-else>
							</div>
							<div v-if="editMap.payerAddress">
								<a class="edit-btn" style="padding: 2px 0px;" v-on:click="editMap.payerAddress=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>


						<h4 class="header uk-margin-small-top">Причина обращения</h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.reason" v-on:click="editMap.reason=true">
									<p style="line-height: 15px;padding: 5px 0px;height: 60px;width:100%;">{{ order.reason }}</p>
								</div>
								<textarea class="uk-textarea main-input" v-model="order.reason" rows=3 v-else></textarea>
							</div>
							<div v-if="editMap.reason">
								<a class="edit-btn" style="padding: 20px 0px;" v-on:click="editMap.reason=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<h4 class="header">Рекомендации</h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.recomendations" v-on:click="editMap.recomendations=true">
									<p style="line-height: 15px;padding: 5px 0px;height: 60px;width:100%;">{{ order.recomendations }}</p>
								</div>
								<textarea class="uk-textarea main-input" v-model="order.recomendations" rows=3 v-else></textarea>
							</div>
							<div v-if="editMap.recomendations">
								<a class="edit-btn" style="padding: 20px 0px;" v-on:click="editMap.recomendations=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>

						<h4 class="header">Заметки <small>(не печатаются)</small></h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div class="uk-width-expand">
								<div class="edit-param-value" v-if="!editMap.notes" v-on:click="editMap.notes=true">
									<p style="line-height: 15px;padding: 5px 0px;height: 60px;width:100%;">{{ order.notes }}</p>
								</div>
								<textarea class="uk-textarea main-input" v-model="order.notes" rows=3 v-else></textarea>
							</div>
							<div v-if="editMap.notes">
								<a class="edit-btn" style="padding: 20px 0px;" v-on:click="editMap.notes=false; updateOrder();"><span uk-icon="icon: check;"></span></a>
							</div>
						</div>
					</div>
				</li>






				<li class="accordion-container">
					<a class="uk-accordion-title accordion-toggler"><span uk-icon="icon: cog; ratio: 0.9;"></span>&nbsp;&nbsp;Работ всего {{ order.operations.length }} <span style="color:#807e7f;">на {{ totalOperationsPrice }}₽</span></a>
					<div class="uk-accordion-content accordion-content">
						<div v-for="operation, index in order.operations" :key="index">

							<div class="uk-grid-small operation-container uk-margin-small-bottom" uk-grid v-if="!operation.editing">
								<div>
									<p class="operation-index">{{ index+1 }}</p>
								</div>
								<div class="uk-width-expand">
									<p class="operation-title">{{ operation.title }}</p>
									<div class="uk-grid-collapse" style="margin-top:5px;">
										<div>
											<p class="operation-price-count">{{ operation.price }}₽x{{ operation.count }}</p>
										</div>
										<div>
											<p class="operation-total-price">Итого {{ operation.price * operation.count }} ₽</p>
										</div>
									</div>
								</div>
								<div><a class="delete-btn" style="padding-top:10px;padding-bottom: 10px;" v-on:click="() => {deleteOperation(index)}"><span uk-icon="icon: trash"></span></a></div>
								<div><a class="edit-btn" style="padding-top:10px;padding-bottom: 10px;" v-on:click="() => {editOperationRequest(index)}"><span uk-icon="icon: pencil"></span></a></div>
							</div>
							<div class="uk-grid-small operation-container uk-margin-small-bottom" uk-grid v-else>
								<div>
									<p class="operation-index" style="line-height: 70px;">{{ index+1 }}</p>
								</div>
								<div class="uk-width-expand">
									<input class="uk-input main-input" placeholder="Название работы" v-model="operation.title"/>
									<div class="uk-grid-small uk-margin-small-top uk-child-width-1-2" uk-grid>
										<div>
											<input type="tel" placeholder="Цена" class="uk-input main-input" v-model="operation.price" />		
										</div>
										<div class="x-before">
											<input type="tel" class="uk-input main-input" placeholder="Количество" v-model="operation.count" />
										</div>
									</div>
								</div>
								<div><a class="done-btn" style="padding-top:24px;padding-bottom: 24px;" v-on:click="() => {editOperation(index)}"><span uk-icon="icon: check"></span></a></div>
							</div>

						</div>


						<a class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" v-on:click="addOperation"><span uk-icon="icon: plus; ratio: 0.6;"></span>&nbsp;&nbsp;Добавить работу по з/н</a>
					</div>
				</li>





				<li class="accordion-container">
					<a class="uk-accordion-title accordion-toggler"><span uk-icon="icon: nut; ratio: 0.9;"></span>&nbsp;&nbsp;Запчастей всего {{ order.parts.length }} <span style="color:#807e7f;">на {{ totalPartsPrice }}₽</span></a>
					<div class="uk-accordion-content accordion-content">
						<div v-for="part, index in order.parts" :key="index">

							<div class="uk-grid-small operation-container uk-margin-small-bottom" uk-grid v-if="!part.editing">
								<div>
									<p class="operation-index">{{ index+1 }}</p>
								</div>
								<div class="uk-width-expand">
									<p class="operation-title">{{ part.title }}</p>
									<div class="uk-grid-collapse" style="margin-top:5px;">
										<div>
											<p class="operation-price-count">{{ part.price }}₽x{{ part.count }}</p>
										</div>
										<div>
											<p class="operation-total-price">Итого {{ part.price * part.count }} ₽</p>
										</div>
									</div>
								</div>
								<div><a class="delete-btn" style="padding-top:10px;padding-bottom: 10px;" v-on:click="() => {deletePart(index)}"><span uk-icon="icon: trash"></span></a></div>
								<div><a class="edit-btn" style="padding-top:10px;padding-bottom: 10px;" v-on:click="() => {editPartRequest(index)}"><span uk-icon="icon: pencil"></span></a></div>
							</div>
							<div class="uk-grid-small operation-container uk-margin-small-bottom" uk-grid v-else>
								<div>
									<p class="operation-index" style="line-height: 70px;">{{ index+1 }}</p>
								</div>
								<div class="uk-width-expand">
									<input class="uk-input main-input" placeholder="Название запчасти" v-model="part.title"/>
									<div class="uk-grid-small uk-margin-small-top uk-child-width-1-2" uk-grid>
										<div>
											<input type="tel" class="uk-input main-input" placeholder="Цена" v-model="part.price" />		
										</div>
										<div class="x-before">
											<input type="tel" class="uk-input main-input" placeholder="Количество" v-model="part.count" />
										</div>
									</div>
								</div>
								<div><a class="done-btn" style="padding-top:24px;padding-bottom: 24px;" v-on:click="() => {editPart(index)}"><span uk-icon="icon: check"></span></a></div>
							</div>

						</div>


						<a class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" v-on:click="addPart"><span uk-icon="icon: plus; ratio: 0.6;"></span>&nbsp;&nbsp;Добавить запчасть к з/н</a>
					</div>
				</li>
			</ul>
			<div style="padding:10px;">
				<div class="uk-grid-small uk-child-width-1-2" uk-grid>
					<div>
						<h3 style="color:#e9fdf4;line-height:30px;">Итого {{ totalPrice }}₽</h3>
					</div>
					<div>
						<div class="uk-grid-small" uk-grid>
							<div class="uk-width-expand">
								<div v-if="!editMap.status">
									<p style="margin: 0px; text-align: right;font-size: 0.8em;color:#b9c6bf;">Статус</p>
									<p style="margin: 0px; text-align: right; font-size: 1.2em; color: #64736f;" v-if="order.status==1">ОТКРЫТ</p>
									<p style="margin: 0px; text-align: right; font-size: 1.2em; color: #ff6160;" v-else-if="order.status==2">В РАБОТЕ</p>
									<p style="margin: 0px; text-align: right; font-size: 1.2em; color: #fea154;" v-else-if="order.status==3">ОЖИДАЕТ З/Ч</p>
									<p style="margin: 0px; text-align: right; font-size: 1.2em; color: #fea154;" v-else-if="order.status==4">ВЫПОЛНЕН</p>
									<p style="margin: 0px; text-align: right; font-size: 1.2em; color: #4aae6e;" v-else-if="order.status==5">ОПЛАЧЕН</p>
									<p style="margin: 0px; text-align: right; font-size: 1.2em; color: #64736f;" v-else>В ПЛАНЕ</p>
								</div>
								<div v-else>
									<select v-model="order.status" class="uk-select">
										<option value="0" default>В плане</option>
										<option value="1">Открыт</option>
										<option value="2">В работе</option>
										<option value="3">Ожидает запчасти</option>
										<option value="4">Выполнен</option>
										<option value="5">Оплачен</option>
									</select>
								</div>
							</div>
							<div>
								<a class="edit-status-btn" v-on:click="editMap.status=true" v-if="!editMap.status"><span uk-icon="icon: pencil;ratio: 1.1;"></span></a>						
								<a class="edit-status-btn" v-on:click="editOrderStatusDone" v-else><span uk-icon="icon: check;ratio: 1.1;"></span></a>
							</div>
						</div>
					</div>
				</div>
				<div v-if="order.status == 4">
					<p class="input-header" style="color: rgb(161, 174, 169);">Рекомендации</p>
					<div class="uk-grid-small edit-param-block" uk-grid v-if="editingRecomendations">
						<div class="uk-width-expand">
							<textarea class="uk-textarea main-input" v-model="order.recomendations" rows="4"></textarea>
						</div>
						<div>
							<a class="done-btn" style="padding: 27px 5px;width: 30px;" v-on:click="() => {editingRecomendations = false; updateOrder();}"><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class="edit-param-value" v-else v-on:click="()=>{editingRecomendations=true;}">
						<p style="line-height: 15px;padding: 5px 0px;height: 60px;width:100%;">{{ order.recomendations }}</p>
					</div>
					<p class="input-header" style="color: rgb(161, 174, 169); margin-top: 5px;">Финальный пробег</p>
					<div class="uk-grid-small edit-param-block" uk-grid v-if="editingMileageDone">
						<div class="uk-width-expand">
							<input type="tel" class="uk-input main-input" v-model="order.mileageDone">
						</div>
						<div>
							<a class="done-btn" style="padding: 10px 5px;width: 30px;" v-on:click="() => {editingMileageDone = false; updateOrder();}"><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
					<div class="edit-param-value" v-else v-on:click="()=>{editingMileageDone=true;}">
						<p style="line-height: 40px; height: 40px; margin: 0px;">{{ order.mileageDone }} км</p>
					</div>
				</div>
				<router-link :to="{ name: 'printorder', params: {id: order.id}}" class="uk-button uk-button-primary main-btn uk-button-small uk-margin-small-top uk-width-1-1"><span uk-icon="icon: print; ratio: 0.8;"></span>&nbsp;&nbsp;Печать</router-link>

				<button class="uk-button uk-button-primary main-btn uk-button-small uk-margin-small-top uk-margin-bottom uk-width-1-1" style="background: #fe4f70 !important;" v-on:click="deleteOrder"><span uk-icon="icon: trash; ratio: 0.8;"></span>&nbsp;&nbsp;Удалить</button>
			</div>
		</div>
	</div>
</template>

<script>

import OrderService from '../services/order.service'


export default {
	name: 'editOrder',
	data() {
		return { orderId: null, order: null, editingRecomendations: false, editingMileageDone: false, editMap: {}, }
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
		}
		this.orderId = this.$route.params.id
		OrderService.getById(this.orderId).then(resp => {
			this.order = resp.data
			this.order.vehicle.STSReleaseDate = this.order.vehicle.STSReleaseDate.split('T')[0]
			this.order.client.bdate = this.order.client.bdate.split('T')[0]
			this.order.lastOpenedAt = new Date()
			this.updateOrder(true)
		}, err => {
			window.UIkit.notification(err.response.data.message, {status: "danger"})
		})
	},
	computed: {
		totalOperationsPrice(){
			let price = 0;
			for(let index in this.order.operations){
				let operation = this.order.operations[index]
				price += operation.price * operation.count
			}
			return price
		},
		totalPartsPrice() {
			let price = 0;
			for(let index in this.order.parts){
				let part = this.order.parts[index]
				price += part.price * part.count
			}
			return price
		},
		totalPrice() {
			let price = 0
			for(let index in this.order.operations){
				let operation = this.order.operations[index]
				price += operation.price * operation.count
			}
			for(let index in this.order.parts){
				let part = this.order.parts[index]
				price += part.price * part.count
			}
			return price
		}
	},
	methods: {
		moment: window.moment,
		updateOrder(silent=false) {
			OrderService.update(this.orderId, this.order).then(() => {
				if(!silent){
					window.UIkit.notification("Изменения успешно сохранены", {status: "success"})
				}
			}, err => {
				window.UIkit.notification(err.response.data.message, {status: "danger"})
			})
		},
		editValue(target, currValue){
			window.UIkit.modal.prompt("Введите новое значение:", currValue).then((newVal) => {
				if(newVal === null){
					return
				}
				let path = target.split('.')
				if(path.length == 1){
					this.order[path[0]] = newVal
				} else if(path.length == 2){
					this.order[path[0]][path[1]] = newVal
				} else {
					alert('Deep target in edit value. ERROR')
					return
				}
				this.updateOrder()
			})
		},
		addOperation(){
			this.order.operations.push({
				title: '', price: '', count: 1, editing: true,
			})
		},
		deleteOperation(index){
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить элемент?").then(() => {
				this.order.operations.splice(index, 1)
				this.updateOrder()
			}, () => {})
		},
		editOperationRequest(index){
			this.order.operations[index].editing = true;
		},
		editOperation(index){
			this.order.operations[index].editing = false;
			this.updateOrder()
		},
		addPart(){
			this.order.parts.push({
				title: '', price: '', count: 1, editing: true,
			})
		},
		deletePart(index){
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить элемент?").then(() => {
				this.order.parts.splice(index, 1)
				this.updateOrder()
			}, () => {})
		},
		editPartRequest(index){
			this.order.parts[index].editing = true;
		},
		editPart(index){
			this.order.parts[index].editing = false;
			this.updateOrder()
		},
		editOrderStatusDone(){
			this.editMap.status = false
			if(this.order.status == 4){
				window.UIkit.notification("Не забудьте добавить рекомендации и указать финальный пробег!", {status: "warning"})
			}
			this.updateOrder()
		},
		printOrder(){
			window.UIkit.notification("printing")
		},
		deleteOrder(){
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить заказ-наряд?").then(() => {
				OrderService.deleteById(this.orderId).then(() => {
					window.UIkit.notification("Заказ-наряд успешно удален", {status: "success"})
					this.$router.push("/orders")
				}, err => {
					window.UIkit.notification(err.response.data.message, {status: "danger"})
				})
			})
		}
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
.operation-index {

    font-size: 2em;
    color: #537565;
    line-height: 40px;

}
.operation-price-count {

    margin: 0px 0px 0px 5px;
    color: #616161;
    float: left;

}
.operation-total-price {

    margin: 0px;
    color: #2e7557;
    float: right;

}
.operation-title {

    margin: 0px;
    line-height: 20px;
    background: #f0fff8;
    border-radius: 5px;
    padding: 0px 5px;
    color: #2f7559;
    font-weight: 600;
    font-size: 1.2em;

}

.x-before::before {
	content: 'x';
	margin-left: -10px;
}
/* rewrite */
.edit-param-block input.main-input {
	height: 24px !important;
	line-height: 24px !important;
}
.uk-grid-small {
	margin-left: -10px !important;
}
.uk-grid-small > * {
	padding-left: 10px;
}
.uk-select {
	background-color: #f0fff8 !important;
   border: 1px solid #979797 !important;
	border-radius: 5px;
	height: 30px !important;
}
/* endrewrite */
</style>