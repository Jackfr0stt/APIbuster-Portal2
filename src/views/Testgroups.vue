<template>
    <main class="testgroups-page">
        <Title :title="endpoint.method" />

        <section class="info">
            <!-- <img src="https://codetheweb.blog/assets/img/icon2.png">
            <h1>Learn HTML &mdash; <a href="https://codetheweb.blog/" target="_blank">Code The Web</a></h1> -->
        </section>

        <section class="cards-wrapper">
            <div v-for="testgroup in testgroups">
                <div class="card-grid-space">
                    <a class="card-testgroup"
                        style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
                        <div>
                            <h1>{{ testgroup.testgroupname }}</h1>
                            <div class="tags" style="margin-bottom: 1em;">
                                <router-link class="button" :to="`/testgroups/${testgroup.id}/tests`">
                                    <span class="text">Open</span>
                                </router-link>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div v-if="expanded">
                <div class="card-grid-space">
                    <a class="card-testgroup"
                        style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
                        <div>
                            <input type="text" id="groupname" placeholder="Test group name" class="name-input">
                            <div class="tags" style="margin-bottom: 1em;">
                                <button class="button" @click="newTestgroup()">
                                    <span class="text-button">Create</span>
                                </button>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div class="card-grid-space">
                <div class="new-card center" @click="ToggleTestgroup()">
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
            // testgroups filter
            const filter = {
                where: {
                    endpointId: this.endpoint.id
                }
            }
            const testgroups = await wrapper(apiService.getTestgroups(filter));
            this.testgroups = testgroups.data;
        },
        async ToggleTestgroup() {
            this.expanded = !this.expanded;
        },
        async newTestgroup() {
            const testgroup = {
                endpointId: this.endpoint.id,
                testgroupname: document.getElementById("groupname").value
            };

            const res = await wrapper(apiService.newTestgroup(testgroup));
            this.testgroups.push(res.data);
            console.log(this.testgroups);
            this.expanded = !this.expanded;
        }
    },
    components: { Title }
}
</script>

<style lang="scss">
@import "Testgroups.scss";
</style>