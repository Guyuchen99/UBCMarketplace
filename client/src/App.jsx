import { Skeleton } from "@heroui/react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { CheckAuth } from "./components/auth/CheckAuth.jsx";
import { AuthLayout } from "./components/layout/AuthLayout.jsx";
import { RootLayout } from "./components/layout/RootLayout.jsx";

import { Home } from "./pages/user/Home.jsx";
import { Postings } from "./pages/user/Postings.jsx";
import { UserAccount } from "./pages/user/UserAccount.jsx";
import { UserMailbox } from "./pages/user/UserMailbox.jsx";
import { UserPostings } from "./pages/user/UserPostings.jsx";
import { UserRequests } from "./pages/user/UserRequests.jsx";

import { AuthForgotPassword } from "./pages/auth/AuthForgotPassword.jsx";
import { AuthLogin } from "./pages/auth/AuthLogin.jsx";
import { AuthRegister } from "./pages/auth/AuthRegister.jsx";

import { Error } from "./pages/error/Error.jsx";

import { getProfile } from "./redux/auth/authSlice.js";

export default function App() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <RootLayout />,
          errorElement: <Error />,
          children: [
            { index: true, element: <Home /> },
            { path: "postings", element: <Postings /> },

            {
              path: "account",
              element: (
                <CheckAuth>
                  <UserAccount />
                </CheckAuth>
              ),
            },
            {
              path: "my-mailbox",
              element: (
                <CheckAuth>
                  <UserMailbox />
                </CheckAuth>
              ),
            },
            {
              path: "my-postings",
              element: (
                <CheckAuth>
                  <UserPostings />
                </CheckAuth>
              ),
            },
            {
              path: "my-requests",
              element: (
                <CheckAuth>
                  <UserRequests />
                </CheckAuth>
              ),
            },
          ],
        },

        {
          path: "/auth",
          element: (
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>
          ),
          children: [
            { index: true, element: <Navigate to="login" replace /> },
            { path: "login", element: <AuthLogin /> },
            { path: "register", element: <AuthRegister /> },
            { path: "forgot-password", element: <AuthForgotPassword /> },
          ],
        },

        { path: "*", element: <Navigate to="/" replace /> },
      ]),
    [],
  );

  if (loading) {
    return <Skeleton className="h-screen w-screen" />;
  }

  return <RouterProvider router={router} />;
}
