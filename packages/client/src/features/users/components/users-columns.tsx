import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { User } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { name } = row.original;
      return <LongText className="max-w-36">{name}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("email")}</div>
    ),
  },
  {
    id: "age",
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => {
      const { age } = row.original;
      return <LongText className="max-w-36">{age}</LongText>;
    },
    meta: { className: "w-36" },
  },
  {
    id: "mobile",
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div>{row.getValue("mobile")}</div>,
    enableSorting: false,
  },
  {
    id: "interests",
    accessorKey: "interests",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interests" />
    ),
    cell: ({ row }) => {
      const interests = row.getValue<string[]>("interests") || [];
      if (interests.length === 0) {
        return <span className="text-gray-400">—</span>;
      }
      return (
        <div className="flex flex-wrap gap-1">
          {interests.map(({ name, badgeColor }: any) => (
            <Badge key={name} className={cn('capitalize', badgeColor)}>{name}</Badge>
          ))}
        </div>
      );
    },
    // enableSorting: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
