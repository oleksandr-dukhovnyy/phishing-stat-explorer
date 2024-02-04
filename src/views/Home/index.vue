<script setup lang="ts">
  import { ref } from 'vue';

  import RequestBuilder from './RequestBuilder.vue';
  import RequestResults from './RequestResults.vue';
  import ManualInput from './ManualInput.vue';
  import Info from './Info.vue';

  const tab = ref<'builder' | 'manual' | 'results' | 'info'>('builder');
</script>

<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="transparent"
    >
      <v-tab value="builder">Request builder</v-tab>
      <v-tab value="manual">Manual request input</v-tab>
      <v-tab value="results">Request results</v-tab>
      <v-tab value="info">Info</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="builder">
          <RequestBuilder @go-to-results="tab = 'results'" />
        </v-window-item>

        <v-window-item value="manual">
          <ManualInput @go-to-results="tab = 'results'" />
        </v-window-item>

        <v-window-item value="results">
          <RequestResults />
        </v-window-item>

        <v-window-item value="info">
          <Info />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
