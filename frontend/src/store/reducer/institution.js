import {
    INSTITUTION_GET_ERR,
    INSTITUTION_GET_REQ,
    INSTITUTION_GET_RES, INSTITUTIONS_ADD_ERR, INSTITUTIONS_ADD_REQ, INSTITUTIONS_ADD_RES, INSTITUTIONS_GET_ERR,
    INSTITUTIONS_GET_REQ, INSTITUTIONS_GET_RES
} from "../actions/institution";

const initialState = {
    loading: false,
    institutions: [],
    institution: {},
    error: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case INSTITUTIONS_ADD_REQ:
            return {...state, loading: true};
        case INSTITUTIONS_ADD_RES:
            return {...state, error: false, loading: false};
        case INSTITUTIONS_ADD_ERR:
            return {...state, error: action.error, loading: false};

        case INSTITUTIONS_GET_REQ:
            return {...state, loading: true};
        case INSTITUTIONS_GET_RES:
            return {...state, institutions: action.data, loading: false};
        case INSTITUTIONS_GET_ERR:
            return {...state, error: action.error, loading: false};

        case INSTITUTION_GET_REQ:
            return {...state, loading: true};
        case INSTITUTION_GET_RES:
            return {...state, institution: action.data, loading: false};
        case INSTITUTION_GET_ERR:
            return {...state, error: action.error, loading: false};

        default:
            return state
    }
};

export default user;