import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import customTheme from "./customTheme";
import { v4 as uuid } from "uuid";
import ResponsiveAppBar from "./Components/Navbar/Navbar";
import { Box } from "@mui/material";
import Sidebar from "./Components/Sidebar/Sidebar";
import ChatInput from "./Components/ChatInput/ChatInput";
import ChatBox from "./Components/ChatBox/ChatBox";

import { useState } from "react";
import { recentChats } from "./TemChats";

function App() {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState(recentChats);
  const [activeChatId, setActiveChatId] = useState("1");

  const currentChat = chats[activeChatId] ? chats[activeChatId].chats : [];

  const createNewChat = () =>{
    const chatId = uuid();
    setChats(prevChats => ({ ...prevChats, [chatId]: { heading: "New Chat", chats: [] } }));
    setActiveChatId(chatId);
  };

  const handlePromptChange = e => setPrompt(e.target.value);

  const submitPrompt = prompt => {
    console.log("Submitted", prompt);
  };

  const handleEnterPressed = e => {
    if (e.key === "Enter") {
      submitPrompt(prompt);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <ResponsiveAppBar />
      <Box sx={{ display: "grid", gridTemplateColumns: "300px 1fr" }}>
        <Sidebar activeChatId={activeChatId} setActiveChatId={setActiveChatId} chats={chats} createNewChat={createNewChat} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "20px 35px",
            boxSizing: "border-box",
          }}
        >
          {currentChat?.map(details => {
            return (
              <ChatBox isSystemGenerated={details?.isSystemGenerated} text={details?.message} />
            );
          })}
          <ChatInput prompt={prompt} onChange={handlePromptChange} onKeyDown={handleEnterPressed} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
