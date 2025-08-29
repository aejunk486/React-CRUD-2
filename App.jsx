import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import MemberList from "./pages/MemberList";
import InsertMember from "./pages/InsertMember";
import ManageMember from "./pages/ManageMember";

function App() {
 
  return (
    <div style={{ padding: "1rem" }}>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memberListpage" element={<MemberList />} />
        <Route path="/insertmemberpage" element={<InsertMember />} />
        <Route path="/manageMemberpage" element={<ManageMember />} />
      </Routes>
    </div>
  );
}

export default App;
