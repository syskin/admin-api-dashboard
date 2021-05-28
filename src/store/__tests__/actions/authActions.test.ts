import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as endpoints from '../../../api/routes/login'
import * as FormatResponsePath from '../../../services/formatResponsePath';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import * as actions from '../../actions/authActions'
import { SET_TOKEN } from '../../types/authTypes';
import { SET_ERROR } from '../../types/entityTypes';

const mockServiceCreator = (body: any, succeeds = true) => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
  });

describe('Test auth actions', () => {
  let store: any;
  
  beforeEach(() => {
    store = mockStore({ token: null });
  });

  it('should login user', async () => {
    const token: any = 'test'
    const spyFormatResponsePath = jest.spyOn(FormatResponsePath, 'default');
    spyFormatResponsePath.mockReturnValue(token);

    const loginAnswer: any = { accessToken: token}
    const spyLogin = jest.spyOn(endpoints, 'login');
    spyLogin.mockReturnValue(loginAnswer);

    store
      .dispatch(
        actions.signin({email: 'test', password: 'test'}, () => {})
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({ token, type: SET_TOKEN})
      })
  })

  it('should not login user', async () => {
    const loginAnswer: any = { accessToken: 'token'}
    const spyLogin = jest.spyOn(endpoints, 'login');
    spyLogin.mockReturnValue(loginAnswer);
    
    store
      .dispatch(
        actions.signin({email: 'test', password: 'test'}, () => {})
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual({ payload: 'No token', type: SET_ERROR})
      })
  })
})