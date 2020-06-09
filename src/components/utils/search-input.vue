<template>
  <label class="cc-input cc-search-input">
    <div class="cc-input__body" :class="{'focused': isFocused}">
      <icon>
        <svg class="icon icon-search_md md">
          <use xlink:href="#icon-search_md"></use>
        </svg>
      </icon>
      <input
        class="cc-input__input"
        :value="value"
        :placeholder="placeholder"
        :autofocus="autofocus"
        @input="$emit('input', $event.target.value)"
        @focusin="isFocused = true"
        @focusout="isFocused = false"
      />
      <icon-btn
        class="cc-input__icon"
        :class="{'hidden': !value}"
        :icon="'close'"
        :tooltip="$t('tooltip.reset')"
        @click.native="$emit('input', '')"
      ></icon-btn>
    </div>
  </label>
</template>

<script>
  import debounce from '../../utils/debounce';

  export default {
    name: 'search-input',
    props: {
      // value -- v-model from outer component
      value: {
        required: true,
      },
      // input placeholder
      placeholder: {
        type: String,
        default: 'Search',
      },
      // autofocus on input when page is first loaded
      autofocus: {
        type: Boolean,
        default: false,
      },
      // for specific types like password
      type: {
        type: String,
        default: 'text',
      },
      // validation rules
      v: {},
    },

    data: () => ({
      isFocused: false,
    }),

    watch: {
      value() {
        this.search.call(this);
      },
    },

    created() {
      this.search = debounce(this.search);
    },

    methods: {
      search() {
        this.$emit('search', this.value);
      },
    },
  };
</script>

<style scoped>

</style>
