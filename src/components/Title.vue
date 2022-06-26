<template>
    <div class="title">
        <div class="title_group">
            <h1>API</h1>
            <h1 class="green">buster</h1>
            <h1 style="margin-left: 1rem;" v-if="title">{{ "- " + title}}</h1>
        </div>
    </div>
</template>

<script>
export default {
  name: "Title",
  props: ['title']
}
</script>

<style>
.title {
    position: absolute;
    top:0px;
    right:0px;
    bottom:0px;
    left:0px;

	height: 145px;
	font-size: 2rem;
	background: var(--dark);
}

.title_group {
	position: relative;
	display: flex;

	margin-left: 6rem;
    top: 2rem;

	color: var(--light);
}

.green {
	color: var(--primary-alt);
}
</style>