import React from "react";
import { GlobalContext } from "../globalContext";
const openSnack = ({message}) => {
  const { state, dispatch } = React.useContext(GlobalContext);
//   const show = state.globalMessage.length > 0;
  return  (
    <></>
  ) 
};

export default openSnack;
