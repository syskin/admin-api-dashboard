import { store, persistor } from '../'
describe('Test store definition', () => {
  it('Store and persistor well defined', () => {
    expect(store).toBeDefined()
    expect(persistor).toBeDefined()
  })
})
