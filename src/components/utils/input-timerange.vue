<template>
  <div class="input-timerange">
    <label class="label">{{label}}</label>
    <div class="input-timerange__wrap">
      <form
        class="input-timerange__input-wrap"
        @submit.prevent="setFrom($event.target[0].value)"
        @reset="setFrom('')"
      >
        <span class="input-timerange__label">From: </span>
        <input
          class="input__short timepicker__input"
          :value="computeFrom"
          @input="setFrom($event.target.value)"
          type="number"
        >
        <button class="icon-btn input-timerange__reset" type="reset">
          <icon>
            <svg class="icon icon-close_md md">
              <use xlink:href="#icon-close_md"></use>
            </svg>
          </icon>
        </button>
      </form>
      <form
        class="input-timerange__input-wrap"
        @submit.prevent="setTo($event.target[0].value)"
        @reset="setFrom('')"
      >
        <span class="input-timerange__label">To: </span>
        <input
          class="input__short timepicker__input"
          :value="computeTo"
          @input="setTo($event.target.value)"
          type="number"
        >
        <button class="icon-btn input-timerange__reset" type="reset">
          <icon>
            <svg class="icon icon-close_md md">
              <use xlink:href="#icon-close_md"></use>
            </svg>
          </icon>
        </button>
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
    top: 50%;
    right: (5px*2 + 24px);
    transform: translateY(-50%);
  }
</style>
