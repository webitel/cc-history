<template>
  <header class="call-visualization-header">
    <h3 class="call-visualization-header__title"><slot name="title"></slot></h3>
    <div class="call-visualization-header__main"><slot name="main"></slot></div>
    <div class="call-visualization-header__actions"><slot name="actions"></slot></div>
  </header>
</template>

<script>
export default {
  name: 'call-visualization-header',
};
</script>

<style lang="scss" scoped>
.call-visualization-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xs);
  flex-wrap: nowrap;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--secondary-color-50);
  border-radius: var(--border-radius);

  .call-visualization-header__title {
    @extend %typo-heading-3;
  }

  .call-visualization-header__main,
  .call-visualization-header__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
  }

  .call-visualization-header__actions {
    justify-content: flex-end;
  }
}
</style>
