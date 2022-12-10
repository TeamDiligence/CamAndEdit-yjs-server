#!/usr/bin/env node

/**
 * @type {any}
 */
const WebSocket = require("ws");
const http = require("http");
const wss = new WebSocket.Server({ noServer: true });
const setupWSConnection = require("./utils.js").setupWSConnection;
const express = require('express');

const port = process.env.PORT || 5000;
const app = express();


const server = http.createServer(app);

wss.on("connection", setupWSConnection);

server.on("upgrade", (request, socket, head) => {
  // You may check auth of request here..
  // See https://github.com/websockets/ws#client-authentication
  /**
   * @param {any} ws
   */
  const handleAuth = (ws) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

server.listen(port, () => {
  console.log(`running at  on port ${port}`);
});
