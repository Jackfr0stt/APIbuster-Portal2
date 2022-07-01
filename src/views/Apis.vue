<template>
    <main class="API-page">
        <Title title="APIs" />

        <!-- API CARDS -->
        <section class="info">
            <!-- <img src="https://codetheweb.blog/assets/img/icon2.png">
            <h1>Learn HTML &mdash; <a href="https://codetheweb.blog/" target="_blank">Code The Web</a></h1> -->
        </section>

        <section class="cards-wrapper">
            <div v-for="api in apis">
                <div class="card-grid-space">
                    <a class="card"
                        style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
                        <div>
                            <h1>{{ api.apiName }}</h1>
                            <p>{{ api.apiDomain }}</p>
                            <div class="tags">
                                <div class="tag">{{ api.apiType }}</div>
                                <router-link class="button" :to="`/apis/${api.id}/methods`">
                                    <span class="text">Open</span>
                                </router-link>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div v-if="expanded">
                <div class="card-grid-space">
                    <a class="card"
                        style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
                        <div>
                            <input type="text" id="apiName" placeholder="API name" class="api-input">
                            <input type="text" id="apiDomain" placeholder="https://<web_link>" class="domain-input">
                            <div class="tags">
                                <div class="tag">
                                    <select id="apiType" class="tag-select">
                                        <option value="REST">REST</option>
                                        <option value="RPC" disabled>RPC</option>
                                    </select>
                                </div>
                                <button class="button" @click="newAPI()">
                                    <span class="text-button">Create</span>
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
    data() {
        return {
            apis: this.created(),
            expanded: false,
        };
    },
    methods: {
        async created() {
            const res = await wrapper(apiService.getAPIs());
            this.apis = res.data;
        },
        async ToggleApi() {
            this.expanded = !this.expanded;
        },
        async newAPI() {
            const API = {
                apiName: document.getElementById("apiName").value,
                apiDomain: document.getElementById("apiDomain").value,
                apiType: document.getElementById("apiType").value
            };

            const res = await wrapper(apiService.newAPI(API));
            this.apis.push(res.data);
            this.expanded = !this.expanded;
        }
    },
    components: { Title }
}

</script>

<style lang="scss">
@import "Apis.scss";
</style>