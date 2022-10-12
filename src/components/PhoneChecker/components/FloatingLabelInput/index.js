import { useContext, useState } from "react";
import { TextInput, createStyles } from "@mantine/core";
import { num2en } from "../../data";
import { StateContext, DispatchContext } from "../../index";
import { actionPhoneReducer } from "../../../../reducers/action.phone";
const useStyles = createStyles((theme, { floating }) => ({
  root: {
    position: "relative",
  },

  label: {
    position: "absolute",
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: "none",
    color: floating
      ? theme.colorScheme === "dark"
        ? theme.white
        : theme.black
      : theme.colorScheme === "dark"
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: "transform 150ms ease, color 150ms ease, font-size 150ms ease",
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : "none",
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: "opacity 150ms ease",
    opacity: floating ? 1 : 0,
  },

  input: {
    "&::placeholder": {
      transition: "color 150ms ease",
      color: !floating ? "transparent" : undefined,
    },
  },
}));

export function FloatingLabelInput({ label }) {
  const [focused, setFocused] = useState(false);
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { phoneNumber, error } = state;
  const { classes } = useStyles({
    floating: phoneNumber.trim().length !== 0 || focused,
  });

  function handleError() {
    dispatch({
      type: actionPhoneReducer.updateError,
    });
  }
  function handleOnChange(phoneNumber) {
    dispatch({
      type: actionPhoneReducer.updatePhoneNumber,
      payload: { value: num2en(phoneNumber) },
    });
    handleError();
  }
  function handleOnKeyPress(event) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }
  return (
    <TextInput
      dir="rtl"
      label={label}
      required
      error={error !== "" && error}
      classNames={classes}
      value={phoneNumber}
      onChange={(event) => handleOnChange(event.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyPress={(event) => handleOnKeyPress(event)}
      mt="md"
      autoComplete="nope"
      maxLength={11}
    />
  );
}
