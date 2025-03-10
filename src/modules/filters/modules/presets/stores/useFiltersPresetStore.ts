import { createTableStore } from '@webitel/ui-sdk/src/modules/Filters/v2/table/createTableStore.store.ts';
import { EnginePresetQuery } from 'webitel-sdk';
import PresetQueryAPI from "../api/PresetQuery.api.ts";
import { namespace } from "../../namespace.ts";
import { headers } from "./headers/headers.ts";

export const useFiltersPresetStore = createTableStore<EnginePresetQuery>(namespace, {
    apiModule: PresetQueryAPI,
    headers,
});
