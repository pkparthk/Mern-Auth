import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
          const res = await axios.get("/api/users/me");
          dispatch({
            type: "USER_LOADED",
            payload: res.data.data,
          });
        } catch (err) {
          dispatch({ type: "AUTH_ERROR" });
        }
      } else {
        dispatch({ type: "AUTH_ERROR" });
      }
    };

    loadUser();
  }, []);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post("/api/auth/register", formData);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: err.response.data.message,
      });
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post("/api/auth/login", formData);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.response.data.message,
      });
    }
  };
  
  const logout = () => dispatch({ type: "LOGOUT" });
  
  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get("/api/users/me");
        dispatch({
          type: "USER_LOADED",
          payload: res.data.data,
        });
      } catch (err) {
        dispatch({ type: "AUTH_ERROR" });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearError,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
