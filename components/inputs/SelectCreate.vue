<template>
  <div class="select-create" :class="{ 'calendar' : calendar }">
    <b-input :value="selected[label]" type="text" required readonly class="bg-white" @click="showOptions = !showOptions"></b-input>
    <div v-if="showOptions" class="card border-0 w-100 position-absolute bg-white shadow-sm">
      <p v-for="(option) in options" :key="option.id" class="option" @click="selectOption(option)">{{ option[label] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    calendar: {
      type: Boolean,
      default: false
    },
    defaultvalue: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showOptions: false,
      selected: '',
    }
  },
  watch: {
    defaultvalue () {
      if (this.defaultvalue) {
        this.selected = this.defaultvalue
      }
    }
  },
  methods: {
    selectOption (option) {
      this.showOptions = false
      this.selected = option
      this.$emit('selected', option[this.value])
    }
  }
}
</script>

<style lang="scss" scoped>
.select-create {
  position: relative;
  .fa-chevron-down {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .card { z-index: 1000; }
  .option {
    padding: .5rem 1rem;
    cursor: pointer;
    &:hover {
      color: var(--primary);
      background-color: var(--gray-100);
    }
  }

  &.calendar {
    .calendar-icon {
      position: absolute;
      top: 11px;
      left: 10px;
    }
    .form-control {
      padding-left: 2.1rem;
    }
  }
}
</style>
