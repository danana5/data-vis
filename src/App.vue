<template>
	<v-app>
		<v-app-bar app color="primary" dark> Data Visualisation </v-app-bar>
		<v-main>
			<Charts />
		</v-main>
	</v-app>
</template>

<script>
import Charts from "./components/Charts.vue"

export default {
	name: 'App',

	components: {
		Charts
	},

	data: () => ({
	}),
};
</script>
