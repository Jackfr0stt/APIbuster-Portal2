<template>
	<main class="api-page">
		<Title :title="api.apiname" />
		
        
        <!-- API CARDS -->
        <section class="info">
            <!-- <img src="https://codetheweb.blog/assets/img/icon2.png">
            <h1>Learn HTML &mdash; <a href="https://codetheweb.blog/" target="_blank">Code The Web</a></h1> -->
        </section>

        <section class="cards-wrapper">
            <div v-for="endpoint in endpoints">
                <div class="card-grid-space">
                    <a class="card" style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
                        <div>
                            <h1>{{endpoint.method}}</h1>
                            <p>{{endpoint.route}}</p>
                            <div class="tags">
                                <div class="tag">{{endpoint.endpointtype}}</div>
                                <router-link class="button" :to="`/endpoints/${endpoint.id}`">
                                    <span class="text">Open</span>
                                </router-link>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div v-if="expanded">
                <div class="card-grid-space">
                    <a class="card" >
                        <div>
                            <input type="text" id="method" placeholder="Endpoint name" class="endpoint-input">
                            <input type="text" id="route" placeholder="/<endpoint_name>" class="domain-input">
                            <div class="tags">
                                <div class="tag" style="background: var(--dark-alt);">
                                    <select id="endpointtype" class="tag-select">
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PATCH">PATCH</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                </div>
                                <button class="button" @click="newEndpoint()">
                                    <span class="text-button">Create</span>
                                </button>
                            </div>
                            <textarea type="text" id="body" placeholder="Request body" class="body-input" />
                            <textarea type="text" id="header" placeholder="Request header" class="header-input" />
                        </div>
                    </a>
                </div>
            </div>

            <div class="card-grid-space">
                <div class="new-card center" @click="ToggleEndpoint()">
                    <span class="material-icons" v-if="!expanded">add_circle</span>
                </div>
            </div>
        </section>
	</main>
</template>

<script>
import Title from '../components/Title.vue'
import { wrapper } from '../utils/wrapper';
import ApiService from '../services/Apiservice';

let apiService = new ApiService();

export default {
    props: ['id'],
    data() {
        return {
            api: this.created(),
            endpoints: [],
            expanded: false
        };
    },
    methods: {
        async created() {
            const api = await wrapper(apiService.getAPIById(this.$route.params.id));
            this.api = api.data;
            await this.getEndpoints();
        },
        async getEndpoints() {
            // endpoints filter
            const filter = {
                where: {
                    apiid: this.api.id
                }
            }
            const endpoints = await wrapper(apiService.getEndpoints(filter));
            this.endpoints = endpoints.data;
        },
        async ToggleEndpoint() {
            this.expanded = !this.expanded;
        },
        async newEndpoint() {
            const endpoint = {
                method: document.getElementById("method").value,
                route: document.getElementById("route").value,
                endpointtype: document.getElementById("endpointtype").value,
                apiid: this.api.id,
                body: document.getElementById("body").value || null,
                header: document.getElementById("header").value || null,
            };

            const res = await wrapper(apiService.newEndpoint(endpoint));
            this.endpoints.push(res.data);
            this.expanded = !this.expanded;
        }
    },
    components: { Title }
}
</script>

<!-- <style>
.view_text {
	margin-top: 10rem;
	font-size: 1.5rem;
}
</style> -->

<style lang="scss">
@import "Api.scss";
</style>