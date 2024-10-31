import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { roles } from '../constants/roles';

const useAuth = () => {
    const { token } = useSelector((state) => state?.auth);

    // Role values
    const ADMIN_ROLE = roles.ADMIN_ROLE;
    const USER_ROLE = roles.USER_ROLE;

    let status = '';
    let isAdmin = false;
    let isUser = false;
    let isLoggedIn = false;
    let firstName = '';
    let role = null;
    let loggedInUserId = null;
    let logId = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);


            firstName = decoded?.firstName;
            role = decoded?.role;
            loggedInUserId = decoded?.id;
            logId = decoded?._id;

            isAdmin = role === ADMIN_ROLE;
            isUser = role === USER_ROLE;

            if (isAdmin) status = 'Admin';
            if (isUser) status = 'User';
            if (role) isLoggedIn = true;
        } catch (error) {
            console.error("Token decoding error:", error);
        }
    }

    return { firstName, role, status, isAdmin, isUser, isLoggedIn, loggedInUserId, logId,token };
};

export default useAuth;
