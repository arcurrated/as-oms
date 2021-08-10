<template>
	<div class="uk-container">
		<div v-if="loading" class="uk-flex uk-flex-center uk-margin-small-top">
			<div uk-spinner></div>
		</div>
		<div v-else>
			<div style="padding: 10px; border-radius: 10px; background: #d3e2db;">
				<div class='uk-grid-small edit-param-block' uk-grid>
						<div>
							<div class="edit-param-label"><p>Название сета обслуживания</p></div>
						</div>
						<div class="uk-width-expand">
							<div class="edit-param-value" v-on:click="editMap.title = true" v-if="!editMap.title"><p>{{ serviceSet.title }}</p></div>
							<input class="uk-input main-input" v-model="serviceSet.title" v-else>
						</div>
						<div v-if="editMap.title">
							<a class="edit-btn" style="padding: 2px 0px" v-on:click="editMap.title = false; update();"><span uk-icon="icon: check;"></span></a>
						</div>
					</div>
			</div>
			<ul class="uk-margin-small-top uk-margin-remove" uk-accordion="multiple: true;">
				<li class="accordion-container">
					<a class="uk-accordion-title accordion-toggler"><span uk-icon="icon: cog; ratio: 0.9;"></span>&nbsp;&nbsp;Работ всего {{ serviceSet.operations.length }} <span style="color:#807e7f;">на {{ totalOperationsPrice }}₽</span></a>
					<div class="uk-accordion-content accordion-content">
						<div v-for="operation, index in serviceSet.operations" :key="index">

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


						<a class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" v-on:click="addOperation"><span uk-icon="icon: plus; ratio: 0.6;"></span>&nbsp;&nbsp;Добавить работу к сету обслуживания</a>
					</div>
				</li>





				<li class="accordion-container">
					<a class="uk-accordion-title accordion-toggler"><span uk-icon="icon: nut; ratio: 0.9;"></span>&nbsp;&nbsp;Запчастей всего {{ serviceSet.parts.length }} <span style="color:#807e7f;">на {{ totalPartsPrice }}₽</span></a>
					<div class="uk-accordion-content accordion-content">
						<div v-for="part, index in serviceSet.parts" :key="index">

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


						<a class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" v-on:click="addPart"><span uk-icon="icon: plus; ratio: 0.6;"></span>&nbsp;&nbsp;Добавить запчасть к сету обслуживания</a>
					</div>
				</li>
			</ul>
		</div>
		<div class="uk-margin-small-top uk-margin-bottom" style="padding:0px 10px;">
			<button class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" style="background: #fe4f70 !important;" v-on:click="remove"><span uk-icon="icon: trash; ratio: 0.8;"></span>&nbsp;&nbsp;Удалить</button>	
		</div>
	</div>
</template>

<script>

import ServiceSetService from '../../services/serviceSet.service'
	
export default {
	name: 'editserviceset',
	data() {
		return { serviceSet: null, serviceSetId: null, loading: true, editMap: {}}
	},
	mounted() {
		if(!this.$store.state.auth.status.loggedIn){
			this.$router.push('/login')
			return;
		}
		this.serviceSetId = this.$route.params.id
		ServiceSetService.getById(this.serviceSetId).then(resp => {
			this.serviceSet = resp.data
			this.loading = false
		}, err => {
			window.UIkit.notification(err.response.data.message, {status: "danger"})
			this.loading = false
		})
	},
	computed: {
		totalOperationsPrice(){
			let price = 0;
			for(let index in this.serviceSet.operations){
				let operation = this.serviceSet.operations[index]
				price += operation.price * operation.count
			}
			return price
		},
		totalPartsPrice() {
			let price = 0;
			for(let index in this.serviceSet.parts){
				let part = this.serviceSet.parts[index]
				price += part.price * part.count
			}
			return price
		},
		totalPrice() {
			let price = 0
			for(let index in this.serviceSet.operations){
				let operation = this.serviceSet.operations[index]
				price += operation.price * operation.count
			}
			for(let index in this.serviceSet.parts){
				let part = this.serviceSet.parts[index]
				price += part.price * part.count
			}
			return price
		}
	},
	methods: {
		moment: window.moment,
		update(){
			ServiceSetService.update(this.serviceSetId, this.serviceSet).then(() => {
				window.UIkit.notification("Изменения успешно сохранены", {status: "success"})
			}, err => {
				window.UIkit.notification(err.response.data.message, {status: "danger"})
			})
		},
		remove(){
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить пресет?").then(() => {
				ServiceSetService.remove(this.serviceSetId).then(() => {
					window.UIkit.notification("Пресет успешно удален", {status: "success"})
					this.$router.push('/servicesets')
				}, err => {
					window.UIkit.notification(err.response.data.message, {status: "danger"})
				})
			})
		},
		addOperation(){
			this.serviceSet.operations.push({
				title: '', price: '', count: 1, editing: true,
			})
		},
		deleteOperation(index){
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить элемент?").then(() => {
				this.serviceSet.operations.splice(index, 1)
				this.update()
			}, () => {})
		},
		editOperationRequest(index){
			this.serviceSet.operations[index].editing = true;
		},
		editOperation(index){
			this.serviceSet.operations[index].editing = false;
			this.update()
		},
		addPart(){
			this.serviceSet.parts.push({
				title: '', price: '', count: 1, editing: true,
			})
		},
		deletePart(index){
			window.UIkit.modal.confirm("Вы уверены, что хотите удалить элемент?").then(() => {
				this.serviceSet.parts.splice(index, 1)
				this.update()
			}, () => {})
		},
		editPartRequest(index){
			this.serviceSet.parts[index].editing = true;
		},
		editPart(index){
			this.serviceSet.parts[index].editing = false;
			this.update()
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