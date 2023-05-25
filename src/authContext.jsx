import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";
import { useNavigate } from "react-router";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      const { token, role } = action.payload;

      // Save the token, role, and set isAuthenticated to true
      return {
        ...state,
        isAuthenticated: true,
        token,
        role,
      };
      
    case "LOGOUT":
      localStorage.clear();
      window.location.href = window.location.host + "/admin/login" 
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
      default:
        return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const navigate = useNavigate()
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    if(localStorage.getItem('token')){
      sdk.check(localStorage.getItem('role'))
      .then((response) => {
        if(response?.data?.message == "OK"){
          dispatch({ type: 'LOGIN', payload: {
        token : localStorage.getItem('token'),
        role : localStorage.getItem('role')
          } });
        }
      })
      .catch((error) => {

      dispatch({ type: 'LOGOUT', payload:"none" });
    });
  }
    //TODO
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
