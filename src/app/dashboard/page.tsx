"use client";
import { GetLeaderBoard, LeaderBoardUser } from "@/api/adminDashboard";
import Round from "@/components/round";
import ClientTable from "@/components/Table/ClientTable";
import { useQuery } from "@tanstack/react-query";
import { LeaderBoardDataColumn } from "./LeaderBoardDataColumn";
function Dashboard() {
  const { data, error, isLoading } = useQuery<LeaderBoardUser[], Error>({
    queryKey: ["leaderboard"],
    queryFn: GetLeaderBoard,
  });
  return (
    <div className="min-h-screen text-white">
        <div className="border-gray-300-4 relative  w-full rounded-md border shadow-md p-10">
          <span className="absolute -top-3 left-4 bg-black px-2 text-lg font-semibold text-white">
            Round Select
          </span>

          <Round />
        </div>

      <div className="m-3 text-lg font-semibold">Leader Board</div>
      <div className="w-full">
        <ClientTable
          data={data}
          error={error}
          isLoading={isLoading}
          columns={LeaderBoardDataColumn}
        />
      </div>
    </div>
    
  );
}

export default Dashboard;
