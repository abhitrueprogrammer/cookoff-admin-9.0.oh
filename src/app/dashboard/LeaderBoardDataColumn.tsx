import { LeaderBoardUser } from "@/api/adminDashboard";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<LeaderBoardUser>();

export const LeaderBoardDataColumn = [] as ColumnDef<LeaderBoardUser>[];
