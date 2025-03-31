import { BarChart3, X } from "lucide-react";
// import { useAuthStore } from "../../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";

import { Home, Users, FileText, Clock } from "lucide-react";

type SidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
};

const menuItems = [
	{ name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
	{ name: "Clientes", path: "/dashboard/clientes", icon: <Users size={20} />   },
	{ name: "Projetos", path: "/dashboard/projetos", icon: <FileText size={20} />  },
	{ name: "TimeSheet", path: "/dashboard/timesheet", icon: <Clock size={20} />  },
]

function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {

	const location = useLocation(); 

	
	
	return (
		<div
			className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-t from-slate-900 to-slate-700 p-2 transition-transform duration-300 ease-in-out ${
				sidebarOpen ? "translate-x-0" : "-translate-x-64"
			} md:relative md:translate-x-0`}
		>
			<div className="flex items-center justify-end">
				<button
				className="md:hidden mb-4 text-white"
				onClick={() => setSidebarOpen(false)}
				>
					<X size={26} className="text-end" />
				</button>
			</div>

			<div className="flex flex-col border-b-amber-50-200 border-b-2 p-4">
				<Link to="/dashboard">
					<button type="button" className="flex items-center gap-1">
						<BarChart3 className="h-5 w-5" />
						<span className="font-bold">FreelancerCRM</span>
					</button>
				</Link>
			</div>

			<nav className="flex flex-col pt-6 overflow-auto max-h-screen">
				<ul>
					{menuItems.map((item) => (
						<li key={item.path} className="flex gap-3">
							<Link
								to={item.path}
								className={`flex w-full items-center gap-3 p-2 rounded cursor-pointer ${
								location.pathname === item.path
									? "bg-white text-blue-900"
									: "hover:bg-zinc-400"
								}`}
							>
								{item.icon}
								<span>{item.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
    );
}


export default Sidebar