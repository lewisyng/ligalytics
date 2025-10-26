import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import type { Column } from "@tanstack/react-table";
import type { Pairing } from "./PairingsTable";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const PairingsTableSortButton = ({
    column,
}: {
    column: Column<Pairing, string | Date | undefined>;
}) => {
    const getTooltipText = () => {
        const sortState = column.getIsSorted();
        if (sortState === "asc") {
            return "Absteigend sortieren";
        } else if (sortState === "desc") {
            return "Sortierung entfernen";
        } else {
            return "Aufsteigend sortieren";
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="h-8 p-2! text-white hover:text-white"
                >
                    {column.getIsSorted() === "asc" ? (
                        <ArrowUp className="text-white" />
                    ) : column.getIsSorted() === "desc" ? (
                        <ArrowDown className="text-white" />
                    ) : (
                        <ArrowUpDown className="text-white" />
                    )}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{getTooltipText()}</p>
            </TooltipContent>
        </Tooltip>
    );
};
