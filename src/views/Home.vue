<template>
	<main class="home-page">
		<Title />
		<div class="view_text">
			<p>Welcome to APIbuster app.</p>
			<p>With this app you can test your API real-time.</p>
		</div>
	</main>
</template>

<script setup>
import Title from '../components/Title.vue'
</script>

<style>
.view_text {
	margin-top: 10rem;
	font-size: 1.5rem;
}
</style>