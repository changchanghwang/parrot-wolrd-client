import { Route, Routes } from "react-router-dom";
import {
  HomeScreen,
  SignInScreen,
  SignUpScreen,
  SignUpSuccessScreen,
} from "@screens";
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP, ROUTE_SIGN_UP_SUCCESS } from "./const";

function AppRouter() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  // query hooks
  // calculated values
  // effects
  // handlers

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path={ROUTE_SIGN_IN} element={<SignInScreen />} />
      <Route path={ROUTE_SIGN_UP} element={<SignUpScreen />} />
      <Route path={ROUTE_SIGN_UP_SUCCESS} element={<SignUpSuccessScreen />} />
    </Routes>
  );
}

export { AppRouter };
