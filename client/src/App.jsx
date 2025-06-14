import { Skeleton } from "@heroui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { UserAccount } from "./pages/user/UserAccount.jsx";
import { UserHome } from "./pages/user/UserHome.jsx";

import { AuthLayout } from "./components/auth/AuthLayout.jsx";
import { CheckAuth } from "./components/auth/CheckAuth.jsx";
import { AuthForgotPassword } from "./pages/auth/AuthForgotPassword.jsx";
import { AuthLogin } from "./pages/auth/AuthLogin.jsx";
import { AuthRegister } from "./pages/auth/AuthRegister.jsx";

import { Error } from "./pages/error/Error.jsx";

import { getProfile } from "./redux/auth/authSlice.js";

const router = (authenticated, user) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <UserHome />,
      errorElement: <Error />,
    },

    {
      path: "/account",
      element: (
        <CheckAuth authenticated={authenticated} user={user}>
          <UserAccount />
        </CheckAuth>
      ),
      errorElement: <Error />,
    },

    {
      path: "/auth",
      element: (
        <CheckAuth authenticated={authenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
      ),
      children: [
        { index: true, element: <Navigate to="register" replace /> },
        { path: "login", element: <AuthLogin />, errorElement: <Error /> },
        { path: "register", element: <AuthRegister />, errorElement: <Error /> },
        { path: "forgot-password", element: <AuthForgotPassword />, errorElement: <Error /> },
      ],
    },

    { path: "*", element: <Navigate to="/" replace /> },
  ]);
};

export default function App() {
  const { user, authenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) {
    return <Skeleton className="h-screen w-screen" />;
  }

  return <RouterProvider router={router(authenticated, user)} />;
}
