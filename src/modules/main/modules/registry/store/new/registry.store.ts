import { createTableStore } from '@webitel/ui-sdk/src/modules/Filters/v2/table/createTableStore.store.ts';
import { namespace } from '../../namespace.ts';
import RegistryApi from '../../api/RegistryAPIRepository.js';
import headers from '../headers/headers.js';
import { HistoryRecord } from '../../types/HistoryRecord.type.ts';

export const useTableStore = createTableStore<HistoryRecord>(namespace, {
  apiModule: {
    getList: RegistryApi.getHistory,
  },
  headers,
});
