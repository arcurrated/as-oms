<template>
	<div class="uk-container">
		<h1 style="color:red;" v-if="errorMessage">{{ errorMessage }}</h1>
		<div v-if="order">
			<iframe id="printArea" name="printArea" style="display: none;"></iframe>
			<div width="100%" style="max-height:300px; overflow: scroll; border-radius: 5px;">
				<div id="print" style="width: 210mm; background: #fff; color: black; font-size: 12pt; font-family: sans-serif;">
					<p style="text-align: right;">{{ commons.organizationTitle }}<br>
					{{ commons.organizationAddress }}</p>
					<h3 style="text-align: center;">Заказ-наряд №{{ order.number }} от {{ moment(order.createdAt).format('LL') }}</h3>
					<table width="100%" style="font-size: 10pt;">
						<tr>
							<td style="text-align: right;">Исполнитель: </td>
							<td colspan="5" style="font-weight: bold;">{{ commons.organizationTitle }}</td>
						</tr>
						<tr>
							<td style="text-align: right;">Заказчик: </td>
							<td colspan="2" style="font-weight: bold;">{{ order.payer.title }}</td>
							<td style="text-align: right;">Контактный телефон: </td>
							<td colspan="2" style="font-weight: bold;">{{ order.payer.phoneNumber }}</td>
						</tr>
						<tr>
							<td style="text-align: right;">Модель: </td>
							<td style="font-weight: bold;">{{ order.vehicle.brand }} {{ order.vehicle.model }}</td>
							<td style="text-align: right;">Год выпуска: </td>
							<td style="font-weight: bold;">{{ order.vehicle.releaseYear }}</td>
							<td style="text-align: right;">Пробег: </td>
							<td style="font-weight: bold;">{{ order.mileageInit }} км</td>
						</tr>
						<tr>
							<td style="text-align: right;">VIN: </td>
							<td style="font-weight: bold;">{{ order.vehicle.VIN }}</td>
							<td style="text-align: right;">Рег. знак: </td>
							<td style="font-weight: bold;">{{ order.vehicle.licensePlateNumber }}</td>
							<td style="text-align: right;">Цвет: </td>
							<td style="font-weight: bold;">{{ order.vehicle.color }}</td>
						</tr>
					</table>
					<h5 style="margin-bottom: 0px;">Причина обращения:</h5>
					<p style="margin-top:0px;">{{ order.reason }}</p>
					<h4 style="margin-bottom: 5px;">Перечень выполненных работ:</h4>
					<table border="1px" style="font-size: 10pt; border-collapse: collapse;" cellpadding="4px" bordercolor="#000" width="100%" cellSpacing="0">
						<tr style="font-weight: bold; text-align: center;">
							<td>№</td>
							<td>Наименование работ, услуг</td>
							<td>Ед. изм</td>
							<td>Кол-во</td>
							<td>Цена, руб</td>
							<td>Сумма, руб</td>
						</tr>
						<tr v-for="operation, index in order.operations" :key="index">
							<td>{{ index + 1 }}</td>
							<td>{{ operation.title }}</td>
							<td>шт.</td>
							<td>{{ operation.count }}</td>
							<td>{{ operation.price }}</td>
							<td>{{ operation.count * operation.price }}</td>
						</tr>
						<tr style="font-weight: bold;">
							<td colspan="5" style="text-align: right;" border="none">Итого:</td>
							<td>{{ order.totalOperationsPrice }}</td>
						</tr>
					</table>
					<h4 style="margin-bottom: 5px;">Используемые материалы (запчасти):</h4>
					<table border="1px" style="font-size: 10pt; border-collapse: collapse;" cellpadding="4px" bordercolor="#000" width="100%" cellSpacing="0">
						<tr style="font-weight: bold; text-align: center;">
							<td>№</td>
							<td>Наименование товара (зап.части)</td>
							<td>Ед. изм</td>
							<td>Кол-во</td>
							<td>Цена, руб</td>
							<td>Сумма, руб</td>
						</tr>
						<tr v-for="part, index in order.parts" :key="index">
							<td>{{ index + 1 }}</td>
							<td>{{ part.title }}</td>
							<td>шт.</td>
							<td>{{ part.count }}</td>
							<td>{{ part.price }}</td>
							<td>{{ part.count * part.price }}</td>
						</tr>
						<tr style="font-weight: bold;">
							<td colspan="5" style="text-align: right;" border="none">Итого:</td>
							<td>{{ order.totalPartsPrice }}</td>
						</tr>
					</table>

					<p style="text-align: right; font-weight: bold; font-size: 10pt;">Всего к оплате:<span style="padding: 3px 20px;">{{ order.totalPrice }} руб</span></p>
					<p style="font-weight: bold; margin-bottom: 10px;">Всего к оплате {{ rubles(order.totalPrice) }}</p>
					<div style="font-size: 10pt;">
						<p style="color: #444; font-size: 9pt; border: 1px dotted #444; padding: 5px; text-align: justify;">{{ commons.orderAgreementText }}</p>
						<p v-if="order.recomendations" style="color: #444; font-size: 9pt; border: 1px dotted #444; padding: 5px; text-align: justify;">Рекомендации: {{ order.recomendations }}</p>
						<h5 style="margin-bottom: 0px;">Автомобиль принял, претензий не имею:</h5>
						<table>
							<tr>
								<td>Заказчик</td>
								<td><span style="width: 35mm; display: inline-block; padding: 5px; border-bottom: 1px solid #000;">&nbsp;</span></td>
								<td>/{{ order.client.lastName }} {{ order.client.firstName }} {{order.client.middleName }}/</td>
							</tr>
							<tr>
								<td>Исполнитель</td>
								<td><span style="width: 35mm; display: inline-block; padding: 5px; border-bottom: 1px solid #000;">&nbsp;</span></td>
							</tr>
							<tr>
								<td>Дата</td>
								<td colspan="2"><span style="border-bottom: 1px solid #000; display: inline-block; padding: 5px;">{{ moment().format('LL') }}</span></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<button class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1 uk-margin-small-top uk-margin-bottom" v-on:click="printOrder">Печать</button>
		</div>
	</div>
</template>

<script>

import OrderService from '../services/order.service'
import CommonsService from '../services/commons.service'

export default {
	name: 'PrintOrder',
	data(){
		return { order: null, errorMessage: null, commons: {} }
	},
	mounted(){
		const orderId = this.$route.params.id
		OrderService.getById(orderId).then(resp => {
			this.order = resp.data
		}, err => {
			this.errorMessage = err.response.data.message
		})
		CommonsService.get().then(resp => {
			this.commons = resp.data
		}, err => {
			this.window.UIkit.notification(err.response.data.message, {status: "danger"})
		})
	},
	methods: {
		moment: window.moment,
		rubles: window.rubles,
		printOrder(){
			document.getElementById('printArea').contentDocument.body.innerHTML = document.getElementById('print').parentElement.innerHTML
			document.getElementById('printArea').contentWindow.print()
		}
	}
}

</script>