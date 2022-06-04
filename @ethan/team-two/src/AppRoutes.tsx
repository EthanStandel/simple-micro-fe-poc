import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TeamTwoRoutes } from "./TeamTwoRoutes";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to="/team-two" />} />
        {TeamTwoRoutes()}
      </Routes>
    </BrowserRouter>
  )
}