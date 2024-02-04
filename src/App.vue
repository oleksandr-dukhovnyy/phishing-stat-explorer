<script setup lang="ts">
  import BottomNavs from './components/BottomNavs.vue';
</script>

<template>
  <v-layout>
    <main>
      <router-view />
    </main>
    <BottomNavs />
  </v-layout>
</template>

<style scoped lang="scss">
  main {
    width: 100%;
    max-width: 1900px;
    min-height: calc(100vh - 120px);
    margin: 32px auto 84px;
    padding: 16px;
    border-radius: 4px;

    // background-color: #fff;
    // box-shadow:
    //   0 2px 4px -1px rgba(0, 0, 0, 20%),
    //   0 4px 5px 0 rgba(0, 0, 0, 14%),
    //   0 1px 10px 0 rgba(0, 0, 0, 12%);
  }
</style>
