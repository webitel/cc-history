<template>
  <span class="count-badge">
    +{{length - 1}}
  </span>
</template>

<script>
  export default {
    name: 'count-badge',
    props: {
      length: {
        type: [Number, String],
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
