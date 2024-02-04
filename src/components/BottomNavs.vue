<script setup lang="ts">
  import { ref } from 'vue';

  const navs = [
    {
      label: 'Detector',
      icon: 'fish',
      disabled: false,
    },
    {
      label: 'Saved',
      icon: 'format-list-bulleted-square',
      disabled: true,
    },
    {
      label: 'Account',
      icon: 'account-circle',
      disabled: true,
    },
  ];

  const value = ref(0);
</script>

<template>
  <v-bottom-navigation v-model="value">
    <v-btn
      v-for="nav in navs"
      :key="nav.label"
      :disabled="nav.disabled"
    >
      <v-icon :icon="`mdi-${nav.icon}`" />

      <span>{{ nav.label }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>
