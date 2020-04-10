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
  $badge-bg: #FFE69C;

  .count-badge {
    //@extend .count-badge;
    @extend .typo-body-sm;
    display: block;
    background: $badge-bg;
    padding: calcRem(4px) calcRem(15px);
    border-radius: calcRem(20px);
  }
</style>
