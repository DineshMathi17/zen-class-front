import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/signin";
import Stucapstone from "./Pages/Capstone/Stucapstone";
import Capstone from "./Pages/Capstone/Capstone";
import Batches from "./Pages/Batches/Bactches";
import Event from "./Pages/EventManage/Events";
import Home from "./Pages/Home/Home";
function App() {
  

  return (
    <div className="App mx-5">
      <Routes>
        
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/eventManage" element={<Event/> }/>
            <Route path="/stucapstone" element={<Stucapstone />} />
            <Route path="/home/capstone/:userId" element={<Capstone/>} />
            <Route path="/batchCreate" element={<Batches />} />
          </>
       
      </Routes>
    </div>
  );
}

export default App;