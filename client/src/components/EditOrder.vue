<template>
	<div class="uk-container">
		<div v-if="order">
			<ul class="uk-margin-remove" uk-accordion="multiple: true;">
				<li class="accordion-container">
					<a class="uk-accordion-title accordion-toggler"><span uk-icon="icon: info; ratio: 0.9;"></span>&nbsp;&nbsp;Данные заказ-наряда №{{ order.number }}</a>
					<div class="uk-accordion-content accordion-content">
						<h4 class="header">Данные об автомобиле (СТС)</h4>
						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Серия, номер СТС</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.STSNumber }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.STSNumber', order.vehicle.STSNumber)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Гос. номер</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.licensePlateNumber }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.licensePlateNumber', order.vehicle.licensePlateNumber)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Марка</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.brand }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.brand', order.vehicle.brand)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Модель</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.model }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.model', order.vehicle.model)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>VIN-номер</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.VIN }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.VIN', order.vehicle.VIN)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Год выпуска</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.releaseYear }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.releaseYear', order.vehicle.releaseYear)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Цвет</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.color }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.color', order.vehicle.color)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Двигатель</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.engine }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.engine', order.vehicle.engine)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Объем дв. (см3)</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.engineVolume }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.engineVolume', order.vehicle.engineVolume)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Мощь (кВт/л.с.)</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.enginePower }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.enginePower', order.vehicle.enginePower)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Пробег</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.mileageInit }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('mileageInit', order.mileageInit)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<h4 class="header uk-margin-small-top">Собственник</h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>ФИО</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.ownerFIO }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.ownerFIO', order.vehicle.ownerFIO)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Респ, край, обл.</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.ownerRepublic }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.ownerRepublic', order.vehicle.ownerRepublic)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Район</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.ownerDistrict }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.ownerDistrict', order.vehicle.ownerDistrict)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Нас. пункт</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.ownerCity }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.ownerCity', order.vehicle.ownerCity)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Улица</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.ownerStreet }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.ownerStreet', order.vehicle.ownerStreet)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Дом</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.ownerHouse }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.ownerHouse', order.vehicle.ownerHouse)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Квартира</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.ownerAppartment }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.ownerAppartment', order.vehicle.ownerAppartment)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<h4 class="header uk-margin-small-top">СТС Выдано</h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Орган</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.vehicle.STSReleaseDepartment }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.STSReleaseDepartment', order.vehicle.STSReleaseDepartment)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>




						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Когда</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ moment(order.vehicle.STSReleaseDate).format('L') }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('vehicle.STSReleaseDate', order.vehicle.STSReleaseDate)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<h4 class="header uk-margin-small-top">Клиент</h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Телефон</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.client.phoneNumber }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('client.phoneNumber', order.client.phoneNumber)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Фамилия</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.client.lastName }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('client.lastName', order.client.lastName)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Имя</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.client.firstName }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('client.firstName', order.client.firstName)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Отчество</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.client.middleName }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('client.middleName', order.client.middleName)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Дата рождения</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ moment(order.client.bdate).format('L') }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('client.bdate', order.client.bdate)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>

						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Пол</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>
									<span v-if="order.client.sex == 1">Муж</span>
									<span v-else-if="order.client.sex == 2">Жен</span>
									<span v-else>Не определен</span>
								</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('client.sex', order.client.sex)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Email</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.client.email }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('client.email', order.client.email)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<h4 class="header uk-margin-small-top">Плательщик</h4>
						<div class='uk-grid-small edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Телефон</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.payer.phoneNumber }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('payer.phoneNumber', order.payer.phoneNumber)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>



						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Плательщик</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.payer.title }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('payer.title', order.payer.title)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>ИНН</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.payer.INN }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('payer.INN', order.payer.INN)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>


						<div class='uk-grid-small uk-margin-small-top edit-param-block' uk-grid>
							<div>
								<div class="edit-param-label"><p>Адрес</p></div>
							</div>
							<div class="uk-width-expand">
								<div class="edit-param-value"><p>{{ order.payer.address }}</p></div>
							</div>
							<div>
								<a class="edit-btn" v-on:click="() => {editValue('payer.address', order.payer.address)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>


						<h4 class="header uk-margin-small-top">Причина обращения</h4>
						<div class="uk-grid-small edit-param-block" uk-grid>
							<div class="uk-width-expand">
								<div class="edit-param-value">
									<p style="line-height: 15px;padding: 5px 0px;height: 60px;width:100%;">{{ order.reason }}</p>
								</div>
							</div>
							<div>
								<a class="edit-btn" style="padding-top:20px;padding-bottom: 20px;" v-on:click="() => {editValue('reason', order.reason)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>

						<h4 class="header">Рекомендации</h4>
						<div class="uk-grid-small edit-param-block" uk-grid>
							<div class="uk-width-expand">
								<div class="edit-param-value">
									<p style="line-height: 15px;padding: 5px 0px;height: 60px;width:100%;">{{ order.recomendations }}</p>
								</div>
							</div>
							<div>
								<a class="edit-btn" style="padding-top:20px;padding-bottom: 20px;" v-on:click="() => {editValue('recomendations', order.recomendations)}"><span uk-icon="icon: pencil"></span></a>
							</div>
						</div>

						<h4 class="header">Заметки</h4>
						<div class="uk-grid-small edit-param-block" uk-grid>
							<div class="uk-width-expand">
								<div class="edit-param-value">
									<p style="line-height: 15px;padding: 5px 0px;height: 60px;width:100%;">{{ order.notes }}</p>
								</div>
							</div>
							<div>
								<a class="edit-btn" style="padding-top:20px;padding-bottom: 20px;" v-on:click="() => {editValue('notes', order.notes)}"><span uk-icon="icon: pencil"></span></a>
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
											<input type="number" placeholder="Цена" class="uk-input main-input" v-model="operation.price" />		
										</div>
										<div class="x-before">
											<input type="number" class="uk-input main-input" placeholder="Количество" v-model="operation.count" />
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
											<input type="number" class="uk-input main-input" placeholder="Цена" v-model="part.price" />		
										</div>
										<div class="x-before">
											<input type="number" class="uk-input main-input" placeholder="Количество" v-model="part.count" />
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
								<div v-if="!editingStatus">
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
										<option value="0">В плане</option>
										<option value="1">Открыт</option>
										<option value="2">В работе</option>
										<option value="3">Ожидает запчасти</option>
										<option value="4">Выполнен</option>
										<option value="5">Оплачен</option>
									</select>
								</div>
							</div>
							<div>
								<a class="edit-status-btn" v-on:click="() => {editingStatus=true}" v-if="!editingStatus"><span uk-icon="icon: pencil;ratio: 1.1;"></span></a>						
								<a class="edit-status-btn" v-on:click="() => {editingStatus=false; updateOrder();}" v-else><span uk-icon="icon: check;ratio: 1.1;"></span></a>
							</div>
						</div>
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
		return { orderId: null, order: null, editingStatus: false,}
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
		}
		this.orderId = this.$route.params.id
		OrderService.getById(this.orderId).then(resp => {
			this.order = resp.data
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
.header {
	margin: 0px;
	color:  #537564;
	font-weight: 600;
}
.edit-param-label {
	width: 95px;
	overflow: hidden;
}
.edit-param-label p {
	width: 150px;
}
.edit-param-block p {
	width: 500px;
    line-height: 20px;
    height: 20px;
    margin: 0px;
}
.edit-param-value {
	overflow: hidden;
	font-weight: 600;
    padding: 0px 8px;
    border-radius: 5px;
    background-color: #f0fff8;
    color: #2f7559;
}
.edit-param-value > p {
	overflow: hidden;
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