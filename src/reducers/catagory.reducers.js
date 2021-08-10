import { catagoryConstants } from "../actions/authConstants"

const initial_state = {
    catagoryList: [],
    loading: false,
    error: '',
    catagoryCreatedSuccess: '',
    catagoryCreatedFailure: '',
}

const realTimeAddCatagory = (catagories, catagory) => {
    let array = [];

    for (const cat of catagories) {
        if (cat._id == catagory.parentId) {
            array.push({
                ...cat,
                children: realTimeAddCatagory([...cat.children, {
                    name: catagory.name,
                    _id: catagory._id,
                    slug: catagory.slug,
                    parentId: catagory.parentId,
                    children: [],
                }], catagory)
            })
        }
        else {
            array.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? realTimeAddCatagory(cat.children, catagory) : []
            })
        }
    }
    if (!catagory.parentId) {
        array.push({
            name: catagory.name,
            _id: catagory._id,
            slug: catagory.slug,
            children: [],
        })
    }
    return array;
}
export default (state = initial_state, action) => {
    switch (action.type) {
        case catagoryConstants.CATAGORY_LIST_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case catagoryConstants.CATAGORY_LIST_SUCCESS:
            state = {
                ...state,
                catagoryList: action.payload.catagoryList,
                loading: false
            }
            break;
        case catagoryConstants.CATAGORY_LIST_FAILURE:
            state = {
                ...initial_state,
                error: action.payload.error,
            }
            break;
        case catagoryConstants.CREATE_CATAGORY_REQUEST:
            state = {
                ...state,
            }
            break;
        case catagoryConstants.CREATE_CATAGORY_SUCCESS:
            const array = realTimeAddCatagory(state.catagoryList, action.payload.catagory)
            console.log(array)
            state = {
                ...state,
                catagoryList: array,
            }
            break;
        case catagoryConstants.CREATE_CATAGORY_FAILURE:
            state = {
                ...state,
                catagoryCreatedFailure: action.payload.error,
            }
            break;
    }
    return state;
}