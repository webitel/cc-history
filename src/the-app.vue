<template>
  <router-view />
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'TheApp',

    created() {
      this.setLanguage();
    },

    methods: {
      setLanguage() {
        const lang = localStorage.getItem('lang');
        if (lang) this.$i18n.locale = lang;
      },
    },
  };
</script>

<style lang="scss">
</style>
