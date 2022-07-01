<template>
    <main class="testgroups-page">
        <Title :title="method.methodName" />

        <section class="info">
            <!-- <img src="https://codetheweb.blog/assets/img/icon2.png">
            <h1>Learn HTML &mdash; <a href="https://codetheweb.blog/" target="_blank">Code The Web</a></h1> -->
        </section>

        <section class="cards-wrapper">
            <div v-for="testgroup in testgroups">
                <!-- The Modal -->
                <div class="modal" :id="testgroup.id">
                    <!-- Modal content -->
                    <div class="modal-wrapper modal-content">
                        <span class="material-icons close" @click="ToggleTestgroupTests(testgroup.id)">cancel</span>
                        <!-- actual content -->
                        <p>{{ testgroup }}</p>
                    </div>
                </div>
                <div class="card-grid-space">
                    <a class="card-testgroup"
                        style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
                        <div>
                            <h1>{{ testgroup.testGroupName }}</h1>
                            <div class="tags" style="margin-bottom: 1em;">
                                <router-link class="button" :to="`/testgroups/${testgroup.id}/tests`">
                                    <span class="text">Open</span>
                                </router-link>
                                <span class="material-icons visibility" v-if="expandedTests == false"
                                    @click="ToggleTestgroupTests(testgroup.id)">visibility</span>
                                <span class="material-icons visibility" v-if="expandedTests == true"
                                    @click="ToggleTestgroupTests(testgroup.id)">visibility_off</span>
                                <span class="material-icons play" @click="runTestgroup(testgroup.id)">play_arrow</span>
                                <span class="material-icons delete" @click="runTestgroup(testgroup.id)">delete</span>
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
                            <input type="text" id="groupName" placeholder="Test group name" class="name-input">
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
            method: this.created(),
            testgroups: [],
            expanded: false,
            expandedTests: false
        };
    },
    methods: {
        async created() {
            const method = await wrapper(apiService.getMethodById(this.$route.params.id));
            this.method = method.data;
            await this.getTestgroups();
        },
        async getTestgroups() {
            // testgroups filter
            const filter = {
                where: {
                    methodId: this.method.id
                }
            }
            const testgroups = await wrapper(apiService.getTestgroups(filter));
            this.testgroups = testgroups.data;
        },
        async ToggleTestgroup() {
            this.expanded = !this.expanded;
        },
        async ToggleTestgroupTests(id) {
            this.expandedTests = !this.expandedTests;
            this.expandCard(id);
        },
        async newTestgroup() {
            const testgroup = {
                methodId: this.method.id,
                testGroupName: document.getElementById("groupName").value
            };

            const res = await wrapper(apiService.newTestgroup(testgroup));
            this.testgroups.push(res.data);
            this.expanded = !this.expanded;
        },
        async runTestgroup(id) {
            const res = await wrapper(apiService.runTestgroup(id));
            if (res.error) {
                throw res.error;
            }
            this.expandCard(id);
        },
        async expandCard(id) {
            const modal = document.getElementById(`${id}`);

            // When the user clicks the button, open the modal
            if (modal.style.display == "block") {
                modal.style.display = "none";
            }

            // When the user clicks on <span> (x), close the modal
            else if (modal.style.display = "none") {
                modal.style.display = "block";
            }
        }
    },
    components: { Title }
}
</script>

<style lang="scss">
@import "Testgroups.scss";

/* The Modal (background) */
.modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    padding-top: 100px;
    /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    width: 80%;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
</style>