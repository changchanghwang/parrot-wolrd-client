import { Navigate, Route, Routes } from "react-router-dom";
import {
  ArticleFreeScreen,
  HomeScreen,
  SignInScreen,
  SignUpScreen,
  SignUpSuccessScreen,
} from "@screens";
import {
  ROUTE_ARTICLES,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_SIGN_UP_SUCCESS,
} from "./const";
import { Layout } from "../components";

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
      <Route
        path="/"
        element={
          <Layout>
            <HomeScreen />
          </Layout>
        }
      />
      {/* auth */}
      <Route path={ROUTE_SIGN_IN} element={<SignInScreen />} />
      <Route path={ROUTE_SIGN_UP} element={<SignUpScreen />} />
      <Route path={ROUTE_SIGN_UP_SUCCESS} element={<SignUpSuccessScreen />} />
      {/* articles */}
      <Route path={ROUTE_ARTICLES}>
        {/* <Route index element={<Navigate to="deals" relative="path" />} /> */}
        <Route
          path="free"
          element={
            <Layout>
              <ArticleFreeScreen />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
}

export { AppRouter };
