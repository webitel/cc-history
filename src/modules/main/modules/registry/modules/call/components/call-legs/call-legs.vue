<template>
  <section>
    <wt-loader v-show="isLoading" />
    <div
      v-show="!isLoading"
      class="table-wrapper"
    >
      <wt-table
        ref="call-legs-table"
        :data="tableData"
        :grid-actions="false"
        :headers="shownHeaders"
        :selectable="false"
      >
        <template #direction="{ item }">
          <table-direction :item="item" />
        </template>
        <template #from="{ item }">
          <div v-if="item.from">
            {{ item.from.number }}
          </div>
        </template>
        <template #to="{ item }">
          <div v-if="item.to">
            {{ item.to.number }}
          </div>
        </template>
        <template #user="{ item }">
          <div v-if="item.user">
            {{ item.user.name }}
          </div>
        </template>
        <template #gateway="{ item }">
          <div v-if="item.gateway">
            {{ item.gateway.name }}
          </div>
        </template>
        <template #agent="{ item }">
          <div v-if="item.agent">
            {{ item.agent.name }}
          </div>
        </template>
        <template #team="{ item }">
          <div v-if="item.team">
            {{ item.team.name }}
          </div>
        </template>
        <template #queue="{ item }">
          <div v-if="item.queue">
            {{ item.queue.name }}
          </div>
        </template>
        <template #grantee="{ item }">
          <div v-if="item.grantee">
            {{ item.grantee.name }}
          </div>
        </template>
        <template #member="{ item }">
          <div v-if="item.member">
            {{ item.member.name }}
          </div>
        </template>
        <template #ratedBy="{ item }">
          <div v-if="item.ratedBy">
            {{ item.ratedBy.name }}
          </div>
        </template>
        <template #memberId="{ item }">
          <div v-if="item.member">
            {{ item.member.id }}
          </div>
        </template>
        <template #contact="{ item }">
          <div v-if="item.contact">
            {{ item.contact.name }}
          </div>
        </template>
        <template #hangupDisposition="{ item }">
          <div v-if="item.hangupDisposition">
            {{ $t(`hangupDisposition.${item.hangupDisposition}`) }}
          </div>
        </template>
        <template #legMarker="{ item }">
          <wt-icon
            v-if="!item.parentId"
            class="icon__leg-marker"
            icon="leg-a-marker"
            icon-prefix="hs"
            size="sm"
          />
        </template>
        <template #transfers="{ item }">
          <div class="transfers-wrap">
            <wt-icon
              v-if="item.transferFrom"
              v-tooltip="$t('registry.call.transferFrom')"
              class="table-action"
              icon="transfer-from"
              icon-prefix="hs"
              @mouseenter.native="highlightRow([item.transferFrom])"
              @mouseleave.native="highlightRow([item.transferFrom])"
            />

            <wt-icon
              v-if="item.transferFrom && item.transferTo"
              v-tooltip="$t('registry.call.transferMerge')"
              class="table-action"
              icon="transfer-merge"
              icon-prefix="hs"
              @mouseenter.native="highlightRow([item.transferFrom, item.transferTo])"
              @mouseleave.native="highlightRow([item.transferFrom, item.transferTo])"
            />

            <wt-icon
              v-if="item.transferTo"
              v-tooltip="$t('registry.call.transferTo')"
              class="table-action"
              icon="transfer-to"
              icon-prefix="hs"
              @mouseenter.native="highlightRow([item.transferTo])"
              @mouseleave.native="highlightRow([item.transferTo])"
            />
          </div>
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { mapActions, mapState } from 'vuex';

import TableDirection from '../../../../components/table-templates/table-direction.vue';
import { useRegistryStore } from '../../../../store/new/registry.store.js';

export default {
  name: 'CallLegs',
  components: {
    TableDirection,
  },
  props: {
    call: {
      type: Object,
      required: true,
    },
    namespace: {
      type: String,
    },
  },

  setup: () => {
    const tableStore = useRegistryStore();

    const {
      shownHeaders: registryTableShownHeaders,
      fields: registryTableFields,
    } = storeToRefs(tableStore);

    const { initialize } = tableStore;

    const legsTableSpecificFields = [
      'id',
      'parent_id',
      'transfer_from',
      'transfer_to',
    ];

    const legsTableSpecificShownHeaders = [
      {
        value: 'transfers',
        show: true,
        sort: null,
        field: 'transfer_from, transfer_to',
      },
      {
        value: 'legMarker',
        show: true,
        sort: null,
        field: '',
        width: '0',
      },
    ];

    const shownHeaders = computed(() => {
      return [
        ...registryTableShownHeaders.value,
        ...legsTableSpecificShownHeaders,
      ];
    });

    const fields = computed(() => {
      return [
        ...registryTableFields.value,
        ...legsTableSpecificFields,
      ];
    });

    return {
      shownHeaders,
      fields,

      initialize,
    }
  },

  computed: {
    ...mapState({
      legsData(state) {
        return getNamespacedState(state, this.namespace).legsData;
      },
      isLoading(state) {
        return getNamespacedState(state, this.namespace).isLegsDataLoading;
      },
    }),

    tableData() {
      return [
        this.call,
        ...this.legsData,
      ];
    },
  },

  methods: {
    ...mapActions({
      loadList(dispatch, payload) {
        return dispatch(`${this.namespace}/LOAD_LEGS_DATA_LIST`, payload);
      },
    }),

    highlightRow(ids) {
      ids.forEach((id) => {
        const table = this.$refs['call-legs-table'];
        const className = `wt-table__tr__${id}`;
        const row = table.$el.querySelector(`.${className}`);
        if (row) {
          if (row.classList.contains('wt-table__tr--highlighted')) {
            row.classList.remove('wt-table__tr--highlighted');
          } else {
            row.classList.add('wt-table__tr--highlighted');
          }
        }
      });
    },
  },
  async created() {
    // [https://webitel.atlassian.net/browse/WTEL-6468]
    // Initialize field value to pass a new value to the loadList method, saved from the main table history
    this.loadList({ fields: this.fields });
  },
};
</script>

<style lang="scss" scoped>

// make 1st row (aka main parent) bold
::v-deep .wt-table__row-wrap:first-child .wt-table__td > div {
  font-weight: 600;
}

// blinking animation to highlighted row
::v-deep .wt-table__tr--highlighted {
  animation: row-bg-blinking 1s linear infinite;
}

// row animation at transfer icon hover
@keyframes row-bg-blinking {
  0% {
    background: #fff;
  }
  50% {
    background: var(--primary-color);
  }
  100% {
    background: #fff;
  }
}

// making row relative for leg marker positioning
::v-deep .wt-table__tr {
  position: relative;
}

// "A" leg marker positioning to left top corner of its row
.icon__leg-marker {
  position: absolute;
  top: 0;
  left: 0;
}

// transfer icons container
.transfers-wrap {
  display: flex;
  align-items: center;
}

// transfer icon btn container
.transfer-icon {
  position: relative;

  // separate icons for proper animation
  &:nth-child(2) {
    margin: 0 3px;
  }
}
</style>
