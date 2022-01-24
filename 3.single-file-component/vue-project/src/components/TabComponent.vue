<template>
  <ul class="tabs">
    <li
      :key="index"
      @click="onClickTab(tab)"
      v-for="(tab, index) in tabs"
      :class="{ active: tab === selectedTab }"
    >
      {{ tab }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ["tabs", "selectedTab"],
  data() {
    return {
      selected: this.selectedTab
    };
  },

  methods: {
    onClickTab(tab) {
      this.$emit("@change", tab);
    }
  }
};
</script>

<style></style>
