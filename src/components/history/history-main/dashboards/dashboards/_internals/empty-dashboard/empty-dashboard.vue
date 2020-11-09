<template>
  <div class="empty-dashboard">
    <div class="empty-dashboard__wrapper">
      <img class="empty-dashboard__pic" src="../../../../../../../assets/oops.svg" alt="Oops..">
      <h3 class="empty-dashboard__title">{{ $t('dashboards.empty.title') }}</h3>
      <p class="empty-dashboard__text">{{ $t('dashboards.empty.description') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'empty-dashboard',
};
</script>

<style lang="scss" scoped>
.empty-dashboard {
  display: flex;
  align-items: center;
  padding: 0 30px 30px;
}

.empty-dashboard__wrapper {
  text-align: center;
  width: 40%;
  margin: auto;
}

.empty-dashboard__pic {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.empty-dashboard__title {
  @extend %typo-strong-lg;
  margin: 10px auto 0;
}

.empty-dashboard__text {
  @extend %typo-body-lg;
  margin: 10px auto 0;
}
</style>
