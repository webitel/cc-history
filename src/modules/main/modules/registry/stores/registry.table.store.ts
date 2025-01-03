import { createTableStore } from "@webitel/ui-sdk/src/modules/Filters/v2/table/useTableStore.store.ts";
import { namespace } from "../namespace.ts";
import { usePaginationStore } from "./registry.pagination.store.ts";
import { useHeadersStore } from "./registry.headers.store.ts";
import RegistryApi from '../api/RegistryAPIRepository.js';
// import {acceptHMRUpdate} from "pinia";

export const useTableStore = createTableStore(namespace, {
    apiModule: {
        getList: RegistryApi.getHistory,
    },
    deps: {
        usePaginationStore,
        useHeadersStore,
    },
});

// make sure to pass the right store definition, `useAuth` in this case.
// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot))
//     import.meta.hot.accept(acceptHMRUpdate(usePaginationStore, import.meta.hot))
//     import.meta.hot.accept(acceptHMRUpdate(useHeadersStore, import.meta.hot))
// }
