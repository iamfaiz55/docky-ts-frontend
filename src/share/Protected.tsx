import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';
import { useGetDocsQuery } from '../redux/apis/docApi';
import { useLogoutMutation } from '../redux/apis/authApi';

interface ProtectedProps {
    compo: React.ReactNode; 
}

const Protected: React.FC<ProtectedProps> = ({ compo }) => {
    const { error } = useGetDocsQuery();
    const [logout] = useLogoutMutation();
    const { user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (error) {
            if ('status' in error && error.status === 419) {
                logout("");
            }
        }
    }, [error, logout]);

    return user ? <>{compo}</> : <Navigate to="/login" />;
};

export default Protected;
