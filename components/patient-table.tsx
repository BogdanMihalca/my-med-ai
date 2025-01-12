"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Download, Filter, Search } from "lucide-react";

export const columns: ColumnDef<{}>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-slate-200 hover:text-slate-50"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className={`capitalize px-2 py-1 ${getStatusColor(
            row.getValue("type")
          )}`}
        >
          {row.getValue("type")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: "Data",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-slate-200">{row.getValue("value")}</span>
        {isAbnormalValue(row.getValue("value")) && (
          <Badge variant="destructive" className="text-xs">
            Abnormal
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date Recorded",
    cell: ({ row }) => (
      <div className="text-slate-400 text-sm">
        {formatDate(row.getValue("date"))}
      </div>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge variant="secondary" className="bg-slate-700">
        {row.getValue("source")}
      </Badge>
    ),
  },
];

export function PatientTable({
  data,
  onEdit,
  onDelete,
  onExport,
}: {
  data: { type: string; value: string; date: string; source: string }[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onExport?: (type: string) => void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ""}
            onChange={(event: any) => setGlobalFilter(event.target.value)}
            className="max-w-sm bg-slate-800 border-slate-700"
          />
        </div>
        <Button
          variant="outline"
          className="bg-slate-800 border-slate-700"
          onClick={() => onExport && onExport("csv")}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-800/50 shadow-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-slate-700">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-slate-200 bg-slate-800"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-slate-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-400"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Helper functions
function getStatusColor(type: string) {
  const colors: { [key: string]: string } = {
    vital: "text-green-400 border-green-400",
    medication: "text-blue-400 border-blue-400",
    diagnosis: "text-yellow-400 border-yellow-400",
    allergy: "text-red-400 border-red-400",
  };
  return colors[type.toLowerCase()] || "text-slate-400 border-slate-400";
}

function isAbnormalValue(value: string) {
  // Add your logic to determine abnormal values
  return value.includes("High") || value.includes("Low");
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
