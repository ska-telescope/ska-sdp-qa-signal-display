 import { Suspense, lazy } from "react";
import type { PartialRouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";

import GuestGuard from "./components/GuestGuard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import LoadingScreen from "./components/LoadingScreen";
import MainLayout from "./components/MainLayout";

// eslint-disable-next-line react/display-name
const Loadable = (CustomComponent) => (props) => (
    <Suspense fallback={<LoadingScreen />}>
      <CustomComponent {...props} />
    </Suspense>
  );
 

// Authentication pages
const Login = Loadable(lazy(() => import("./pages/auth/Login")));

// Dashboard & plot pages
const Overview = Loadable(lazy(() => import("./pages/dashboards/Overview")));
const Spectrum = Loadable(lazy(() => import("./pages/plots/Spectrum")));
const Waterfall = Loadable(lazy(() => import("./pages/plots/Waterfall")));

// Error pages
const AuthorizationRequired = Loadable(
  lazy(() => import("./pages/AuthorizationRequired"))
);
const NotFound = Loadable(lazy(() => import("./pages/NotFound")));
const ServerError = Loadable(lazy(() => import("./pages/ServerError")));

const routes: PartialRouteObject[] = [
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard/overview" replace />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
    ],
  },
  {
    path: "plot",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/plot/spectrum" replace />,
      },
      {
        path: "spectrum",
        element: <Spectrum />,
      },
      {
        path: "waterfall",
        element: <Waterfall />,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard/overview" replace />,
      },
      {
        path: "401",
        element: <AuthorizationRequired />,
      },
      {
        path: "404",
        element: <NotFound />,
      },
      {
        path: "500",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;