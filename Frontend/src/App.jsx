import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CreateRule from "./components/CreateRule";
import CombineRules from "./components/CombineRules";
import EvaluateRule from "./components/EvaluateRule";
import DisplayRules from "./components/DisplayRules";
import Layout from "./layout/layout";
import GetAllRules from './components/GetAllRules'

import ModifyRule from "./components/ModifyRule";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route element={<Layout/>}>
          <Route path="/"                 element={<CreateRule/>} />
          <Route path="/combine-rules" element={<CombineRules/>} />
          <Route path="/evaluate-rule" element={<EvaluateRule/>} />
          <Route path="/display-rules" element={<DisplayRules/>} />
          <Route path="/modify-rules" element={<ModifyRule/>} />
          <Route path="/getall-rules" element={<GetAllRules/>} />


          </Route>
        </Routes>
    </Router>
  );
};

export default App;
