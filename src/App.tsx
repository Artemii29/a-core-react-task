import './App.css';
import {RouterProvider} from 'react-router-dom';
import {router} from './router.tsx';
import * as React from 'react';

function App() {
	
	return <RouterProvider router={router}/>;
}

export default App;
