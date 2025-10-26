import "./App.css";
import { useState } from "react";
import { PairingForm } from "./components/PairingForm";
import { PairingsTable } from "./components/PairingsTable";
import { leagues } from "./lib/leagues";
import { Toaster } from "sonner";
import { Button } from "./components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./components/ui/dialog";
import { Plus } from "lucide-react";

function App() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="min-h-screen w-full p-8">
            {/* Header Section */}
            <header className="mb-8 border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Pairing
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Create New Pairing</DialogTitle>

                                <DialogDescription>
                                    Set up a new team pairing rule with specific
                                    dates and constraints.
                                </DialogDescription>
                            </DialogHeader>

                            <PairingForm
                                leagues={leagues}
                                onSuccess={handleFormSuccess}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </header>

            <PairingsTable />
            <Toaster
                position="top-right"
                richColors
                expand={false}
                duration={4000}
            />
        </div>
    );
}

export default App;
