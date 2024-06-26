import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import { PageRoutes } from '../pages/routes/PageRoutes';
import { LoginPage, RegisterPage } from '../auth';
import { PublicRoute } from './PublicRoute';

const router = createBrowserRouter([
    {
      path: "login",
      element: <PublicRoute>
        <LoginPage />
      </PublicRoute>
    },
    {
      path: "register",
      element: <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    },
    PageRoutes,
]);

export const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
