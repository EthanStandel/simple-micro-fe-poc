import { Route } from "react-router-dom";
import { TeamOneMainPage } from "./pages/TeamOneMainPage";

export const TeamOneRoutes = () => {
  return [
    <Route key="team-one" path="team-one" element={<TeamOneMainPage />} />
  ];
}