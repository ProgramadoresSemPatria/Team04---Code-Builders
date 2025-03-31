import { Menu ,LogOut ,Settings,User} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link } from "react-router-dom";



type HeaderProps = {
    setSidebarOpen: (open: boolean) => void;
};
  
const Header = ({ setSidebarOpen }: HeaderProps)=> {

    const { logout,authuser } = useAuthStore();
	const [open, setOpen] = useState(false);


	

    return (
		<header className="w-full bg-[#FFFFFF] border-b border-solid border-b-blue-100/500  text-blue-900 shadow-md py-2 px-1  md:px-4 md:py-4 flex items-center justify-between">
			<button className="md:hidden" onClick={() => setSidebarOpen(true)}>
				<Menu size={24} />
			</button>

			<h1 className="text-xl font-bold">{authuser?.name}</h1>


			<DropdownMenu open={open} onOpenChange={setOpen} >
				<DropdownMenuTrigger asChild className="cursor-pointer mr-3">
					
					<User  className="w-10 h-10 p-1 border-2 border-gray-500 rounded-3xl" />
					
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="min-w-[220px] p-2">
					<DropdownMenuLabel className="text-lg font-bold">Opções</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuItem className="flex items-center gap-3 p-3 text-lg ">
						<Link to={'/dashboard/perfil'} className="flex items-center w-full gap-3">
								<Settings className="w-5 h-5" /> Perfil
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem onClick={logout} className="flex items-center gap-3 p-3 text-lg">
						<LogOut className="w-5 h-5" /> Sair
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
      		{/* <Button color="secondary" onClick={logout} >Sair <LogOut className=" h-4 w-4" /> </Button> */}
		
		</header>
    );
  }


  export default Header