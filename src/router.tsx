import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProtectedRoute from './components/protetctedRote.tsx';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Login/>,
	},
	{
		path: '/main',
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
	},
]);

