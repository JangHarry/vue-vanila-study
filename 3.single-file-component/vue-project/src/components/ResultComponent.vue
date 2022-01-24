<template>
  <div v-if="data.length">
    <ul>
      <li :key="index" v-for="(item, index) in data">
        <img :src="item.image" /> {{ item.name }}
      </li>
    </ul>
  </div>
  <div v-else>{{ query }} 검색어로 찾을 수 없습니다.</div>
</template>

<script>
export default {
  props: ["data", "query"]
};
</script>
