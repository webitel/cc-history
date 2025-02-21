export type SearchModeType = 'search' | 'fts' | 'description'
interface SearchModeI {
  [key: string]: SearchModeType
}

export const SearchMode: SearchModeI = {
  Search: 'search',
  Fts: 'fts',
  Description: 'description',
} as const
