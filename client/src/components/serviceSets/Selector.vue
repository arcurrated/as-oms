<template>
	<div>
		<input class="uk-input main-input main-input-md" placeholder="Поиск по названию" v-model="pattern">
		<p class="text-muted uk-margin-small" v-if="serviceSets.length == 0">Сеты обслуживания отсутствуют</p>
		<ul class="uk-margin-small-top uk-margin-remove" uk-accordion="multiple: true;" v-else>
			<li class="accordion-container uk-margin-small-top" v-for="serviceSet, index in serviceSets" :key="index">
				<a class="uk-accordion-title accordion-toggler">{{ serviceSet.title }} <span class="uk-text-muted">на {{ serviceSet.totalPrice }}₽</span></a>
				<div class="uk-accordion-content accordion-content uk-margin-remove">
					<p class="header uk-margin-remove-top">Работы ({{ serviceSet.totalOperationsPrice }}₽)</p>
					<div v-for="operation, o_index in serviceSet.operations" :key="o_index">
						<div class="uk-grid-collapse uk-margin-small-bottom" uk-grid>
							<div class="uk-width-expand">
								<p class="title">{{ operation.title }}</p>
							</div>
							<div>
								<p class="price">{{ operation.price }}₽ x {{ operation.count }}</p>
							</div>
						</div>
					</div>
					<p class="header">Запчасти ({{ serviceSet.totalPartsPrice }}₽)</p>
					<div v-for="part, p_index in serviceSet.parts" :key="p_index">
						<div class="uk-grid-collapse uk-margin-small-bottom" uk-grid>
							<div class="uk-width-expand">
								<p class="title">{{ part.title }}</p>
							</div>
							<div>
								<p class="price">{{ part.price }}₽ x {{ part.count }}</p>
							</div>
						</div>
					</div>
					<a class="uk-button uk-button-primary main-btn uk-button-small uk-width-1-1" style="margin-top: 5px;" v-on:click="select(serviceSet)">Использовать</a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>

import ServiceSetService from '../../services/serviceSet.service'
	
export default {
	name: "ServiceSetSelector",
	data() {
		return { 
			serviceSets: [],
			pattern: '',
			page: 1,
			perPage: process.env.VUE_APP_DEFAULT_PER_PAGE || 5,
		}
	},
	mounted(){
		this.loadSets()
	}, 
	watch: {
		pattern(){
			this.loadSets()
		}
	},
	methods: {
		loadSets(){
			const filter = {
				title: this.pattern,
			}
			ServiceSetService.getAll(this.page, this.perPage, { updatedAt: -1 },filter).then(resp => {
				this.serviceSets = resp.data.serviceSets
			}, error => {
				window.UIkit.notification(error.response.data.message, { status: 'danger' })
			})
		},
		select(set){
			this.$emit("select", set)
		}
	}
}

</script>

<style scoped>
.accordion-container {
	border-radius: 7px;
	background-color: #f0fff8;
	overflow: hidden;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, .1);
	border: 1px solid #f0fff8;
	transition: .2s all;
}
.accordion-container .uk-open {
	border-color: #128b60;
}
.accordion-content {
	background-color: #e0ece8;
	padding: 7px 10px 10px 10px;
}
.accordion-content p {
	line-height: 20px;
}
.accordion-toggler {
	padding: 10px;
	color: rgba(80, 90, 60) !important;
}

.title {
	font-weight: 600;
	padding: 0px 20px 0px 8px;
	border-radius: 5px;
	background-color: #f0fff8;
	color: #2f7559;
}
.price {
	min-width: 55px;
	padding-left: 5px;
	text-align: right;

}
.header {
	margin-top: 5px;
	margin-left: 5px;
	color: #555;
	font-weight: 400;
}

/* rewrite */
.uk-margin-small-bottom {
	margin-bottom: 7px !important;
}
</style>