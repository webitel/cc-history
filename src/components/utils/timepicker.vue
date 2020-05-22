<template>
  <form class="timepicker">
    <div class="timepicker__input-wrap">
      <label class="timepicker__label">Hour</label>
      <input
        class="input__short timepicker__input"
        :value="computeHour"
        @input="setHour($event.target.value)"
        type="number"
      >
    </div>
    <div class="timepicker__input-wrap">
      <label class="timepicker__label">Min</label>
      <input
        class="input__short timepicker__input"
        :value="computeMin"
        @input="setMin($event.target.value)"
        type="number"
      >
    </div>
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
      margin-right: (10px);
    }
  }

  .timepicker__label {
    @extend .typo-body-sm;
    margin-bottom: (7px);
    color: $label-color;
  }

  .timepicker__input {
    width: (50px);
  }
</style>
