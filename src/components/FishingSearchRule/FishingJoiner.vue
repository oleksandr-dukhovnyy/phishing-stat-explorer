<script setup lang="ts">
  import { watchEffect } from 'vue';
  import { ref } from 'vue';

  const props = defineProps<{
    joiner: Phishing.Joiner;
  }>();

  const emit = defineEmits<{
    (e: 'change', joiner: Phishing.Joiner): void;
    (e: 'delete'): void;
  }>();

  const value = ref(props.joiner.value);
  const collapsed = ref(true);

  watchEffect(() => {
    if (value.value !== props.joiner.value) {
      emit('change', {
        value: value.value,
      });
    }
  });
</script>

<template>
  <v-card
    v-if="!collapsed"
    variant="outlined"
    style="padding: 16px"
  >
    <v-select
      v-model="value"
      label="Joiner"
      :items="['and', 'or']"
    />
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
    {{ joiner.value }}
  </v-card>
</template>
