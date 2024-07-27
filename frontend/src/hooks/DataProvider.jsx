import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useContext, createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    const fetchData = () => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            localStorage.setItem("islogedin", true);

            setUserData({
              name: user.displayName,
              email: user.email,
              id: user.uid,
            });
          } else {
            localStorage.removeItem("islogedin");
          }
        });
      } catch (err) {
        toast.error("Something went wrong!!");
        console.log(err);
      }
    };

    fetchData();
  }, [auth]);

  return (
    <DataContext.Provider value={{ userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => {
  return useContext(DataContext);
};
