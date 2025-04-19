import { useNavigate } from "react-router-dom";
import g from "../global.module.css"; 

function SignOut() {
  const navigate = useNavigate();

  // remove the jwt-token from local storage
  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    // Provide user feedback in a less disruptive way
    alert("Logged out");
    navigate("/"); 
  };

  return (
    <button className={`${g["button"]}`} onClick={handleLogout}>
      Logout
    </button>
  );
}

export default SignOut;
