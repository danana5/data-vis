<template>
	<v-container>
		<v-row>
			<v-card flat class="mx-auto">
				<h1>Select a State</h1>
				<v-card-actions>
					<v-select dense :items="items" label="Select a State" outlined v-model="state"></v-select>
					<v-btn class="mb-6 ml-2" outlined @click="update()">Load Data</v-btn>
				</v-card-actions>

			</v-card>
		</v-row>
		<v-row justify="center" class="mb-5">
			<v-col cols="5">
				<v-card>
					<h1>Average Price</h1>
					<v-container><line-chart prefix="$" :data="prices" xtitle="Year" ytitle="Price"
							:curve="false"></line-chart></v-container>
				</v-card>
			</v-col>
			<v-col cols="5">
				<v-card>
					<h1>Production</h1>
					<v-container><area-chart :curve="false" xtitle="Year" thousands="," ytitle="Production" suffix="lbs"
							:data="production"></area-chart></v-container>
				</v-card>
			</v-col>
		</v-row>
		<v-row justify="center" class="mb-5">
			<v-col cols="5">
				<v-card>
					<h1>Yield Per Colony</h1>
					<v-container><column-chart xtitle="Year" ytitle="Yield" suffix="lbs"
							:data="yields"></column-chart></v-container>
				</v-card>
			</v-col>
			<v-col cols="5">
				<v-card>
					<h1>Number of Bee Colonies</h1>
					<v-container><line-chart :data="colonies" thousands="," xtitle="Year"
							ytitle="Colonies"></line-chart></v-container>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-card flat class="mx-auto">
				<h1>Select a Year</h1>
				<v-card-actions>
					<v-text-field dense label="Select a Year (1995-2021)" outlined v-model="year"></v-text-field>
					<v-btn class="mb-6 ml-2" outlined @click="updateYear()">Load Data</v-btn>
				</v-card-actions>

			</v-card>
		</v-row>
		<v-row justify="center" class="mb-5">
			<v-col cols="3">
				<v-card>
					<h1>Production by State</h1>
					<v-container><bar-chart height="700px" :data="yearProd"
							:colors="['#880009']"></bar-chart></v-container>
				</v-card>
			</v-col>
			<v-col cols="3">
				<v-card>
					<h1>Price by State</h1>
					<v-container><bar-chart height="700px" prefix="$" :colors="['#11AACC']"
							:data="yearPrice"></bar-chart></v-container>
				</v-card>
			</v-col>
			<v-col cols="3">
				<v-card>
					<h1>Bee Colonies By State</h1>
					<v-container><bar-chart height="700px" :colors="['#1B370D']"
							:data="yearColonies"></bar-chart></v-container>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { defineComponent, ref } from "vue";
import data from "../assets/data/data";

export default defineComponent({
	setup() {
		let prices = ref({})
		let colonies = ref({})
		let yields = ref({})
		let production = ref({})

		let year = ref(1995)
		let yearProd = ref({})
		let yearPrice = ref({})
		let yearColonies = ref({})

		let items = ref(['Alabama'
			, 'Arizona'
			, 'Arkansas'
			, 'California'
			, 'Colorado'
			, 'Florida'
			, 'Georgia'
			, 'Hawaii'
			, 'Idaho'
			, 'Illinois'
			, 'Indiana'
			, 'Iowa'
			, 'Kansas'
			, 'Kentucky'
			, 'Louisiana'
			, 'Maine'
			, 'Maryland'
			, 'Michigan'
			, 'Minnesota'
			, 'Mississippi'
			, 'Missouri'
			, 'Montana'
			, 'Nebraska'
			, 'Nevada'
			, 'NewJersey'
			, 'NewMexico'
			, 'NewYork'
			, 'NorthCarolina'
			, 'NorthDakota'
			, 'Ohio'
			, 'Oklahoma'
			, 'Oregon'
			, 'Pennsylvania'
			, 'SouthCarolina'
			, 'SouthDakota'
			, 'Tennessee'
			, 'Texas'
			, 'Utah'
			, 'Vermont'
			, 'Virginia'
			, 'Washington'
			, 'WestVirginia'
			, 'Wisconsin'
			, "Wyoming"])

		let state = ref("Alabama")

		prices.value = getStatePrice(state.value)
		colonies.value = getStateColonies(state.value)
		production.value = getStateProduction(state.value)
		yields.value = getStateYields(state.value)

		yearProd.value = getYearProduction(year.value)
		yearPrice.value = getYearPrice(year.value)
		yearColonies.value = getYearColonies(year.value)

		function getStatePrice(state) {
			let res = {};
			for (let i = 0; i < data.length; i++) {
				if (data[i].state == state) {
					let year = data[i].year;
					let price = data[i].average_price;
					res[year] = price
				}
			}
			return res;
		}

		function getStateColonies(state) {
			let res = {};
			for (let i = 0; i < data.length; i++) {
				if (data[i].state == state) {
					let year = data[i].year;
					let colonies = data[i].colonies_number;
					res[year] = colonies
				}
			}
			return res;
		}

		function getStateProduction(state) {
			let res = {};
			for (let i = 0; i < data.length; i++) {
				if (data[i].state == state) {
					let year = data[i].year;
					let production = data[i].production;
					res[year] = production
				}
			}
			return res;
		}

		function getStateYields(state) {
			let res = {};
			for (let i = 0; i < data.length; i++) {
				if (data[i].state == state) {
					let year = data[i].year;
					let yields = data[i].yield_per_colony;
					res[year] = yields
				}
			}
			return res;
		}

		function update() {
			prices.value = getStatePrice(state.value)
			colonies.value = getStateColonies(state.value)
			production.value = getStateProduction(state.value)
			yields.value = getStateYields(state.value)
		}

		function getYearProduction(year) {
			let res = {}

			for (let i = 0; i < data.length; i++) {
				if (data[i].year == year) {
					res[data[i].state] = data[i].production
				}
			}
			return res
		}

		function getYearPrice(year) {
			let res = {}

			for (let i = 0; i < data.length; i++) {
				if (data[i].year == year) {
					res[data[i].state] = data[i].average_price
				}
			}
			return res
		}

		function getYearColonies(year) {
			let res = {}

			for (let i = 0; i < data.length; i++) {
				if (data[i].year == year) {
					res[data[i].state] = data[i].colonies_number
				}
			}
			return res
		}

		function updateYear() {
			yearProd.value = getYearProduction(year.value)
			yearPrice.value = getYearPrice(year.value)
			yearColonies.value = getYearColonies(year.value)

		}

		return { prices, state, colonies, production, yields, items, update, year, yearProd, yearPrice, updateYear, yearColonies }
	}

})
</script>

<style>

</style>