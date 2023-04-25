<template>
  <section class="call-evaluation-result">
    <div class="call-evaluation-result__wrap">
      <div class="call-evaluation-result__scorecard-info"></div>
      <div class="call-evaluation-result__answers"></div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'call-evaluation-result',
  components: {
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
  }),
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
