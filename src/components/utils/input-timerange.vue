<template>
  <div class="input-timerange">
    <label class="label">{{label}}</label>
    <div class="input-timerange__wrap">
      <form
        class="input-timerange__input-wrap"
        @submit.prevent="setFrom($event.target[0].value)"
      >
        <span class="input-timerange__label">{{$t('reusable.from')}}: </span>
        <input
          class="input__short timepicker__input"
          :value="computeFrom"
          @input="setFrom($event.target.value)"
          type="number"
        >
        <icon-btn
          class="input-timerange__reset"
          :class="{'hidden': !value.from}"
          :icon="'close'"
          :tooltip="$t('tooltip.reset')"
          @click.native="setFrom('')"
        ></icon-btn>
      </form>
      <form
        class="input-timerange__input-wrap"
        @submit.prevent="setTo($event.target[0].value)"
      >
        <span class="input-timerange__label">{{$t('reusable.to')}}: </span>
        <input
          class="input__short timepicker__input"
          :value="computeTo"
          @input="setTo($event.target.value)"
          type="number"
        >
        <icon-btn
          class="input-timerange__reset"
          :class="{'hidden': !value.to}"
          :icon="'close'"
          :tooltip="$t('tooltip.reset')"
          @click.native="setTo('')"
        ></icon-btn>
      </form>
    </div>
  </div>
</template>

<script>
  import debounce from '../../utils/debounce';

  export default {
    name: 'input-timerange',
    props: {
      value: {
        type: Object,
        required: true,
      },
      label: {
        type: String,
      },
    },

    created() {
      this.change = debounce(this.change);
    },

    computed: {
      computeFrom() {
        return this.value.from;
      },
      computeTo() {
        return this.value.to;
      },
    },

    methods: {
      setFrom(value) {
        const newValue = {
          ...this.value,
          from: value,
        };
        this.$emit('input', newValue);
        this.change();
      },

      setTo(value) {
        const newValue = {
          ...this.value,
          to: value,
        };
        this.$emit('input', newValue);
        this.change();
      },

      change() {
        this.$emit('change', this.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .input-timerange__wrap {
    display: flex;
  }

  .input-timerange__input-wrap {
    position: relative;
    display: flex;
    align-items: center;
    padding-right: (24px + 5px);

    &:first-child {
      margin-right: (10px);
    }
  }

  .input-timerange__label {
    @extend .typo-heading-sm;
    margin-right: (10px);
  }

  .timepicker__input {
    width: (40px);
    padding: (10px) (5px + 24px) (10px) (5px);
  }

  .input-timerange__reset {
    position: absolute;
    right: (5px*2 + 24px);
  }
</style>
