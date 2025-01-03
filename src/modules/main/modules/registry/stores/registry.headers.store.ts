import { createTableHeadersStore } from "@webitel/ui-sdk/src/modules/Filters/v2/headers/createTableHeadersStore.ts";
import { namespace } from "../namespace.ts";
import headers from '../store/headers/headers.js';

export const useHeadersStore = createTableHeadersStore(namespace, { headers });
