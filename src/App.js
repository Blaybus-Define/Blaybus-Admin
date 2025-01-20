import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { Toaster } from "react-hot-toast";
import { customAxios, setupInterceptors } from "./customAxios";
import NewMain from "./components/NewMain";

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // Interceptor 초기화
  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isLogin) return;
      try {
        const response = await customAxios.get("/members/info");
        if (response.status === 200) {
          setIsLogin(true);
        }
        console.log("로그인중");
      } catch (error) {
        console.error("login state error: ", error);
      }
    };
    checkLoginStatus();
  }, [isLogin]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Header />
              <NewMain />
            </div>
          }
        />
        <Route
          path="/login"
          element={<LoginScreen setIsLogin={setIsLogin} />}
        />
      </Routes>
    </>
  );
}

export default App;
