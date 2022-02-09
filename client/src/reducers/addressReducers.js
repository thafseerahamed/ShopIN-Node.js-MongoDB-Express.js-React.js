import { 
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAIL,
    MY_ADDRESS_REQUEST,
    MY_ADDRESS_SUCCESS,
    MY_ADDRESS_FAIL,
CLEAR_ERRORS} from "../constants/addressConstants";







export const newAddressReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_ADDRESS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_ADDRESS_SUCCESS:
        return {
          loading: false,
          shippingInfo: action.payload,
        };
      case CREATE_ADDRESS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  



export const myAddressReducer = (state = { shippingData: [] }, action) => {
    switch (action.type) {
  
        case MY_ADDRESS_REQUEST:
            return {
                loading: true
            }
  
        case MY_ADDRESS_SUCCESS:
            return {
                loading: false,
                shippingData: action.payload
            }
  
        case MY_ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
  
        default:
            return state;
    }
  }
  