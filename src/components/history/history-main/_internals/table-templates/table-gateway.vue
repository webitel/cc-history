<template>
  <div v-if="item.gateway">
    {{item.gateway.name}}
  </div>
</template>

<script>
  export default {
    name: 'table-gateway',
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
