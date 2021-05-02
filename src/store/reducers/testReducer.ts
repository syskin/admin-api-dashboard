interface TestState {
  loading: boolean
  error: string
  success: string
}

const initialState: TestState = {
  loading: false,
  error: '',
  success: ''
}

const testReducer = (state = initialState, action: TestState) => {
  return state
}

export default testReducer
