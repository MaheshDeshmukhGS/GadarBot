import React from "react";
import "./chatInput.css";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button } from "@mui/material";

const ChatInput = ({ prompt, onChange, setPrompt, onKeyDown, submitPrompt, placeholder, ...rest }) => {
  const handleOnClick = () => {
    submitPrompt(prompt);
    setPrompt("");
  };

  return (
    <Box sx={{ marginTop: "auto" }}>
      <Box
        sx={{
          width: "1000px",
          margin: "auto",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          borderRadius: "11px",
          background: "#FFF",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          padding: "0 1rem",
          position:"fixed",
          bottom:"0",
          left:"350px",
        }}
      >
        <input
          value={prompt}
          onChange={onChange}
          onKeyDown={onKeyDown}
          {...rest}
          placeholder={placeholder}
          type="text"
          className="chat_input"
        />
        <Button onClick={handleOnClick}>
          <SendIcon color="#d4cece" />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInput;
