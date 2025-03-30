import { Toaster } from "react-hot-toast";
import RoutesComponent from "./routes/routes";
import { BrowserRouter } from "react-router-dom";

const App =() => {
	return (
		<div>
			<Toaster 
				position="top-center" 
				reverseOrder={false} 
				toastOptions={{
					duration: 4000
				}}
			/>
			<BrowserRouter>	

				<RoutesComponent />	
			</BrowserRouter>
		</div>
		
	)
}


export default App