import "./App.css";
import { PairingForm } from "./components/PairingForm";
import { PairingsTable } from "./components/PairingsTable";
import { leagues } from "./lib/leagues";
import { Toaster } from "sonner";

function App() {
    return (
        <>
            <PairingForm leagues={leagues} />
            <PairingsTable />
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
