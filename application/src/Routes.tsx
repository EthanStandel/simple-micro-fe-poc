import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { TeamOneRoutes } from "@ethan/team-one";
import { TeamTwoRoutes } from "@ethan/team-two";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to={"/team-one"} />} />
        {TeamOneRoutes()}
        {TeamTwoRoutes()}
      </Routes>
    </BrowserRouter>
  );
}