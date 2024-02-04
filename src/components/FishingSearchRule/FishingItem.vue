<script setup lang="ts">
  // import RulePicker from '@/components/FishingSearchRule/RulePicker.vue';
  import { keysForSearch } from '@/API/phishStats';
  import { ref, reactive, watchEffect } from 'vue';

  defineProps<{
    item: Phishing.Ruler;
  }>();

  const emit = defineEmits<{
    (e: 'change', item: Phishing.Ruler): void;
    (e: 'delete'): void;
  }>();

  const request = reactive({
    value: '',
    field: 'url',
  });

  const collapsed = ref(true);

  watchEffect(() => {
    emit('change', {
      ...request,
      method: request.value.includes('~') ? 'like' : 'eq',
    });
  });
</script>

<template>
  <v-card
    v-if="!collapsed"
    variant="outlined"
    style="padding: 16px"
  >
    <div style="display: flex; gap: 16px">
      <v-select
        v-model="request.field"
        clearable
        label="Key for search"
        :items="keysForSearch"
      />
      <v-text-field
        v-model="request.value"
        clearable
        label="Value"
      />
    </div>

    <v-card-actions>
      <v-btn
        style="margin-left: auto"
        color="error"
        @click="emit('delete')"
      >
        Delete
      </v-btn>
      <v-btn
        color="primary"
        @click="collapsed = true"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card
    v-else
    style="padding: 16px"
    @click="collapsed = false"
  >
    <div class="request__item">
      ({{ item.field }}, {{ item.method }}, '{{ item.value }}')
    </div>
  </v-card>
</template>

<style scoped lang="scss">
  .request {
    &__item {
      padding: 4px;
      border-radius: 4px;
      font-size: 16px;

      &--field {
        color: #f756ff;
      }

      &--method {
        color: #83d983;
      }

      &--value {
        color: #5742b2;
      }
    }
  }
</style>
