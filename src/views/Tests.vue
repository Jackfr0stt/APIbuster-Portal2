<template>
  <main class="tests-page">
    <Title :title="testgroup.testgroupname" />

    <section class="info">
      <!-- <img src="https://codetheweb.blog/assets/img/icon2.png">
            <h1>Learn HTML &mdash; <a href="https://codetheweb.blog/" target="_blank">Code The Web</a></h1> -->
    </section>

    <section class="test-cards-wrapper">
      <div v-for="test in tests">
        <div class="card-grid-space">
          <a class="card-test"
            style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
            <div>
              <h1>{{ test.testName }}</h1>
              <!-- <div class="tags" style="margin-bottom: 1em;">
                <router-link class="button" :to="`/testgroups/${test.id}/tests`">
                  <span class="text">Open</span>
                </router-link>
              </div> -->
              <div class="body" v-if="test.testBody != ''">
                <p>Body: </p>
                <p>{{ test.testbody }}</p>
              </div>
              <div class="expect" v-if="test.testExpect != ''">
                <p>Expect: </p>
                <p>{{ test.testExpect }}</p>
              </div>
              <div class="tags">
                <div class="tag">{{ test.testType }}</div>
                <span class="material-icons play-test" @click="runTest(test.id)">play_arrow</span>
                <span class="material-icons update-test" @click="updateTest(test.id)">edit</span>
                <span class="material-icons delete-test" @click="delMethod(method.id)">delete</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div v-if="expanded">
        <div class="card-grid-space">
          <a class="card-test"
            style="--bg-img: url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/html-syntax/cover.jpg')">
            <div>
              <input type="text" id="testname" placeholder="Test name" class="name-input">
              <div class="tags">
                <div class="tag" style="background: var(--dark-alt);">
                  <select id="type" class="tag-select">
                    <optgroup label="Functional">
                      <option value="Acceptance">Acceptance</option>
                      <option value="Integration">Integration</option>
                      <option value="Unit">Unit</option>
                    </optgroup>
                    <optgroup label="Non-functional">
                      <option value="Performance">Performance</option>
                    </optgroup>
                  </select>
                </div>
                <button class="button" @click="newTest()">
                  <span class="text-button">Create</span>
                </button>
                <textarea type="text" id="body" placeholder="Test body" class="body-input" />
                <textarea type="text" id="expect" placeholder="Test expect" class="expect-input" />
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="card-grid-space">
        <div class="new-card center" @click="ToggleTest()">
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
      testgroup: this.created(),
      tests: [],
      expanded: false
    };
  },
  methods: {
    async created() {
      const testgroup = await wrapper(apiService.getTestgroupById(this.$route.params.id));
      this.testgroup = testgroup.data;
      await this.getTests();
    },
    async getTests() {
      // tests filter
      const filter = {
        where: {
          test_groupId: this.testgroup.id
        }
      }

      const tests = await wrapper(apiService.getTests(filter));
      this.tests = tests.data;
    },
    async ToggleTest() {
      this.expanded = !this.expanded;
    },
    async newTest() {
      const test = {
        test_groupId: this.testgroup.id,
        testName: document.getElementById("testname").value,
        testType: document.getElementById("type").value,
        testBody: document.getElementById("body").value || "",
        testExpect: document.getElementById("expect").value || "",
        discriminator: ''
      };

      if (test.testType == 'Performance') {
        test.discriminator = 'Non-functional';
      } else {
        test.discriminator = 'Functional';
      }

      const res = await wrapper(apiService.newTest(test));
      this.tests.push(res.data);
      this.expanded = !this.expanded;
    },
    async runTest(testid) {
      const res = await wrapper(apiService.runTest(testid));
    },
    async delTest(id) {
      await wrapper(apiService.delTest(id));
      location.reload();
    }
  },
  components: { Title }
}
</script>

<style lang="scss">
@import "Tests.scss";

.delete-test {
  position: absolute;
  top: 4em;
  right: 1em;
  font-size: 1.25em;
  margin: none;

  &:hover {
    cursor: pointer;
  }
}

.play-test {
  position: absolute;
  top: 0.75em;
  right: 0.75em;
  font-size: 1.5em;
  margin: none;

  &:hover {
    cursor: pointer;
  }
}

.update-test {
  position: absolute;
  top: 2.5em;
  right: 1em;
  margin: none;
  font-size: 1.25em;

  &:hover {
    cursor: pointer;
  }
}
</style>