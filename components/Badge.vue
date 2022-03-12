<template>
  <div
    class="px-2 py-1 d-inline-flex align-items-center justify-content-center rounded-lg"
    :style="`color: ${textColor}; border: 1px solid ${textColor}; background-color: ${bgColor}`"
  >
    <p class="m-0">{{name}}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    textColor: {
      type: String,
      default: '#D2CFDE'
    },
    bgColor: {
      type: String,
      default: '#F1F0F5'
    }
  }
}
</script>
