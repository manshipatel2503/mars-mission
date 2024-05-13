// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import MissionManagerPage from "./components/ManageMission/MissionManager";
import AddEditMission from "./components/AddEditMission/AddEditMission";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c75c5cfc",
    },
  },
});
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS */}
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/mission-manager" element={<MissionManagerPage />} />
            <Route path="/add-mission" element={<AddEditMission />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
