import type { DashboardSummary } from "../types/dashboard-summary.type"; 
import { api } from "@/lib/api";

export async function getDashboardSummary(token: string) {
  return api<DashboardSummary>("/dashboard/summary", {
    method: "GET",
    token,
  });
}