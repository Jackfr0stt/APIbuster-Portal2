<template>
    <main class="method-page">
        <Title :title="api.apiname" />


        <!-- API CARDS -->
        <section class="info">
            <!-- <img src="https://codetheweb.blog/assets/img/icon2.png">
            <h1>Learn HTML &mdash; <a href="https://codetheweb.blog/" target="_blank">Code The Web</a></h1> -->
        </section>

        <section class="cards-wrapper">
            <div v-for="method in methods">
                <div class="card-grid-space">
                    <a class="card-method" v-if="!method.edit"
                        style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
                        <div>
                            <h1>{{ method.methodName }}</h1>
                            <div class="methodBody" v-if="method.methodBody != ''">
                                <p>Body: </p>
                                <p>{{ method.methodBody }}</p>
                            </div>
                            <div class="methodHeader" v-if="method.methodHeader != ''">
                                <p>Header: </p>
                                <p>{{ method.methodHeader }}</p>
                            </div>
                            <div class="methodRoute">
                                <p>Route: {{ method.methodRoute }}</p>
                            </div>
                            <div class="tags">
                                <div class="tag">{{ method.methodType }}</div>
                                <router-link class="button" :to="`/methods/${method.id}/testgroups`">
                                    <span class="text">Open</span>
                                </router-link>
                            </div>
                            <span class="material-icons update-method" @click="editMethod(method.id)">edit</span>
                            <span class="material-icons delete-method" @click="delMethod(method.id)">delete</span>
                        </div>
                    </a>
                    <a class="card-method-update" v-if="method.edit">
                        <div>
                            <input type="text" id="updatedMethodName" :placeholder="method.methodName"
                                class="method-input">
                            <textarea type="text" id="updatedMethodHeader"
                                :placeholder="method.methodHeader || 'Method header object'"
                                class="methodHeader-input" />
                            <textarea type="text" id="updatedMethodBody"
                                :placeholder="method.methodBody || 'Method body object'" class="methodBody-input" />
                            <input type="text" id="updatedMethodRoute" :placeholder="method.methodRoute"
                                class="methodRoute-input">
                            <div class="tags">
                                <div class="tag">
                                    <select id="updatedMethodType" class="tag-select">
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PATCH">PATCH</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                </div>
                                <span class="button" @click="updateMethod(method)">Update</span>
                            </div>
                        </div>
                        <span class="material-icons cancel-update" @click="editMethod(method.id)">cancel</span>
                    </a>
                </div>
            </div>

            <div v-if="expanded">
                <div class="card-grid-space">
                    <a class="card-method-update">
                        <div>
                            <input type="text" id="methodName" placeholder="Method name" class="method-input">
                            <textarea type="text" id="methodBody" placeholder="Request methodBody"
                                class="methodBody-input" />
                            <textarea type="text" id="methodHeader" placeholder="Request methodHeader"
                                class="methodHeader-input" />
                            <input type="text" id="methodRoute" placeholder="/<method_route>" class="methodRoute-input">
                            <div class="tags">
                                <div class="tag" style="background: var(--dark-alt);">
                                    <select id="methodType" class="tag-select">
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PATCH">PATCH</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                </div>
                                <button class="button" @click="newMethod()">
                                    <span class="text-button">Create</span>
                                </button>
                            </div>
                            <span class="material-icons cancel-update" @click="ToggleMethod()">cancel</span>
                        </div>
                    </a>
                </div>
            </div>

            <div class="card-grid-space">
                <div class="new-card center" @click="ToggleMethod()">
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
            methods: [],
            expanded: false
        };
    },
    methods: {
        async created() {
            const api = await wrapper(apiService.getAPIById(this.$route.params.id));
            this.api = api.data;
            await this.getMethods();
        },
        async getMethods() {
            // methods filter
            const filter = {
                where: {
                    apiId: this.api.id
                }
            }
            const methods = await wrapper(apiService.getMethods(filter));
            this.methods = methods.data;
            this.methods.forEach(method => {
                method.edit = false;
            });
        },
        async ToggleMethod() {
            this.expanded = !this.expanded;
        },
        async newMethod() {
            const method = {
                methodName: document.getElementById("methodName").value,
                methodRoute: document.getElementById("methodRoute").value,
                methodType: document.getElementById("methodType").value,
                apiId: this.api.id,
                methodBody: document.getElementById("methodBody").value || "",
                methodHeader: document.getElementById("methodHeader").value || "",
            };

            const res = await wrapper(apiService.newMethod(method));
            this.methods.push(res.data);
            this.expanded = !this.expanded;
        },
        async editMethod(id) {
            await this.methods.forEach(method => {
                if (method.id == id) {
                    method.edit = !method.edit;
                }
            });
        },
        async updateMethod(method) {
            const updateMethod = {
                methodName: await document.getElementById("updatedMethodName").value || method.methodName,
                methodHeader: await document.getElementById("updatedMethodHeader").value || method.methodHeader,
                methodBody: await document.getElementById("updatedMethodBody").value || method.methodBody,
                methodRoute: await document.getElementById("updatedMethodRoute").value || method.methodRoute,
                methodType: await document.getElementById("updatedMethodType").value || method.methodType,
            };

            await this.methods.forEach(updated => {
                if (updated.id == method.id) {
                    updated.edit = !updated.edit;
                }
            });

            await wrapper(apiService.updateMethod(method.id, updateMethod));
            const updatedMethod = await wrapper(apiService.getMethodById(method.id));
            if (updatedMethod.error) {
                throw updatedMethod.error;
            }

            if (updatedMethod.data) {
                let count = 0;
                for (let method of this.methods) {
                    if (method.id == updatedMethod.data.id) {
                        this.methods[count] = updatedMethod.data;
                    }
                    count++;
                }
            }
        },
        async delMethod(id) {
            await wrapper(apiService.delMethod(id));
            location.reload();
        }
    },
    components: { Title }
}
</script>

<style lang="scss">
@import "Methods.scss";

.update-method {
    position: absolute;
    top: 0.75em;
    right: 1em;
    margin: none;
    font-size: 1.25em;

    &:hover {
        cursor: pointer;
    }
}

.cancel-update {
    position: absolute;
    opacity: 0.8;
    top: 0.75em;
    right: 1em;
    margin: none;
    font-size: 1.25em;
    color: var(--color);

    &:hover {
        cursor: pointer;
    }
}

.delete-method {
    position: absolute;
    top: 2em;
    right: 0.75em;
    margin: none;
    font-size: 1.5em;

    &:hover {
        cursor: pointer;
    }
}
</style>