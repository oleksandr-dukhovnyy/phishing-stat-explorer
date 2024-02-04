<script setup lang="ts">
  import { usePhishingStore } from '@/stores/phishing';

  const phishingStore = usePhishingStore();
</script>

<template>
  <div>
    <v-data-table
      multi-sort
      sticky
      :items="phishingStore.RESULTS.list"
    />
  </div>
</template>
