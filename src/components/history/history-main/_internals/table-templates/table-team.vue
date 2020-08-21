<template>
  <div v-if="item.team">
    {{item.team.name}}
  </div>
</template>

<script>
  export default {
    name: 'table-team',
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
