import {Navigate} from 'react-router-dom';

type ProtectedRouteProps = {
	children: React.ReactElement;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
	const token = localStorage.getItem('token');
	
	if (!token) {
		return <Navigate to="/" />;
	}
	
	return children;
};

export default ProtectedRoute;
