import React from "react";
import "./chatInput.css";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";

const ChatInput = ({ prompt, onChange,onKeyDown, ...rest }) => {
  return (
    <Box sx={{ marginTop: "auto" }}>
      <Box
        sx={{
          width: "800px",
          margin: "auto",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          borderRadius: "11px",
          background: "#FFF",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          padding: "0 1rem",
        }}
      >
        <input
          value={prompt}
          onChange={onChange}
          onKeyDown={onKeyDown}
          {...rest}
          placeholder="Type Anything..."
          type="text"

          className="chat_input"
        />
        <SendIcon color="#d4cece" />
      </Box>
    </Box>
  );
};

export default ChatInput;
