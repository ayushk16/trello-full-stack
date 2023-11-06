import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Home from './pages/Home';
import Board from './pages/Board';
import CardDetails from './components/Cards/CardDetails';
import AddItem from './components/common/AddItem';
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/boards" element={<Home />}></Route>
        <Route path="boards/:id" element={<Board />}></Route>
        {/* <Route path="tests" element={<GetBoard />}></Route> */}
        <Route path="card/:id" element={<CardDetails />}></Route>
        <Route
          path="*"
          element={
            <>
              <div>page not found!</div>
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
