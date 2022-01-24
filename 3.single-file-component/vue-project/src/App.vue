<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form
        :value="query"
        v-on:@submit="onSubmit"
        v-on:@reset="onReset"
      ></search-form>
    </div>
    <div class="content">
      <div v-if="submitted">
        <search-result :query="query" :data="searchResult"></search-result>
      </div>
      <div v-else>
        <tabs
          :tabs="tabs"
          :selected-tab="selectedTab"
          v-on:@change="onClickTab"
        ></tabs>
        <div v-if="selectedTab === tabs[0]">
          <list
            :data="keywords"
            type="keywords"
            v-on:@click="onClickKeyword"
          ></list>
        </div>
        <div v-else>
          <list
            :data="history"
            type="history"
            v-on:@click="onClickKeyword"
            v-on:@remove="onClickRemoveHistory"
          ></list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchModel from "./models/SearchModel.js";
import KeywordModel from "./models/KeywordModel.js";
import HistoryModel from "./models/HistoryModel.js";

import FormComponent from "./components/FormComponent.vue";
import ListComponent from "./components/ListComponent.vue";
import ResultComponent from "./components/ResultComponent.vue";
import TabComponent from "./components/TabComponent.vue";

export default {
  name: "app",
  data() {
    return {
      query: "",
      searchResult: [],
      submitted: false,
      tabs: ["추천 검색어", "최근 검색어"],
      selectedTab: "",
      keywords: [],
      history: []
    };
  },
  components: {
    "search-form": FormComponent,
    "search-result": ResultComponent,
    list: ListComponent,
    tabs: TabComponent
  },
  created() {
    this.selectedTab = this.tabs[0];
    this.fetchKeyword();
    this.fethcHistory();
  },
  methods: {
    onSubmit(query) {
      this.query = query;
      this.search();
    },
    onReset() {
      this.query = "";
      this.searchResult = [];
      this.submitted = false;
    },
    onClickTab(tab) {
      this.selectedTab = tab;
    },
    onClickKeyword(keyword) {
      this.query = keyword;
      this.search();
    },
    onClickRemoveHistory(keyword) {
      HistoryModel.remove(keyword);
      this.fethcHistory();
    },
    fethcHistory() {
      HistoryModel.list().then(data => {
        this.history = data;
      });
    },
    fetchKeyword() {
      KeywordModel.list().then(data => {
        this.keywords = data;
      });
    },
    search() {
      SearchModel.list().then(data => {
        this.submitted = true;
        this.searchResult = data;
      });

      HistoryModel.add(this.query);
      this.fethcHistory();
    }
  }
};
</script>
