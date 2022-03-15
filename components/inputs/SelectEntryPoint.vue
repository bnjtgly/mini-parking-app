<template>
  <div>
    <div class="position-relative d-flex align-items-center">
      <b-form-select
        v-model="selected"
        :size="size"
        :options="options"
        class="outline-none"
      ></b-form-select>
      <img src="/icons/icon-double-caret.svg" class="position-absolute double-caret">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'sm'
    },
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selected: 10,
    }
  },
  watch: {
    selected () {
      this.$emit('changed', this.selected)
    }
  }
}
</script>
