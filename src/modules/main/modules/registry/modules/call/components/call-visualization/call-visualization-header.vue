<template>
  <header class="call-visualization-header">
    <h3 class="call-visualization-header__main">
      <slot name="main" />
    </h3>
    <div class="call-visualization-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'CallVisualizationHeader',
};
</script>

<style lang="scss" scoped>
.call-visualization-header {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: var(--spacing-xs);
  align-items: center;
  flex-wrap: nowrap;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--secondary-color);
  border-radius: var(--border-radius);

  .call-visualization-header__main {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

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
