import { useState, useEffect } from "react";

const useUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://employee-management-server-nine.vercel.app/users")
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return users;
};

export default useUser;
