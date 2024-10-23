import { LeaderBoardUser } from "@/api/adminDashboard";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<LeaderBoardUser>();

export const LeaderBoardDataColumn = [