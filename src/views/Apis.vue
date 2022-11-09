<template>
  <main class="API-page">
    <Title title="API" />

    <!-- API CARDS -->
    <section class="info">
      <!-- <img src="https://codetheweb.blog/assets/img/icon2.png">
            <h1>Learn HTML &mdash; <a href="https://codetheweb.blog/" target="_blank">Code The Web</a></h1> -->
    </section>

    <section class="cards-wrapper">
      <div v-for="api in apis">
        <div class="card-grid-space">
          <a
            class="card"
            v-if="!api.edit"
            style="
              --bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg');
            "
          >
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
            <span class="material-icons update-api" @click="editAPI(api.id)"
              >edit</span
            >
            <span class="material-icons delete-api" @click="delAPI(api.id)"
              >delete</span
            >
          </a>
          <a class="card-update" v-if="api.edit">
            <div>
              <input
                type="text"
                id="updatedApiName"
                :placeholder="api.apiName"
                class="api-input"
              />
              <input
                type="text"
                id="updatedApiDomain"
                :placeholder="api.apiDomain"
                class="domain-input"
              />
              <div class="tags">
                <div class="tag">
                  <select id="updatedApiType" class="tag-select">
                    <option value="REST">REST</option>
                    <option value="RPC" disabled>RPC</option>
                  </select>
                </div>
                <span class="button" @click="updateAPI(api)">Update</span>
              </div>
            </div>
            <span class="material-icons cancel-update" @click="editAPI(api.id)"
              >cancel</span
            >
          </a>
        </div>
      </div>

      <div v-if="expanded">
        <div class="card-grid-space">
          <a class="card-update">
            <div>
              <input
                type="text"
                id="apiName"
                placeholder="API name"
                class="api-input"
              />
              <input
                type="text"
                id="apiDomain"
                placeholder="https://<web_link>"
                class="domain-input"
              />
              <div class="tag" style="margin-bottom: 0.2em">
                <input type="file" @change="uploadFile()" ref="file" />
              </div>
              <div class="tags">
                <div class="tag">
                  <select id="apiType" class="tag-select">
                    <option value="REST">REST</option>
                    <option value="RPC" disabled>RPC</option>
                  </select>
                </div>
                <span class="button" @click="newAPI()">Create</span>
              </div>
            </div>
            <span class="material-icons cancel-update" @click="ToggleApi()"
              >cancel</span
            >
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
import Title from "../components/Title.vue";
import { wrapper } from "../utils/wrapper";
import ApiService from "../services/Apiservice";

let apiService = new ApiService();

export default {
  data() {
    return {
      apis: this.created(),
      file: "",
      expanded: false,
    };
  },
  methods: {
    async created() {
      const res = await wrapper(apiService.getAPIs());
      this.apis = res.data || [];
      console.log(this.apis);
      this.apis.forEach((api) => {
        api.edit = false;
      });
    },
    async ToggleApi() {
      this.expanded = !this.expanded;
    },
    async newAPI() {
      const API = {
        apiName: document.getElementById("apiName").value,
        apiDomain: document.getElementById("apiDomain").value,
        apiType: document.getElementById("apiType").value,
      };

      const res = await wrapper(apiService.newAPI(API));
      this.apis.push(res.data);

      await this.submitFile(res.data.id);

      this.expanded = !this.expanded;
    },
    async uploadFile() {
      this.file = this.$refs.file.files[0];
    },
    async editAPI(id) {
      await this.apis.forEach((api) => {
        if (api.id == id) {
          api.edit = !api.edit;
        }
      });
    },
    async updateAPI(api) {
      const updateAPI = {
        apiName:
          (await document.getElementById("updatedApiName").value) ||
          api.apiName,
        apiDomain:
          (await document.getElementById("updatedApiDomain").value) ||
          api.apiDomain,
        apiType:
          (await document.getElementById("updatedApiType").value) ||
          api.apiType,
      };

      await this.apis.forEach((API) => {
        if (API.id == api.id) {
          API.edit = !API.edit;
        }
      });

      await wrapper(apiService.updateAPI(api.id, updateAPI));
      const updatedAPI = await wrapper(apiService.getAPIById(api.id));
      if (updatedAPI.error) {
        throw updatedAPI.error;
      }

      if (updatedAPI.data) {
        let count = 0;
        for (let api of this.apis) {
          if (api.id == updatedAPI.data.id) {
            this.apis[count] = updatedAPI.data;
          }
          count++;
        }
      }
    },
    async submitFile(id) {
      let formData = new FormData();
      formData.append("file", this.file);
      await wrapper(apiService.sendFile(id, formData));
    },
    async delAPI(id) {
      await wrapper(apiService.delAPI(id));
      location.reload();
    },
  },
  components: { Title },
};
</script>

<style lang="scss">
@import "Apis.scss";

.update-api {
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

.delete-api {
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