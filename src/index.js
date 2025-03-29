import React, { useRef } from "react";
import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { UserProvider } from "./context/UserContext"
import { ChatProvider } from "./context/ChatContext"
import "./assets/styles/index.css"
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
)
