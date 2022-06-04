import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TeamOneRoutes } from "./TeamOneRoutes";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to="/team-one" />} />
        {TeamOneRoutes()}
      </Routes>
    </BrowserRouter>
  )
}