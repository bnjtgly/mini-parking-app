<template>
  <div>
    <slot name="table-wrapper">
      <b-table
        bordered
        :fields="fields"
        :items="items"
        :tbody-tr-class="rowClass"
        class="custom-table"
      >
        <template
          v-for='field in fields'
          :slot='`head(${field.key})`'
          slot-scope='row'
        >
          <slot :name="`header-${field.key}`" v-bind="row">
            {{ field.label }}
          </slot>
        </template>
        <template
          v-for="(field) in fields"
          :slot="`cell(${field.key})`"
          slot-scope="row"
        >
          <slot :name="field.key" v-bind="row">
            {{ row.value }}
          </slot>
        </template>
      </b-table>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      default: null,
    },
    selectedData: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      isBusy: false,
    }
  },
  methods: {
    rowClass(item, type) {
      if (this.selectedData) {
        if (this.selectedData.includes(item.id)) return 'bg-gray-100'
      }
    }
  }
}
</script>

<style>
.custom-table {
  background-color: var(--white);
}
.table thead th {
  vertical-align: middle;
}
.table td {
  vertical-align: middle;
}
</style>
