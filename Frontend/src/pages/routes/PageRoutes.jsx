import Navbar from '../../ui/components/Navbar'

import { PrivateRoute } from '../../router/PrivateRoute';
import { useContext } from 'react';
import { AuthContext } from '../../auth';
import { ProtectedRoute } from '../../router/ProtectedRoute';
import { AuthorsAdmin, BooksAdmin, OrdersAdmin, ReportsAdmin } from '../admin';
import { Authors, Books, Record, Cart, Profile, Author, Book } from '../user';
import { ModalProvider } from '../admin/context/ModalContext';
import { ModalProviderBooks } from '../admin/context/ModalContextBooks';

const navigationUser = [
    { name: 'Autores', href: '/authors', current: false },
    { name: 'Libros', href: '/books', current: false },
    { name: 'Mis Pedidos', href: '/record', current: false },
    { name: 'Carrito de Compras', href: '/cart', current: false },
    { name: 'Ver Perfil', href: '/my-profile', current: false }
];

const navigationAdmin = [
    { name: 'Gestión de Autores', href: '/authors-admin', current: false },
    { name: 'Gestión de Libros', href: '/books-admin', current: false },
    { name: 'Pedidos', href: '/orders-admin', current: false },
    { name: 'Reportes', href: '/reports-admin', current: false }
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
            path: "/authors-admin",
            element:
                <ProtectedRoute requiredRole={2}>
                    <ModalProvider>
                        <AuthorsAdmin />
                    </ModalProvider>
                </ProtectedRoute>
        },
        {
            path: "/books-admin",
            element:
                <ProtectedRoute requiredRole={2}>
                    <ModalProviderBooks>
                        <BooksAdmin />
                    </ModalProviderBooks>
                </ProtectedRoute>

        },
        {
            path: "/orders-admin",
            element:
                <ProtectedRoute requiredRole={2}>
                    <OrdersAdmin />
                </ProtectedRoute>
        },
        {
            path: "/reports-admin",
            element:
                <ProtectedRoute requiredRole={2}>
                    <ReportsAdmin />
                </ProtectedRoute>
        },
        {
            path: "/authors",
            element:
                <ProtectedRoute requiredRole={1}>
                    <Authors />
                </ProtectedRoute>
        },
        {
            path: "/books",
            element:
                <ProtectedRoute requiredRole={1}>
                    <Books />
                </ProtectedRoute>
        },
        {
            path: "/record",
            element:
                <ProtectedRoute requiredRole={1}>
                    <Record />
                </ProtectedRoute>
        },
        {
            path: "/cart",
            element:
                <ProtectedRoute requiredRole={1}>
                    <Cart />
                </ProtectedRoute>
        },
        {
            path: "/my-profile",
            element:
                <ProtectedRoute requiredRole={1}>
                    <Profile />
                </ProtectedRoute>
        },
        {
            path: "/author/:idAutor",
            element:
                <ProtectedRoute requiredRole={1}>
                    <Author />
                </ProtectedRoute>
        },
        {
            path: "/book/:idLibro",
            element:
                <ProtectedRoute requiredRole={1}>
                    <Book />
                </ProtectedRoute>
        },
        {
            // path: "/*",
            path: "/",
            element: <ProtectedRoute requiredRole={0} />,
        },
    ]
}