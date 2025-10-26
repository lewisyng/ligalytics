import React, { useMemo, useState, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
    flexRender,
    createColumnHelper,
    type SortingState,
    type GroupingState,
    type ExpandedState,
} from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { PairingsTableSortButton } from "./PairingsTableSortButton";

export interface Pairing {
    id: number;
    teamA: string;
    teamB: string;
    startDate: Date;
    endDate: Date;
    rule: string;
    commentary?: string;
    createdAt: string;
}

const columnHelper = createColumnHelper<Pairing>();

export const PairingsTable: React.FC = () => {
    const [pairings, setPairings] = useState<Pairing[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [grouping, setGrouping] = useState<GroupingState>([]);
    const [expanded, setExpanded] = useState<ExpandedState>({});

    // Load pairings from localStorage
    useEffect(() => {
        const loadPairings = () => {
            const storedPairings = localStorage.getItem("pairings");
            if (storedPairings) {
                const parsedPairings = JSON.parse(storedPairings).map(
                    (pairing: any) => ({
                        ...pairing,
                        startDate: new Date(pairing.startDate),
                        endDate: new Date(pairing.endDate),
                    }),
                );
                setPairings(parsedPairings);
            }
        };

        loadPairings();

        // Listen for storage changes to update the table when new pairings are added
        const handleStorageChange = () => {
            loadPairings();
        };

        window.addEventListener("storage", handleStorageChange);

        // Also listen for custom event when pairing is added in the same tab
        window.addEventListener("pairingsUpdated", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("pairingsUpdated", handleStorageChange);
        };
    }, []);

    const columns = useMemo(
        () => [
            columnHelper.accessor("teamA", {
                id: "teamA",
                header: ({ column }) => (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span>Team A</span>

                        <PairingsTableSortButton column={column} />

                        <Button
                            variant={
                                grouping.includes("teamA")
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => {
                                const isGrouped = grouping.includes("teamA");
                                if (isGrouped) {
                                    setGrouping(
                                        grouping.filter((g) => g !== "teamA"),
                                    );
                                } else {
                                    setGrouping([...grouping, "teamA"]);
                                }
                            }}
                            className="h-6 px-2 text-xs text-white hover:text-white"
                        >
                            {grouping.includes("teamA") ? "Ungr." : "Gr."}
                        </Button>
                    </div>
                ),
                cell: (info) => info.getValue(),
                enableGrouping: true,
            }),
            columnHelper.accessor("teamB", {
                id: "teamB",
                header: ({ column }) => (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span>Team B</span>

                        <PairingsTableSortButton column={column} />

                        <Button
                            variant={
                                grouping.includes("teamB")
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => {
                                const isGrouped = grouping.includes("teamB");
                                if (isGrouped) {
                                    setGrouping(
                                        grouping.filter((g) => g !== "teamB"),
                                    );
                                } else {
                                    setGrouping([...grouping, "teamB"]);
                                }
                            }}
                            className="h-6 px-2 text-xs text-white hover:text-white"
                        >
                            {grouping.includes("teamB") ? "Ungr." : "Gr."}
                        </Button>
                    </div>
                ),
                cell: (info) => info.getValue(),
                enableGrouping: true,
            }),
            columnHelper.accessor("startDate", {
                id: "startDate",
                header: ({ column }) => (
                    <div className="flex items-center gap-1">
                        <span>Start Date</span>

                        <PairingsTableSortButton column={column} />
                    </div>
                ),
                cell: (info) => format(info.getValue(), "PP"),
                enableGrouping: false,
            }),
            columnHelper.accessor("endDate", {
                id: "endDate",
                header: ({ column }) => (
                    <div className="flex items-center gap-1">
                        <span>End Date</span>

                        <PairingsTableSortButton column={column} />
                    </div>
                ),
                cell: (info) => format(info.getValue(), "PP"),
                enableGrouping: false,
            }),
            columnHelper.accessor("rule", {
                id: "rule",
                header: ({ column }) => (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span>Rule</span>

                        <PairingsTableSortButton column={column} />

                        <Button
                            variant={
                                grouping.includes("rule")
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => {
                                const isGrouped = grouping.includes("rule");
                                if (isGrouped) {
                                    setGrouping(
                                        grouping.filter((g) => g !== "rule"),
                                    );
                                } else {
                                    setGrouping([...grouping, "rule"]);
                                }
                            }}
                            className="h-6 px-2 text-xs text-white hover:text-white"
                        >
                            {grouping.includes("rule") ? "Ungr." : "Gr."}
                        </Button>
                    </div>
                ),
                cell: (info) => (
                    <div className="max-w-xs truncate" title={info.getValue()}>
                        {info.getValue()}
                    </div>
                ),
                enableGrouping: true,
            }),
            columnHelper.accessor("commentary", {
                id: "commentary",
                header: ({ column }) => (
                    <div className="flex items-center gap-1">
                        <span>Commentary</span>

                        <PairingsTableSortButton column={column} />
                    </div>
                ),
                cell: (info) => (
                    <div
                        className="max-w-xs truncate"
                        title={info.getValue() || ""}
                    >
                        {info.getValue() || "-"}
                    </div>
                ),
                enableGrouping: false,
            }),
        ],
        [grouping],
    );

    const table = useReactTable({
        data: pairings,
        columns,
        state: {
            sorting,
            grouping,
            expanded,
        },
        onSortingChange: setSorting,
        onGroupingChange: setGrouping,
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    if (pairings.length === 0) {
        return (
            <div className="w-full p-8">
                <h2 className="text-2xl font-bold mb-4">Team Pairings</h2>
                <div className="text-center py-8 text-gray-500">
                    No pairings found. Add some pairings using the form above.
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1000px] py-4 md:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    Team Pairings
                </h2>

                {grouping.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-lg">
                        <span>
                            Grouped by: <strong>{grouping.join(", ")}</strong>
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGrouping([])}
                            className="h-6 px-2 text-xs"
                        >
                            Clear Groups
                        </Button>
                    </div>
                )}
            </div>

            <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full table-auto min-w-max">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="border-b bg-linear-to-r from-gray-50 to-gray-100"
                            >
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-left p-3 md:p-4 font-semibold text-gray-900 whitespace-nowrap min-w-fit"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {table.getRowModel().rows.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`
                  transition-colors hover:bg-gray-50
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  ${row.getIsGrouped() ? "bg-blue-50/80 hover:bg-blue-100/80" : ""}
                `}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="p-3 md:p-4 text-sm text-gray-900 max-w-xs text-left"
                                    >
                                        {cell.getIsGrouped() ? (
                                            <div className="flex items-center">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={row.getToggleExpandedHandler()}
                                                    className="mr-2 h-8 w-8 p-0 hover:bg-blue-200"
                                                >
                                                    {row.getIsExpanded() ? (
                                                        <ChevronDown className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <div className="font-semibold text-blue-700">
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                    <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                                                        {row.subRows.length}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : cell.getIsAggregated() ? (
                                            flexRender(
                                                cell.column.columnDef
                                                    .aggregatedCell ??
                                                    cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )
                                        ) : cell.getIsPlaceholder() ? null : (
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
