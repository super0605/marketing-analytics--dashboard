import * as iassign from 'immutable-assign';
import {
  testAction
} from '../constants';

export interface TestRequest {
  type: string;
  idToken?: string;
}

export interface TestSuccess {
  type: string;
  message: string;
}

export interface TestFailure {
  type: string;
  error?: ResponseError;
}

export type TestAction = TestRequest | TestFailure | TestSuccess;

export interface ResponseError extends Error {
  response?: Response;
}

export interface TestState {
  isFetching: boolean;
  message: string;
  error?: ResponseError;
}

export const initialState: TestState = {
  isFetching: false,
  message: 'Welcome to Redux and Redux-saga for Next.js ...',
};

export default function testReducer(state: TestState = initialState, action: TestAction ) {
  switch (action.type) {
    case testAction.TEST_REQUEST:
      return iassign(
        state,
        state => state.isFetching,
        () => true,
      );
    case testAction.TEST_SUCCESS:
      const testSuccessAction: TestSuccess = action as TestSuccess;
      return iassign(
        state,
        (s) => {
          s.isFetching = false;
          s.message = testSuccessAction && testSuccessAction.message;

          return s;
        },
      );
    case testAction.TEST_FAILURE:
      const testFailureAction: TestFailure = action as TestFailure;
      return iassign(
        state,
        (s) => {
          s.isFetching = false;
          s.error = testFailureAction && testFailureAction.error;

          return s;
        },
      );
    default:
      return state;
  }
}

export const booksRequest = ( idToken: string): TestRequest => ({
  type: testAction.TEST_REQUEST,
  idToken,
});

export const booksSuccess = (message: string): TestSuccess => ({
  type: testAction.TEST_SUCCESS,
  message,
});

export const booksFailure = (error?: ResponseError): TestFailure => ({
  type: testAction.TEST_FAILURE,
  error,
});
