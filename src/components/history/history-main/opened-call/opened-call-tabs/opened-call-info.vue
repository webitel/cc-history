<template>
  <section class="opened-call-info">
    <h2 class="call-info-heading">{{$t('openedCall.callInfo')}}</h2>
    <ul class="call-info-variables" v-if="mainCall.variables">
      <li
        class="call-info-variable"
        v-for="(variable, key) of variables"
        :key="key"
      >
        <h3 class="call-info-variable__key">{{variable.key}}:</h3>
        <span class="call-info-variable__value">{{variable.value}}</span>
      </li>
    </ul>
    <div v-else class="call-info-variables__empty-variables">
      {{$t('openedCall.noVariables')}}
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'opened-call-info',
    components: {},
    mixins: [],

    computed: {
      ...mapState('history/opened-call', {
        mainCall: (state) => state.mainCall,
      }),

      variables() {
        return Object.keys(this.mainCall.variables)
          .map((key) => ({ key, value: this.mainCall.variables[key] }));
      },
    },
  };
</script>

<style lang="scss" scoped>
  .call-info-heading {
    @extend .typo-heading-sm;
    margin-bottom: 30px;
  }

  .call-info-variable {
    display: flex;
    align-items: center;

    &__key {
      @extend .typo-heading-xs;
    }

    &__value {
      @extend .typo-body-sm;
      margin-left: (5px);
    }
  }

  .call-info-variables__empty-variables {
    @extend .typo-body-sm;
  }
</style>
