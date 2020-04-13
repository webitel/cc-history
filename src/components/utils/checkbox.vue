<template>
  <div
    class="checkbox-label"
    @click.prevent.stop="input"
  >
    <input
      type="checkbox"
      :checked="value"
    >
    <span class="checkbox"></span>
    <label class="label">{{computeLabel}}</label>
  </div>
</template>

<script>
  export default {
    name: 'table-checkbox',
    props: {
      value: {
        type: Boolean,
        required: true,
      },
      // may be a string, or object with true/false values
      label: {},
    },
    methods: {
      input() {
        // =============================== ATTENTION!!!!!====================================
        // WE PASS INVERTED CHECKBOX VALUE
        // BECAUSE CLICK EVENT FIRES BEFORE CHECKBOX CHANGE
        this.$emit('input', !this.value);
      },
    },
    computed: {
      computeLabel() {
        if (this.label) {
          return this.label[this.value] || this.label;
        }
        return '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  $checkbox-color: rgba(0, 0, 0, 0.3);
  $checkbox-color__checked: #000;

  .checkbox-label {
    display: flex;
    align-items: center;
    position: relative;
    height: calcRem(24px);
    padding-left: calcRem(29px);
    line-height: calcRem(24px);
    cursor: pointer;
    user-select: none;

    .label {
      margin-bottom: 0;
    }

    /* Hide the browser's default checkbox */
    input {
      position: absolute;
      width: 0;
      height: 0;
      cursor: pointer;
      opacity: 0;
    }

    /* Create a custom checkbox */
    .checkbox {
      position: absolute;
      left: 0;
      width: calcRem(18px);
      height: calcRem(18px);
      background: #fff;
      border: calcRem(2px) solid $checkbox-color;
      border-radius: 2px;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkbox:after {
      content: '';
      position: absolute;
      display: none;


      /* Style the checkmark/indicator */
      top: 50%;
      left: 50%;
      width: calcRem(6px);
      height: calcRem(12px);
      border: solid $checkbox-color__checked;
      border-width: 0 calcRem(2.5px) calcRem(2.5px) 0;
      transform: translate(-50%, -60%) rotate(45deg);

    }

    input:checked ~ .checkbox {
      border-color: $checkbox-color__checked;
    }

    /* Show the checkmark when checked */
    input:checked ~ .checkbox:after {
      display: block;
    }
  }
</style>
