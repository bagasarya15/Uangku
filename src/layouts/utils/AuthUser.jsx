import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(token.replace(/^"|"$/g, ""), secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let decodedToken;

  try {
    decodedToken = token ? jwtDecode(decryptedData) : null;
  } catch (error) {
    console.error("Invalid token:", error);
  }

  useEffect(() => {
    const decodedToken = token ? jwtDecode(decryptedData) : null;
    if (
      decodedToken &&
      decodedToken.exp &&
      decodedToken.exp < Date.now() / 1000
    ) {
      localStorage.removeItem("token");
      navigate("/login", { state: { isExpired: true } });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { state: { isLogout: true } });
  };

  return {
    token,
    user: decodedToken,
    logout: handleLogout,
  };
};

export default AuthUser;
