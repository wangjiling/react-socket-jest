import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware';
import * as actions from '../../app/actions/user'
import * as types from '../../app/actions/types'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

import { host, socket_host } from '../../app/constants';

const middlewares = [thunk, apiMiddleware]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })


    it('creates SERVER_VERSION when fetching server version has been done', () => {
        nock(host)
            .post('/')
            .reply(200, { result: 'server version 0.1' })


        const expectedActions = [
                { type: types.REQUEST, payload: undefined, meta: undefined },
                { type: types.SERVER_VERSION, payload: { serverVersion: 'server version 0.1' }, meta: undefined }
            ]

        const store = mockStore({})

        return store.dispatch(actions.getServerVersion()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})