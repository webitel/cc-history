import { createTablePaginationStore } from "@webitel/ui-sdk/src/modules/Filters/v2/pagination/createTablePaginationStore.ts";
import { namespace } from "../namespace.ts";

export const usePaginationStore = createTablePaginationStore(namespace);
