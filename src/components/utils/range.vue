<template>
  <label
    class="range"
    @click.prevent="changeValue"
  >
    <input
      ref="range"
      class="range-input"
      type="range"
      :value="value"
      :min="minRange"
      :max="maxRange"
      @input="changeValue"
    >
    {{computeLabel}}
  </label>
</template>

<script>
  export default {
    name: 'range',
    props: {
      value: {
        type: Number,
        required: true,
      },

      minRange: {
        type: Number,
        default: 1,
      },

      maxRange: {
        type: Number,
        default: 100,
      },

      label: {
        type: String,
      },
    },

    mounted() {
      const seekslider = this.$refs.range;
      this.drawSeekProgress(seekslider);
    },

    methods: {
      changeValue(event) {
        this.$emit('input', +event.target.value);
        this.drawSeekProgress(event.target);
      },

      drawSeekProgress(seekslider) {
        const v = this.value;
        // eslint-disable-next-line no-param-reassign
        seekslider.style.background = `-moz-linear-gradient(left,  #FFC107 0%, #FFC107 ${v}%, #171A2A ${v}%, #171A2A 100%)`;
        // eslint-disable-next-line no-param-reassign
        seekslider.style.background = `-webkit-gradient(linear, left top, right top, color-stop(0%,#FFC107), color-stop(${v}%,#FFC107), color-stop(${v}%,#171A2A), color-stop(100%,#171A2A))`;
        // eslint-disable-next-line no-param-reassign
        seekslider.style.background = `-webkit-linear-gradient(left,  #FFC107 0%,#FFC107 ${v}%,#191919 ${v}%,#171A2A 100%)`;
        // eslint-disable-next-line no-param-reassign
        seekslider.style.background = `-o-linear-gradient(left,  #FFC107 0%,#FFC107 ${v}%,#171A2A ${v}%,#171A2A 100%)`;
        // eslint-disable-next-line no-param-reassign
        seekslider.style.background = `-ms-linear-gradient(left,  #FFC107 0%,#FFC107 ${v}%,#171A2A ${v}%,#171A2A 100%)`;
        // eslint-disable-next-line no-param-reassign
        seekslider.style.background = `linear-gradient(to right,  #FFC107 0%,#FFC107 ${v}%,#171A2A ${v}%,#171A2A 100%)`;
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
  $range-bg: #d3d3d3;

  .range-input {
    width: 100%;
    height: (3px);
    border-radius: var(--border-radius);
    background: $range-bg;
    outline: none;
    transition: var(--transition);
    -webkit-appearance: none;
  }

  .range-input::-webkit-slider-thumb {
    width: (14px);
    height: (14px);
    border-radius: 50%;
    background: var(--main-accent-color);
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }
</style>
