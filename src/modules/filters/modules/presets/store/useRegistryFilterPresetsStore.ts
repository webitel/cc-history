import { createFilterPresetsStore } from '@webitel/ui-datalist/presets';

import { namespace } from '../../../../main/modules/registry/namespace.ts';

export const useRegistryFilterPresetsStore =
  createFilterPresetsStore(namespace);
