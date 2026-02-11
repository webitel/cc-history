<template>
  <header class="dashboard-header">
    <h4 class="dashboard-header__heading typo-heading-2">
      {{ name }}
    </h4>
    <div class="dashboard-header__actions-wrapper">
      <wt-icon-btn
        class="dashboard-header__actions-wrapper__action"
        icon="edit"
        @click="$emit('edit')"
      />
      <wt-icon-btn
        class="dashboard-header__actions-wrapper__action"
        icon="bucket"
        @click="$emit('delete')"
      />
    </div>
  </header>
</template>

<script>
export default {
	name: 'DashboardHeader',
	props: {
		name: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="scss" scoped>
  .dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
  }

  .dashboard-header__heading {
  }

  .dashboard-header__actions-wrapper {
    display: flex;
    align-items: center;
  }

  .dashboard-header__actions-wrapper__action {
    margin-left: 10px;
  }
</style>
