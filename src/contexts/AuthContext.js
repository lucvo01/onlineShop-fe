import { createContext, useReducer, useEffect, useContext } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
// import { parseCookies, setCookie, destroyCookie } from "nookies";
import Cookies from "js-cookie";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user
      };
    case LOGIN_SUCCESS:
      console.log("login sucess", action.payload.user);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  let defaultValue = initialState;
  const cookie = Cookies.get("user");

  if (cookie) {
    const user = JSON.parse(cookie);
    defaultValue.isAuthenticated = true;
    defaultValue.user = { data: user };
  }

  const [state, dispatch] = useReducer(reducer, defaultValue);

  useEffect(() => {
    const initialize = async () => {
      try {
        // const accessToken = window.localStorage.getItem("accessToken");
        if (Cookies.get("user")) {
          const { accessToken } = JSON.parse(Cookies.get("user"));

          if (accessToken && isValidToken(accessToken)) {
            setSession(accessToken);
            // const response = await apiService.get("/users/me");
            // const user = response.data;
            const user = JSON.parse(Cookies.get("user"));
            // console.log("user", user);

            dispatch({
              type: INITIALIZE,
              payload: {
                isAuthenticated: true,
                user: { data: user }
              }
            });
          }
        } else {
          setSession(null);

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null }
          });
        }
      } catch (err) {
        console.error(err);

        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/login", { email, password });
    const { user, accessToken } = response.data.data;

    setSession(accessToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user }
    });

    Cookies.set("user", JSON.stringify({ ...user, accessToken }), {
      expires: 2
    }); // Store the user object for 2 days

    callback();
  };

  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/users/register", {
      name,
      email,
      password
    });

    const { user, accessToken } = response.data.data;
    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user }
    });

    Cookies.set("user", JSON.stringify({ ...user, accessToken }), {
      expires: 2
    }); // Store the user object for 2 days

    callback();
  };

  const logout = async (callback) => {
    Cookies.remove("user");
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useUserState() {
  var context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a AuthContext");
  }
  return context;
}

export { AuthContext, useUserState, AuthProvider };
