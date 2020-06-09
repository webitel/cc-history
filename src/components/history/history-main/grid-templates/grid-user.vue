<template>
  <div v-if="item.user">
    {{item.user.name}}
  </div>
</template>

<script>
  export default {
    name: 'grid-user',
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
