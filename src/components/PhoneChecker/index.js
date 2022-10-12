import { createContext, useEffect, useReducer } from "react";
import Heading from "../Heading";
import HorizentalLine from "../HorizentalLine";
import "./phoneChecker.css";
import Img from "./components/Img";
import { FloatingLabelInput } from "./components/FloatingLabelInput/index";
import { mapOperatorToEn, formatChanger, operatorData } from "./data";
import RadioBtn from "./components/RadioBtn";
import { Button } from "./components/Button/index ";
import { phoneReducer } from "../../reducers/phoneReducer";
import Maybe from "../Maybe";
import { phoneNumberDetail } from "@persian-tools/persian-tools";
import { actionPhoneReducer } from "../../reducers/action.phone";

export const StateContext = createContext();
export const DispatchContext = createContext();

export default function PhoneChecker() {
  const [state, dispatch] = useReducer(phoneReducer, {
    phoneNumber: "",
    operator: "",
    error: "",
    price: "",
  });

  const { phoneNumber, error, operator, price } = state;

  useEffect(() => {
    const numberOperator = phoneNumberDetail(phoneNumber)?.["operator"];
    dispatch({
      type: actionPhoneReducer.updateOperator,
      payload: { value: mapOperatorToEn[numberOperator] },
    });
  }, [phoneNumber]);

  return (
    <div className="phone-checker" dir="rtl">
      <div className="container">
        <div className="heading-container">
          <Heading variant="h4" text="شارژ مستقیم سیمکارت" />
          <Heading
            variant="h5"
            color="gray"
            text="شارژ مستقیم ایرانسل، همراه اول و رایتل"
          />
        </div>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <FloatingLabelInput label="شماره همراه" />
          </DispatchContext.Provider>
        </StateContext.Provider>
        <section className="logo-container">
          {["irancell", "hamrah", "rightel"].map((item, index) => {
            return (
              <RadioBtn
                name={"operator"}
                index={index}
                checked={item === operator}
                key={`${item}_${index}`}
              >
                <Img
                  alt={item}
                  src={item}
                  handleOnClick={() =>
                    dispatch({
                      type: actionPhoneReducer.updateOperator,
                      payload: { value: item },
                    })
                  }
                />
              </RadioBtn>
            );
          })}
        </section>
        <HorizentalLine />
        <section className="price-list">
          {operator &&
            operatorData[operator].map((item, index) => {
              return (
                <RadioBtn
                  name={"priceList"}
                  index={index}
                  key={`${item}__index`}
                  checked={item === price}
                >
                  <Button
                    text={`قیمت ${formatChanger(item)} ریال`}
                    handleOnClick={() =>
                      dispatch({
                        type: actionPhoneReducer.updatePrice,
                        payload: { value: item },
                      })
                    }
                    className="price-btn"
                  />
                </RadioBtn>
              );
            })}
        </section>
        <Maybe condition={error === "" && operator}>
          <button className="buy-btn">خرید</button>
        </Maybe>
      </div>
    </div>
  );
}
