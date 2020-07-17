import {push} from 'connected-react-router';
import axiosApi from "../../axiosAPI";

export const REG_USER_REQ = 'REQ_USER_REQ';
export const REG_USER_RES = 'REQ_USER_RES';
export const REG_USER_ERR = 'REG_USER_ERR';

export const LOGIN_USER_REQ = 'LOGIN_USER_REQ';
export const LOGIN_USER_RES = 'LOGIN_USER_RES';
export const LOGIN_USER_ERR = 'LOGIN_USER_ERR';

export const LOGOUT_USER_REQ = 'LOGOUT_USER_REQ';
export const LOGOUT_USER_RES = 'LOGOUT_USER_RES';
export const LOGOUT_USER_ERR = 'LOGOUT_USER_ERR';

const regUserReq = () => ({type: REG_USER_REQ})
const regUserRes = data => ({type: REG_USER_RES, data})
const regUserErr = error => ({type: REG_USER_ERR, error})

const loginUserReq = () => ({type: LOGIN_USER_REQ})
const loginUserRes = data => ({type: LOGIN_USER_RES, data})
const loginUserErr = error => ({type: LOGIN_USER_ERR, error})

const logoutUserReq = () => ({type: LOGOUT_USER_REQ})
const logoutUserRes = data => ({type: LOGOUT_USER_RES, data})
const logoutUserErr = error => ({type: LOGOUT_USER_ERR, error})

export const registerUser = register => async dispatch => {
  dispatch(regUserReq());

  try {
      const data = await axiosApi.post('/user', register);

      dispatch(regUserRes(data.data))

      dispatch(push('/'))
  } catch (e) {
      dispatch(regUserErr(e))
  }
};

export const loginUser = login => async dispatch => {
    dispatch(loginUserReq());

    try {
        const data = await axiosApi.post('/user/sessions', login);

        dispatch(loginUserRes(data.data))

        dispatch(push('/'))
    } catch (e) {
        dispatch(loginUserErr(e))
    }
};

export const logoutUser = () => async dispatch => {
    dispatch(logoutUserReq());

    try {
        const data = await axiosApi.delete('/user/sessions');

        dispatch(logoutUserRes(data.data))

        dispatch(push('/login'))
    } catch (e) {
        dispatch(logoutUserErr(e))
    }
};