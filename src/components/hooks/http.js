import { useReducer, useCallback } from 'react';
import * as actionTypes from '../actions/actions';
import axios from 'axios';
const httpReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.START:
      return { ...state, isLoading: true };
    case actionTypes.AUTH_SUCCESS:
      return { ...state, isLoading: false, data: action.data };
    case actionTypes.AUTH_FAILED:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};
const useHttp = () => {
  const [http, dispatch] = useReducer(httpReducer, {
    isLoading: false,
    data: null,
    error: null
  });
  const fetchData = useCallback(() => {
    const action = {
      type: actionTypes.START
    };
    dispatch(action);
    axios
      .get('/items.json')
      .then(resp => {
        const action = {
          type: actionTypes.AUTH_SUCCESS,
          data: Object.keys(resp.data).map(el => {
            return { ...resp.data[el] };
          })
        };
        dispatch(action);
      })
      .catch(err => {
        const action = {
          type: actionTypes.AUTH_FAILED,
          error: err.message
        };
        dispatch(action);
      });
  }, []);
  return {
    isLoading: http.isLoading,
    fetchedData: http.data,
    error: http.error,
    fetchData
  };
};
export default useHttp;
