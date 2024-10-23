import { handleAPIError } from "@/lib/error";
import api from ".";
import { generateSampleLeaderboard as generateSampleLeaderBoard } from "./sampleData";

export interface RoundParams {
  round_id: number;
}

export interface LeaderBoardUser {
  ID: string;
  Name: string;
  Score: number | null;
}

export async function RoundEnable(data: RoundParams) {
  try {
    const response = await api.post<{ message: string }>("/round/enable", data);
    return response.data;
  } catch (e) {
    console.log(e);
    throw handleAPIError(e);
  }
}

export async function GetLeaderBoard() {
  try {
    // const response = await api.get<LeaderBoardUser[]>("/leaderboard");
    // return response.data;
    return generateSampleLeaderBoard()
  } catch (e) {
    throw handleAPIError(e);
  }
}
