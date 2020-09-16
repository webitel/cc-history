<template>
  <wt-app-header>
    <wt-app-navigator :current-app="currentApp" :apps="apps"></wt-app-navigator>
    <wt-header-actions :user="user" @settings="settings" @logout="logoutUser"/>
  </wt-app-header>
</template>

<script>
import { mapState } from 'vuex';
import APIRepository from '../../../../api/APIRepository';

const authAPI = APIRepository.auth;

export default {
  name: 'app-header',

  data: () => ({
    currentApp: 'history',
    apps: {
      agent: { href: process.env.VUE_APP_AGENT_URL },
      supervisor: { href: process.env.VUE_APP_SUPERVISOR_URL },
      history: { href: process.env.VUE_APP_HISTORY_URL },
      audit: { href: process.env.VUE_APP_AUDIT_URL },
      admin: { href: process.env.VUE_APP_ADMIN_URL },
      grafana: { href: process.env.VUE_APP_GRAFANA_URL },
    },
  }),
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
