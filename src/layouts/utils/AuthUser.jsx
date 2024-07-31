import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const secretKey = import.meta.env.VITE_SECRET_KEY;

  let decryptedData = null;
  let decodedToken = null;

  if (token) {
    try {
      const bytes = CryptoJS.AES.decrypt(
        token.replace(/^"|"$/g, ""),
        secretKey
      );
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      decodedToken = jwtDecode(decryptedData);
    } catch (error) {
      console.error("Failed to decrypt or decode token:", error);
    }
  }

  useEffect(() => {
    if (
      decodedToken &&
      decodedToken.exp &&
      decodedToken.exp < Date.now() / 1000
    ) {
      localStorage.removeItem("theme");
      localStorage.removeItem("token");
      navigate("/login", { state: { isExpired: true } });
    }
  }, [decodedToken, navigate]);

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
