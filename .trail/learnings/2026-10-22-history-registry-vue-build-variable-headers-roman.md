---
title: "history-registry.vue: build variable-headers storage-key from namespace.ts"
author: Roman
date: 2026-10-22
standing: true
id: l-1e4e36f8
scope: repo
status: active
touches:
  - src/modules/main/modules/registry/components/history-registry.vue
---

## Decided
In `history-registry.vue`, don't hard-code the `storage-key` string passed to `wt-table-variable-column-select`. Take the base from the registry's `namespace.ts`, which sits next to the component, and append only `${namespace}/variable-headers`. That keeps persisted keys in step with the module namespace.
Example: in PR #724, `storage-key="history/registry/variable-headers"` was a literal. The reviewer asked for it to be derived from the namespace.

_From review on #724 here, merged Sep 15._
