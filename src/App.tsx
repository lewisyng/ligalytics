import "./App.css";
import { PairingForm } from "./components/PairingForm";
import { leagues } from "./lib/leagues";

function App() {
    return <PairingForm leagues={leagues} />;
}

export default App;
