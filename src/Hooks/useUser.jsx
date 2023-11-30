import { useState, useEffect } from "react";

const useUser = () => {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return users;
};

export default useUser;
