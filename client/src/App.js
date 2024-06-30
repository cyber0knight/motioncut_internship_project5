import React, { useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

import Register from "./pages/user/register.js";
import Login from "./pages/user/login.js";
import { AuthContext, AuthContextProvider} from './context/authContext.js';
import LandingPage from "./pages/LandingPage.js";
import Home from "./pages/Home.js";
import ItemDetails from "./pages/ItemDetails.js";
import Cart from "./pages/Cart.js";
import Profile from "./pages/profile.js";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <LandingPage />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <h1>hello</h1>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/item/:id",
    element: <ItemDetails />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/profile",
    element: <Profile />,
  }
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;