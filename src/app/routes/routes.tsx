import { Route, Routes } from "react-router-dom";
import { HomeScreen, SignInScreen, SignUpScreen } from "@screens";
import { SIGN_IN_ROUTES, SIGN_UP_ROUTES } from "./const";

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
      <Route path={SIGN_IN_ROUTES} element={<SignInScreen />} />
      <Route path={SIGN_UP_ROUTES} element={<SignUpScreen />} />
    </Routes>
  );
}

export { AppRouter };
