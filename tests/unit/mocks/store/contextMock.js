const getContextMock = (jest) => ({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  dispatch: vi.fn(),
  commit: vi.fn(),
});

export default getContextMock;
