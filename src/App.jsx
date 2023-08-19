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

const API_URL = "https://izyu1i70fl.execute-api.ap-south-1.amazonaws.com/v1";

function App() {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState(recentChats);
  const [activeChatId, setActiveChatId] = useState("1");
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [showTickets, setShowTickets] = useState({
    status: false,
    isResolved: false,
  });

  const { isResolved, status } = showTickets;

  const currentChat = chats[activeChatId] ? chats[activeChatId]?.chats : [];

  console.log(showTickets, "showTickets");

  const createNewChat = () => {
    const chatId = uuid();
    setChats(prevChats => ({
      ...prevChats,
      [chatId]: { id: chatId, heading: "New Chat", chats: [] },
    }));
    setActiveChatId(chatId);
  };

  const handlePromptChange = e => setPrompt(e.target.value);

  const postPrompt = async prompt => {
    try {
      const apiRes = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          // message_history: JSON.stringify(currentChat),
          prompt: prompt,
        }),
      });
      const apiData = await apiRes.json();

      setChats(prevChats => {
        const chats = prevChats;
        const activeChat = chats[activeChatId];
        const heading = activeChat.length === 0 ? `${prompt.substring(0, 30)}...` : activeChat?.heading;

        return {
          ...chats,
          [activeChatId]: {
            ...activeChat,
            heading,
            chats: [...activeChat.chats, { isSystemGenerated: true, message: apiData?.content }],
          },
        };
      });

      setLoading(false);

      return apiData;
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const submitPrompt = async prompt => {
    setLoading(true);

    setChats(prevChats => ({
      ...prevChats,
      [activeChatId]: {
        ...prevChats[activeChatId],
        chats: [...prevChats[activeChatId]?.chats, { isSystemGenerated: false, message: prompt }],
      },
    }));

    postPrompt(prompt);
  };

  const handleEnterPressed = e => {
    if (e.key === "Enter") {
      submitPrompt(prompt);
      setPrompt("");
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <ResponsiveAppBar setShowTickets={setShowTickets} />
      {!status ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "300px 1fr" }}>
          <Sidebar
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            chats={chats}
            createNewChat={createNewChat}
          />
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
            <Box
              className="chat_container"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                height: "75vh",
                overflow: "scroll",
              }}
            >
              {currentChat?.map(details => {
                return (
                  <ChatBox isSystemGenerated={details?.isSystemGenerated} text={details?.message} />
                );
              })}
            </Box>

            <ChatInput
              prompt={prompt}
              placeholder={loading ? "Generating response..." : "Type Anything..."}
              onChange={handlePromptChange}
              onKeyDown={handleEnterPressed}
              submitPrompt={submitPrompt}
              setPrompt={setPrompt}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 72px)",
          }}
        >
          Coming Soon...
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;