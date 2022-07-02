<template>
  <main v-if="hasAccess" class="the-history">
    <app-header/>
    <wt-notifications-bar/>
    <wt-page-wrapper>
      <template slot="header">
        <history-heading/>
      </template>
      <template slot="actions-panel">
        <history-filters/>
      </template>
      <template slot="main">
        <history-main/>
      </template>
    </wt-page-wrapper>
  </main>
  <wt-error-page v-else type="403" @back="goToApplicationHub"></wt-error-page>
</template>

<script>
import { mapGetters } from 'vuex';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import AppHeader from './shared/app-header/app-header.vue';
import HistoryHeading from '../../modules/heading/components/the-history-heading.vue';
import HistoryFilters from '../../modules/filters/components/the-history-filters.vue';
import HistoryMain from '../../modules/main/components/the-history-main.vue';

export default {
  name: 'the-history',
  components: {
    AppHeader,
    HistoryHeading,
    HistoryFilters,
    HistoryMain,
  },

  computed: {
    ...mapGetters('userinfo', {
      checkAppAccess: 'CHECK_APP_ACCESS',
    }),
    hasAccess() {
      return this.checkAppAccess(WebitelApplications.HISTORY);
    },
  },

  methods: {
    goToApplicationHub() {
      const adminUrl = process.env.VUE_APP_APPLICATION_HUB_URL;
      window.location.href = adminUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
.the-history {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
