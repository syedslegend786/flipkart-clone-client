import { productConstants } from './../actions/authConstants'
const initial_state = {
    productsBySlug: [],
    pageBySlugPage: {},
    pageBySlugPageError: '',
    pageBySlugPageLoading: false,
    productDetailPageData: {},
    productDetailPageDataLoading: false,
    productDetailPageDataError: null,
}


export default (state = initial_state, action) => {
    switch (action.type) {
        case productConstants.PRODUCTS_BY_SLUG_SUCCESS:
            state = {
                ...state,
                productsBySlug: action.payload,
            }
            break;
        case productConstants.PRODUCT_BY_SLUG_PAGE_REAL_REQUEST:
            state = {
                ...state,
                pageBySlugPageLoading: true,
            }
            break;
        case productConstants.PRODUCT_BY_SLUG_PAGE_REAL_SUCCESS:
            state = {
                ...state,
                pageBySlugPageLoading: false,
                pageBySlugPage: action.payload,
            }
            break;
        case productConstants.PRODUCT_BY_SLUG_PAGE_REAL_FAILURE:
            state = {
                ...state,
                pageBySlugPageLoading: false,
                pageBySlugPageError: action.payload,
            }
            break;
        case productConstants.PRODUCT_DETAIL_REQUEST:
            state = {
                ...state,
                productDetailPageDataLoading: true,
            }
            break;
        case productConstants.PRODUCT_DETAIL_SUCCESS:
            state = {
                ...state,
                productDetailPageData: action.payload,
                productDetailPageDataLoading: false,
            }
            break;
        case productConstants.PRODUCT_DETAIL_FAILURE:
            state = {
                ...state,
                productDetailPageDataLoading: false,
                productDetailPageDataError: action.payload,
            }
            break;
    }
    return state;
}