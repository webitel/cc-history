<template>
  <wt-app-header>
    <wt-dark-mode-switcher />
    <wt-app-navigator
      :current-app="currentApp"
      :apps="apps"
      :dark-mode="darkMode"
    ></wt-app-navigator>
    <wt-header-actions
      :user="user"
      :build-info="buildInfo"
      @settings="settings"
      @logout="logoutUser"
    />
  </wt-app-header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import authAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/auth';
import WtDarkModeSwitcher from '@webitel/ui-sdk/src/modules/Appearance/components/wt-dark-mode-switcher.vue';

export default {
  name: 'app-header',
  components: { WtDarkModeSwitcher },
  inject: ['$config'],
  data: () => ({
    buildInfo: {
      release: process.env.VUE_APP_PACKAGE_VERSION,
      build: process.env.VUE_APP_BUILD_NUMBER,
    },
  }),
  computed: {
    ...mapState('userinfo', {
      user: (state) => state,
      currentApp: (state) => state.thisApp,
    }),
    ...mapGetters('userinfo', {
      checkAccess: 'CHECK_APP_ACCESS',
    }),
    ...mapGetters('appearance', {
      darkMode: 'DARK_MODE',
    }),
    apps() {
      const agent = {
        name: WebitelApplications.AGENT,
        href: process.env.VUE_APP_AGENT_URL,
      };
      const supervisor = {
        name: WebitelApplications.SUPERVISOR,
        href: process.env.VUE_APP_SUPERVISOR_URL,
      };
      const history = {
        name: WebitelApplications.HISTORY,
        href: process.env.VUE_APP_HISTORY_URL,
      };
      const audit = {
        name: WebitelApplications.AUDIT,
        href: process.env.VUE_APP_AUDIT_URL,
      };
      const admin = {
        name: WebitelApplications.ADMIN,
        href: process.env.VUE_APP_ADMIN_URL,
      };
      const grafana = {
        name: WebitelApplications.ANALYTICS,
        href: process.env.VUE_APP_GRAFANA_URL,
      };
      const crm = {
        name: WebitelApplications.CRM,
        href: process.env.VUE_APP_CRM_URL,
      };
      const apps = [admin, supervisor, agent, history, audit, crm];
      if (this.$config?.ON_SITE) apps.push(grafana);
      return apps.filter(({ name }) => this.checkAccess(name));
    },
  },

  methods: {
    settings() {
      const settingsUrl = process.env.VUE_APP_SETTINGS_URL;
      window.open(settingsUrl);
    },

    async logoutUser() {
      try {
        await authAPI.logout();
        await this.$router.replace('/auth');
      } catch (err) {
        throw err;
      } finally {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-dark-mode-switcher {
  margin-right: auto;
}
</style>
