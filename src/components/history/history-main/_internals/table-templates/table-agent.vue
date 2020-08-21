<template>
  <div v-if="item.agent">
    {{item.agent.name}}
  </div>
</template>

<script>
  export default {
    name: 'table-agent',
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
