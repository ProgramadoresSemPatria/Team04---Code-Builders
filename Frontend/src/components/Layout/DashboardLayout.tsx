

import {useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';



const DashboardLayout = () =>{

    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    return (
		<div className="flex h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white">
			
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<div className="flex flex-col flex-1">
				<Header setSidebarOpen={setSidebarOpen} />
				<main className="flex-1   px-3 md:px-6  bg-white text-blue-900 overflow-auto">
					
					<Outlet />
					
				</main>
			</div>
		</div>
    );
  }


export default DashboardLayout
