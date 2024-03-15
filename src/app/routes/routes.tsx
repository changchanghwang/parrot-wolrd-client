import { Route, Routes } from "react-router-dom";
import { HomeScreen, SignInScreen } from "../screens";
import { SIGN_IN_ROUTES } from "./const";

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
    </Routes>
  );
}

export { AppRouter };
