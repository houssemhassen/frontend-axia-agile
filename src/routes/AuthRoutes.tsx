
import { Route } from "react-router-dom";
import ApprovalStatus from "@/pages/ApprovalStatus";
import { Navigate } from "react-router-dom";

export const AuthRoutes = [
  <Route key="approval-status" path="/approval-status" element={<ApprovalStatus />} />,
  // Add a fallback route for /login that redirects to home
  <Route key="login" path="/login" element={<Navigate to="/" replace />} />,
];
