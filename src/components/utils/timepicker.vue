<template>
  <form class="timepicker">
    <label class="timepicker__input-wrap">
      <span class="timepicker__label">Hour</span>
      <input
        class="timepicker__input"
        :value="computeHour"
        @input="setHour($event.target.value)"
        type="number"
      >
    </label>
    <label class="timepicker__input-wrap">
      <span class="timepicker__label">Min</span>
      <input
        class="timepicker__input"
        :value="computeMin"
        @input="setMin($event.target.value)"
        type="number"
      >
    </label>
  </form>
</template>

<script>
  export default {
    name: 'timepicker',
    props: {
      value: {
        type: Number,
        required: true,
      },
    },

    computed: {
      computeHour() {
        return new Date(this.value).getHours();
      },
      computeMin() {
        return new Date(this.value).getMinutes();
      },
    },

    methods: {
      setHour(value) {
        const newValue = new Date(this.value).setHours(value);
        this.$emit('input', newValue);
      },
      setMin(value) {
        const newValue = new Date(this.value).setMinutes(value);
        this.$emit('input', newValue);
      },
    },
  };
</script>

<style lang="scss" scoped>
  $label-color: #ACACAC;
  $border-color: #E6E6E6;

  .timepicker {
    display: flex;
    width: fit-content;
    width: -moz-fit-content;
  }

  .timepicker__input-wrap {
    display: flex;
    flex-direction: column;

    &:first-child {
      margin-right: calcRem(10px);
    }
  }

  .timepicker__label {
    @extend .typo-body-sm;
    margin-bottom: calcRem(7px);
    color: $label-color;
  }

  .timepicker__input {
    @extend .typo-input;
    text-align: center;
    width: calcRem(50px);
    padding: calcRem(10px) calcRem(5px);
    border: 1px solid $border-color;
    border-radius: $border-radius;
  }
</style>
