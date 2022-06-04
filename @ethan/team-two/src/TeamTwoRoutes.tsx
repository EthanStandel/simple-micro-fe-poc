import { Route } from "react-router-dom";
import { TeamTwoMainPage } from "./pages/TeamTwoMainPage";
import { TeamTwoSecondaryPage } from "./pages/TeamTwoSecondaryPage";

export const TeamTwoRoutes = () => {
  return [
    <Route key="team-two" path="team-two" element={<TeamTwoMainPage />} />,
    <Route key="team-two-secondary" path="team-two-secondary" element={<TeamTwoSecondaryPage />} />
  ];
}