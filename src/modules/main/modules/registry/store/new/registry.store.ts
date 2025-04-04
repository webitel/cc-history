import { createTableStore } from '@webitel/ui-datalist';
import { EngineHistoryCall } from 'webitel-sdk';

import RegistryApi from '../../api/RegistryAPIRepository.js';
import { namespace } from '../../namespace.ts';
import { headers } from '../headers/headers.ts';

export const useRegistryStore = createTableStore<EngineHistoryCall>(namespace, {
  apiModule: {
    getList: RegistryApi.getHistory,
  },
  headers,
});
