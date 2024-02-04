<script setup lang="ts">
  import { ref } from 'vue';
  import { usePhishingStore } from '@/stores/phishing';

  const phishingStore = usePhishingStore();

  const emit = defineEmits<{
    (e: 'go-to-results'): void;
  }>();

  const request = ref('_where=(title,like,~apple~)&_sort=-id');
  const loading = ref(false);

  async function makeRequest() {
    loading.value = true;

    await phishingStore.RAW_FETCH(request.value);

    emit('go-to-results');

    loading.value = false;
  }
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <v-progress-linear
      v-if="loading"
      indeterminate
    />

    <p style="display: flex; flex-direction: column; gap: 8px">
      <a
        href="https://github.com/o1lab/xmysql?tab=readme-ov-file#row-filtering--where"
        >Xmysql syntax tips</a
      >
      <a href="https://phishstats.info#apidoc"> PhishStats API docs </a>
    </p>

    <v-textarea
      v-model.lazy="request"
      label="Label"
    />

    <!-- <pre>{{ request }}</pre> -->

    <v-btn
      :disabled="!request.length || loading"
      color="primary"
      style="width: 200px"
      @click="makeRequest"
    >
      Request data
    </v-btn>
  </div>
</template>
