<template>
  <b-modal ref="metaTableModal" hide-header hide-footer centered no-close-on-backdrop no-close-on-esc>
    <div class="d-flex align-items-center justify-content-between border-bottom p-3 mb-3">
      <p class="text-lg font-weight-bold text-gray-800">{{ isEdit ? 'Edit Item' : 'Add New Item' }}</p>
      <FontAwesomeIcon class="close-icon fa-lg" :icon="['fal', 'times']" @click="hide()" />
    </div>

    <b-form class="px-3" @submit.prevent="addItem()">

      <!-- Slot Type -->
      <label class="text-gray-600 text-sm font-weight-bold">Slot Type</label>
      <input v-model="entity.slot_type" type="text" class="bg-gray-200 form-control w-100 border-0 mb-2 outline-none" required />

      <!-- Name -->
      <label class="text-gray-600 text-sm font-weight-bold">Name</label>
      <b-input v-model="entity.name" type="text" class="bg-gray-200 border-0 mb-2 outline-none" required></b-input>

      <!-- Metadata -->
      <div v-if="hasMetadata">
        <label class="text-gray-600 text-sm font-weight-bold">Meta Data <span class="text-gray-500">(when complete, press tab to add new meta data)</span></label>
        <div
          v-for="(value, key) in entity.metadata" :key="key"
          class="metadata d-flex align-items-center border rounded bg-gray-100 w-100 my-1 position-relative"
        >
          <div class="w-50">
            <b-input class="bg-gray-100 outline-none border-0 cursor-default" readonly type="text" :value="key"></b-input>
          </div>
          <div class="w-50 border-left">
            <b-input class="bg-gray-100 outline-none border-0 cursor-default" readonly type="text" :value="value"></b-input>
          </div>
          <div class="delete-metadata-btn clickable" @click="deleteMetadata(key)">
            <FontAwesomeIcon :icon="['fal', 'times']" />
          </div>
        </div>

        <!-- Add Metadata -->
        <div
          v-if="addingMetadata"
          class="d-flex align-items-center border rounded bg-gray-100 w-100 my-1"
          @click.self="cancelAddingMetaData()"
        >
          <div class="w-50">
            <b-form-input id="metadata_key" v-model="metadata_placeholder.key" placeholder="Key" class="py-0 bg-gray-100 w-100 outline-none border-0" type="text"></b-form-input>
          </div>
          <div class="w-50 border-left position-relative d-flex align-items-center">
            <b-form-input v-model="metadata_placeholder.value" placeholder="Value" class="py-0 bg-gray-100 w-100 outline-none border-0" type="text" @blur="addMetadata()"></b-form-input>
            <div class="cancel-metadata-btn clickable" @click="cancelAddingMetaData()">
              <FontAwesomeIcon :icon="['fal', 'times']" />
            </div>
          </div>
        </div>
        <div class="d-flex">
          <b-button v-if="!addingMetadata" variant="light" size="sm" class="text-gray-700 font-weight-bold outline-none" @click="addingMetadata = true">
            <FontAwesomeIcon :icon="['fal', 'plus']" class="mr-1"/>
            Add Metadata
          </b-button>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-between my-3">
        <b-button variant="text" class="close-icon outline-none" @click="hide()">Cancel</b-button>
        <b-button variant="success outline-none" type="submit">{{ isEdit ? 'Edit Item' : 'Add New Item' }}</b-button>
      </div>
    </b-form>

  </b-modal>
</template>

<script>
import Vue from 'vue'
import { cloneDeep, assign } from 'lodash'

export default {
  props: {
    selected: {
      type: Object,
      default: () => ({})
    },
    hasMetadata: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addingMetadata: false,

      entity: {
        metadata: {}
      },

      metadata_placeholder: {}
    }
  },
  computed: {
    isEdit () {
      return Object.keys(this.selected).length !== 0
    }
  },
  watch: {
    selected () {
      if (this.isEdit) {
        this.entity = cloneDeep(this.selected)
      } else {
        this.entity = {
          sort_order: null,
          display: null,
          value_str: null,
          metadata: {},
          status: null
        }
      }
    }
  },
  methods: {
    show () {
      this.$refs.metaTableModal.show()
    },
    hide () {
      this.$refs.metaTableModal.hide()
      this.addingMetadata = false
    },
    cancelAddingMetaData () {
      this.addingMetadata = false
      this.metadata_placeholder = {
        key: '',
        value: ''
      }
    },
    deleteMetadata (key) {
      Vue.delete(this.entity.metadata, key)
    },
    addingItem () {
      this.addingMetadata = true
    },
    addMetadata () {
      const array = [{ [this.metadata_placeholder.key]: this.metadata_placeholder.value }]
      this.entity.metadata = assign(this.entity.metadata, ...array)
      this.metadata_placeholder = {
        key: '',
        value: ''
      }
      document.getElementById("metadata_key").focus()
    },
    addItem () {
      // code here
      this.$emit('newDomRefs', this.entity)
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.selected {
  background-color: var(--primary) !important;
  color: var(--white) !important;
}

.cancel-metadata-btn {
  position: absolute;
  right: -8px;
  color: var(--white);
  background: var(--danger);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  height: 16px;
  width: 16px;
}

.delete-metadata-btn {
  position: absolute;
  display: none;
  right: -8px;
  color: var(--white);
  background: var(--danger);
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  height: 16px;
  width: 16px;
}

.metadata {
  &:hover {
    .delete-metadata-btn {
      display: flex !important;
    }
  }
}
</style>
