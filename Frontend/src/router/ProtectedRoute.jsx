import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth';

export const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.type !== requiredRole) {
            if (user.type === 2) {
                navigate('/home-admin', {
                    replace: true
                });
            } else if (user.type === 1) {
                navigate('/home-user', {
                    replace: true
                });
            }
        }
    }, [])
    
    return children;
};