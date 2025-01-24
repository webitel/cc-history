<template>
  <router-view />
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const darkMode = computed(() => store.getters['appearance/DARK_MODE']);
provide('darkMode', darkMode);

const setLanguage = () => {
  const lang = localStorage.getItem('lang');
  if (lang) this.$i18n.locale = lang;
};

setLanguage();
</script>

<style lang="scss">
</style>
