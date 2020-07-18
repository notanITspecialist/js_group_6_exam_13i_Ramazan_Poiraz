import {push} from 'connected-react-router';
import axiosApi from "../../axiosAPI";

export const INSTITUTIONS_ADD_REQ = 'INSTITUTIONS_ADD_REQ';
export const INSTITUTIONS_ADD_RES = 'INSTITUTIONS_ADD_RES';
export const INSTITUTIONS_ADD_ERR = 'INSTITUTIONS_ADD_ERR';

export const INSTITUTIONS_GET_REQ = 'INSTITUTIONS_GET_REQ';
export const INSTITUTIONS_GET_RES = 'INSTITUTIONS_GET_RES';
export const INSTITUTIONS_GET_ERR = 'INSTITUTIONS_GET_ERR';

export const INSTITUTION_GET_REQ = 'INSTITUTION_GET_REQ';
export const INSTITUTION_GET_RES = 'INSTITUTION_GET_RES';
export const INSTITUTION_GET_ERR = 'INSTITUTION_GET_ERR';

const institutionsAddReq = () => ({type: INSTITUTIONS_ADD_REQ});
const institutionsAddRes = data => ({type: INSTITUTIONS_ADD_RES, data});
const institutionsAddErr = error => ({type: INSTITUTIONS_ADD_ERR, error});

const institutionsGetReq = () => ({type: INSTITUTIONS_GET_REQ});
const institutionsGetRes = data => ({type: INSTITUTIONS_GET_RES, data});
const institutionsGetErr = error => ({type: INSTITUTIONS_GET_ERR, error});

const institutionGetReq = () => ({type: INSTITUTION_GET_REQ});
const institutionGetRes = data => ({type: INSTITUTION_GET_RES, data});
const institutionGetErr = error => ({type: INSTITUTION_GET_ERR, error});

export const getInstitutions = () => async dispatch => {
    try {
        dispatch(institutionsGetReq());

        const data = await axiosApi.get('institution');

        dispatch(institutionsGetRes(data.data));
    } catch (e) {
        dispatch(institutionsGetErr(e));
    }
};

export const getInstitution = id => async dispatch => {
    try {
        dispatch(institutionGetReq());

        const data = await axiosApi.get('institution/' + id);

        dispatch(institutionGetRes(data.data));
    } catch (e) {
        dispatch(institutionGetErr(e));
    }
};

export const addInstitution = data => async dispatch => {
    try {
        dispatch(institutionsAddReq);
        const info = await axiosApi.post('/institution', data);

        dispatch(institutionsAddRes());

        dispatch(push('/institution/'+info.data._id))
    } catch (e) {
        console.log(e)
        dispatch(institutionsAddErr(e));
    }
};

export const addImage = (id, data) => async dispatch => {
    await axiosApi.post('/institution/image/' + id, data);

    dispatch(getInstitution(id));
};

export const deleteImage = id => async dispatch => {
    await axiosApi.delete('/image/' + id);
};

export const addReview = (id, data) => async dispatch => {
    await axiosApi.post('/institution/review/' + id, data);

    dispatch(getInstitution(id));
};

export const deleteReview = id => async dispatch => {
    await axiosApi.delete('/review/' + id);
};

export const deleteInstitution = id => async dispatch => {
    await axiosApi.delete('/institution/' + id);
};