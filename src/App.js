import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Status from "./Components/Status/Status";
import StatusViewer from "./Components/Status/StatusViewer";
import Signin from "./Register/Signin";
import Signup from "./Register/Signup";
import Profile from "./Components/Profile/Profile";


function App() {
  
  return (
    <div >
      <Routes>

        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/ststus" element={<Status/>}></Route>
        <Route path="/ststus/:userId" element={<StatusViewer/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
