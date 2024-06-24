import Navbar from '../../ui/components/Navbar'

import { PrivateRoute } from '../../router/PrivateRoute';
import { useContext } from 'react';
import { AuthContext } from '../../auth';
import { ProtectedRoute } from '../../router/ProtectedRoute';
import { HomeAdmin } from '../admin';
import { HomeUser } from '../user';

const navigationUser = [
    { name: 'User', href: '/home-page', current: false },
  ];

const navigationAdmin = [
    { name: 'Admin', href: '/appointment-management', current: false },
];

const PageRoutesComponent = () => {
    const { user } = useContext(AuthContext);

    return (
        <PrivateRoute>
            <Navbar 
                navigation={user?.type === 2 ? navigationAdmin : navigationUser} 
            />
        </PrivateRoute>
    );
}

export const PageRoutes = {


    element: <PageRoutesComponent />,
    children: [
        {
            path: "home-admin",
            element: (
                <ProtectedRoute requiredRole={2}>
                    <HomeAdmin />,
                </ProtectedRoute>
            )
        },
        {
            path: "home-user",
            element: (
                <ProtectedRoute requiredRole={1}>
                    <HomeUser />,
                </ProtectedRoute>
            )
        },
        {
            // path: "/*",
            path: "/",
            element: <ProtectedRoute requiredRole={0}/>,
        },
    ]
}