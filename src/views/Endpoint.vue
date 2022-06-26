<template>
	<main class="endpoint-page">
		<Title :title="endpoint.method" />
		
        
        <!-- API CARDS -->
        <section class="info">
            <!-- <img src="https://codetheweb.blog/assets/img/icon2.png">
            <h1>Learn HTML &mdash; <a href="https://codetheweb.blog/" target="_blank">Code The Web</a></h1> -->
        </section>

        <section class="cards-wrapper">
            <div v-for="testgroup in testgroups">
                <div class="card-grid-space">
                    <a class="card" style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
                        <div>
                            <h1>{{testgroup.testgroupname}}</h1>
                            <!-- <p>{{testgroup.route}}</p> -->
                            <div class="tags">
                                <div class="tag">{{testgroup.duration}}</div>
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
                    <a class="card" style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
                        <div>
                            <input type="text" id="apiname" placeholder="API name" class="api-input">
                            <input type="text" id="domain" placeholder="https://<web_link>" class="domain-input">
                            <div class="tags">
                                <div class="tag">
                                    <select id="apitype" class="tag-select">
                                        <option value="REST">REST</option>
                                        <option value="RPC" disabled>RPC</option>
                                    </select>
                                </div>
                                <button class="button" @click="newAPI()">
                                    <span class="text">Create</span>
                                </button>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div class="card-grid-space">
                <div class="new-card center" @click="ToggleApi()">
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
            endpoint: this.created(),
            testgroups: [],
            expanded: false
        };
    },
    methods: {
        async created() {
            const endpoint = await wrapper(apiService.getEndpointById(this.$route.params.id));
            this.endpoint = endpoint.data;
            await this.getTestgroups();
        },
        async getTestgroups() {
            // endpoints filter
            const filter = {
                where: {
                    endpointid: this.endpoint.id
                }
            }
            const testgroups = await wrapper(apiService.getTestgroups(filter));
            this.testgroups = testgroups.data;
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