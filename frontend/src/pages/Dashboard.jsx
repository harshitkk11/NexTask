import axios from "axios";
import Button from "../components/Button";
import { useData } from "../hooks/DataProvider";

const Dashboard = () => {
  const { userData } = useData();
  console.log(userData.name);

  const handleLogout = async() => {
    const response = await axios.get("/logout");

    if (response.data.message === "Logged out successfully") {
      localStorage.removeItem("islogin");
      window.location.reload();
    }
  }

  return (
    <main className="bg-background-light dark:bg-background-dark">
      {userData && <p>{userData.name}</p>}
      <Button title="Log Out" onclick={handleLogout} />
    </main>
  );
};

export default Dashboard;
