<template>
  <div v-if="item.member">
    {{item.member.name}}
  </div>
</template>

<script>
  export default {
    name: 'table-member',
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
