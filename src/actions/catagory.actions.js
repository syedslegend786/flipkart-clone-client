import axios from './../helpers/axios'
import { catagoryConstants } from './authConstants';
//

export const getAllCatagories = () => {
    return async (dispatch) => {
        dispatch({
            type: catagoryConstants.CATAGORY_LIST_REQUEST,
        })
        const res = await axios.get('/catagory/getCatagory');
        if (res.status == 200) {
            const { catagoryList } = res.data;
            dispatch({
                type: catagoryConstants.CATAGORY_LIST_SUCCESS,
                payload: {
                    catagoryList
                }
            })
        } else {
            dispatch({
                type: catagoryConstants.CATAGORY_LIST_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}

