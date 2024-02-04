<script setup lang="ts">
  import { ref } from 'vue';
  import { usePhishingStore } from '@/stores/phishing';
  import { keysForSearch } from '@/API/phishStats';
  import FishingItem from '@/components/FishingSearchRule/FishingItem.vue';
  import FishingJoiner from '@/components/FishingSearchRule/FishingJoiner.vue';

  const emit = defineEmits<{
    (e: 'go-to-results'): void;
  }>();

  const phishingStore = usePhishingStore();
  const sortBy = ref<keyof Phishing.Item>('date');
  const limit = ref<number>(10);

  const loading = ref(false);

  const updateRuler = (payload: Phishing.Ruler, i: number) => {
    phishingStore.UPDATE_RULER(i, payload);
  };

  const updateJoiner = (payload: Phishing.Joiner, i: number) => {
    phishingStore.UPDATE_JOINER(i, payload);
  };

  const addRule = () => {
    phishingStore.ADD_RULER({
      value: '',
      field: 'url',
    });
  };

  const addJoiner = () => {
    phishingStore.ADD_JOINER({
      value: 'and',
    });
  };

  async function makeRequest() {
    loading.value = true;

    await phishingStore.FETCH({
      sort: sortBy.value,
      limit: limit.value,
    });

    emit('go-to-results');

    loading.value = false;
  }

  const lengthRule = (min: number, max: number) => (n: number) =>
    (n >= min && n <= max) || `Enter number from ${min} to ${max}`;
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 600px;
      margin: 0 auto;
    "
  >
    <v-progress-linear
      v-if="loading"
      indeterminate
    />

    <div style="display: flex; gap: 16px">
      <v-select
        v-model="sortBy"
        clearable
        :disabled="loading"
        label="Sort by"
        :items="['', ...keysForSearch]"
      />

      <v-text-field
        v-model.number="limit"
        :rules="[lengthRule(5, 50)]"
        clearable
        :disabled="loading"
        label="Limit"
        max="50"
        min="5"
        hint="Enter number from 5 to 50"
      />
    </div>
    <div
      v-for="(rule, i) in phishingStore.REQUEST"
      :key="i"
    >
      <FishingItem
        v-if="rule.type === 'rule'"
        :item="rule"
        @change="(payload) => updateRuler(payload, i)"
        @delete="() => phishingStore.DELETE_ITEM(i)"
      />

      <FishingJoiner
        v-else
        :joiner="rule"
        @change="(payload) => updateJoiner(payload, i)"
        @delete="() => phishingStore.DELETE_ITEM(i)"
      />
    </div>

    <v-btn
      v-if="phishingStore.NEXT_ACTION === 'add-rule'"
      @click="addRule"
    >
      add rule
    </v-btn>
    <v-btn
      v-else
      @click="addJoiner"
    >
      add joiner
    </v-btn>

    <v-btn
      :disabled="!phishingStore.REQUEST.length || loading"
      color="primary"
      @click="makeRequest"
    >
      Request data
    </v-btn>
  </div>
</template>
