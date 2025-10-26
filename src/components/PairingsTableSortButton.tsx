import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import type { Column } from "@tanstack/react-table";
import type { Pairing } from "./PairingsTable";

export const PairingsTableSortButton = ({
    column,
}: {
    column: Column<Pairing, string | Date | undefined>;
}) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
    );
};
