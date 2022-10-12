import { actionPhoneReducer } from "./action.phone";
export function phoneReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actionPhoneReducer.updatePhoneNumber:
      return { ...state, phoneNumber: payload.value };
    case actionPhoneReducer.updateError:
      const newerror =
        state.phoneNumber.slice(0, 2) !== "09"
          ? "شماره موبایل باید با 09 شروع شود"
          : state.phoneNumber.length < 11
          ? "فرمت شماره اشتباه است"
          : "";
      return { ...state, error: newerror };

    case actionPhoneReducer.setError:
      return { ...state, error: payload.error };

    case actionPhoneReducer.updateOperator:
      const newPrice = payload.value ? state.price : "";
      return {
        ...state,
        operator: payload.value,
        price: newPrice,
      };
    case actionPhoneReducer.updatePrice:
      return { ...state, price: payload.value };
    default:
      return state;
  }
}
