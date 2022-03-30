import { createContext, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./Components/Home/Edit/Edit";
import Home from "./Components/Home/Home";
export const UserContext = createContext();

function App() {
  const [specificId, setSpecificId] = useState({});
  const [showModal, setShowModal] = useState(false);
  return (
    <UserContext.Provider
      value={{
        specific: [specificId, setSpecificId],
        modals: [showModal, setShowModal],
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
