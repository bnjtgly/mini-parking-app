<template>
  <b-input-group>
    <b-form-input class="bg-gray-100 border-0 outline-none pl-2" placeholder="Quick Search" @input="$emit('input', $event)"></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  data () {
    return {
      search: null
    }
  }
}
</script>
