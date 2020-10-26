<template>
  <div class="empty-dashboard">
    <img class="empty-dashboard__pic" src="../../../../../../../assets/oops.svg" alt="Oops..">
    <h3 class="empty-dashboard__title">{{$t('dashboards.empty.title')}}</h3>
    <p class="empty-dashboard__text">{{$t('dashboards.empty.description')}}</p>
  </div>
</template>

<script>
export default {
  name: 'empty-dashboard',
};
</script>

<style lang="scss" scoped>
.empty-dashboard {
  text-align: center;
  padding: 0 30px 30px;
}

.empty-dashboard__pic {
  width: 15%;
  min-width: 220px;
}

.empty-dashboard__title {
  @extend %typo-strong-lg;
  margin: 10px auto 0;
  max-width: 40%;
}
.empty-dashboard__text {
  @extend %typo-body-lg;
  margin: 10px auto 0;
  max-width: 40%;
}
</style>
