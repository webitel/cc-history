export type SearchModeType = 'search' | 'fts' | 'description'
interface SearchMode {
  [key: string]: SearchModeType
}

export const SearchMode: SearchMode = {
  Search: 'search',
  Fts: 'fts',
  Description: 'description',
} as const
