import { PAYMENT_SUCCESS, PAYMENT_FAILED,PAYMENT_RESET } from '../types';

const initialState = {
  loading: true,
  success: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        loading: false,
      };
        case PAYMENT_FAILED:
          return {
            ...state,
            loading: false,
            success: false,
          };
      case PAYMENT_RESET:
        return {
          ...state,
          success: false,
        };

    default:
      return state;
  }
};
export default userReducer;
