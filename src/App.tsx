import "./App.css";
import { PairingForm } from "./components/PairingForm";
import { leagues } from "./lib/leagues";
import { Toaster } from "sonner";

function App() {
    return (
        <>
            <PairingForm leagues={leagues} />
            <Toaster
                position="top-right"
                richColors
                expand={false}
                duration={4000}
            />
        </>
    );
}

export default App;
