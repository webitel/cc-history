<template>
  <wt-app-header>
    <app-navigator/>
    <wt-header-actions :user="user" @settings="settings" @logout="logoutUser"/>
  </wt-app-header>
</template>

<script>
import { mapState } from 'vuex';
import AppNavigator from './the-app-navigator.vue';
import APIRepository from '../../../../api/APIRepository';

const authAPI = APIRepository.auth;

export default {
  name: 'app-header',
  components: {
    AppNavigator,
  },

  data: () => ({}),
  computed: {
    ...mapState('userinfo', {
      user: (state) => state,
    }),
  },

  methods: {
    settings() {
      window.open('https://dev.webitel.com/settings');
    },

    async logoutUser() {
      try {
        await authAPI.logout();
        await this.$router.replace('/auth');
      } catch {
      } finally {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
