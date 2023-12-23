import { useLocation, Navigate } from 'react-router-dom';
import useGlobalStore from '../stores/global';

export default function Auth({ children }) {
    const location = useLocation();
    const { auth_user } = useGlobalStore(state => state.data);
    if (!auth_user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
}