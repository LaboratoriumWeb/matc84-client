import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthLayout } from "./components/AuthLayout";
import { ForgotPassword } from "./components/ForgotPassword";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { UserList } from "./components/UserList.tsx";
import { AuthContext } from "./contexts/AuthContext.tsx";
import { Home } from "./pages/Home.tsx";

type AuthScreen = "login" | "register" | "forgot-password";

function App() {
  const { user, handleLogin, handleRegister } = useContext(AuthContext);
  const [authScreen, setAuthScreen] = React.useState<AuthScreen>("login");
  const [showUserList, setShowUserList] = useState(false);
  const isAuthenticated = user != null;

  const handleForgotPassword = (email: string) => {
    console.log("Password reset requested for:", email);
  };

  const authTitles = {
    login: "Bem-vindo de volta!",
    register: "Criar nova conta",
    "forgot-password": "Recuperar senha",
  };
  console.log("showUserList", showUserList);
  return (
    <>
      {/* <UserListButton setShowUserList={setShowUserList} /> */}
      {isAuthenticated ? (
        showUserList ? ( // Renderização condicional
          <UserList />
        ) : (
          <Home showUserList={showUserList} setShowUserList={setShowUserList} />
        )
      ) : (
        <AuthLayout title={authTitles[authScreen]}>
          {authScreen === "login" && (
            <Login
              onLogin={handleLogin}
              onSwitchToRegister={() => setAuthScreen("register")}
              onForgotPassword={() => setAuthScreen("forgot-password")}
            />
          )}
          {authScreen === "register" && (
            <Register
              onRegister={handleRegister}
              onSwitchToLogin={() => setAuthScreen("login")}
            />
          )}
          {authScreen === "forgot-password" && (
            <ForgotPassword
              onSubmit={handleForgotPassword}
              onBackToLogin={() => setAuthScreen("login")}
            />
          )}
        </AuthLayout>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
