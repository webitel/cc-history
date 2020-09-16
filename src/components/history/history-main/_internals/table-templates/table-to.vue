<template>
  <div v-if="item.to">
    {{item.to.number}}
  </div>
</template>

<script>
  export default {
    name: 'table-to',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
