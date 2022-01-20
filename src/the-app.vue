<template>
  <router-view/>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'the-app',

    created() {
      this.openSession();
      this.setLanguage();
    },

    methods: {
      ...mapActions('userinfo', {
        openSession: 'OPEN_SESSION',
      }),

      setLanguage() {
        const lang = localStorage.getItem('lang');
        if (lang) this.$i18n.locale = lang;
      },
    },
  };
</script>

<style lang="scss">
</style>
