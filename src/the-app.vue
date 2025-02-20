<template>
  <router-view />
</template>

<script lang="ts" setup>
import { provide, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const store = useStore();
const darkMode = computed(() => store.getters['appearance/DARK_MODE']);
provide('darkMode', darkMode);

const { locale } = useI18n();


const setLanguage = () => {
  const lang = localStorage.getItem('lang');
  if (lang) {
    locale.value = lang;
  }
};

onMounted(() => {
  setLanguage();
});
</script>

<style lang="scss">
</style>
