<template>
  <article class="expansion-call-info">
    <h1 class="expansion-heading">{{$t('mainSection.callInfo')}}</h1>
    <ul class="expansion-variables" v-if="item.variables">
      <li
        class="expansion-variable"
        v-for="(variable, key) of variables"
        :key="key"
      >
        <h3 class="expansion-variable__key">{{variable.key}}:</h3>
        <span class="expansion-variable__value">{{variable.value}}</span>
      </li>
    </ul>
  </article>
</template>

<script>
  export default {
    name: 'expansion-call-info',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },

    computed: {
      variables() {
        return Object.keys(this.item.variables)
          .map((key) => ({ key, value: this.item.variables[key] }));
      },
    },
  };
</script>

<style lang="scss" scoped>
  .expansion-heading {
    @extend .typo-heading-sm;
    margin-bottom: (30px);
  }

  .expansion-variable {
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
</style>
