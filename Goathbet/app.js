// URL que você pegou
const WS_URL = "wss://ws-xc23g7v303.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNjhiMzBlZmM5YmUxN2YxYjBiMWRlZjA3IiwibWV0YWRhdGEiOnsidGVuYW50IjoiNjhhZTA4N2ZlMWMyZTBhN2Y0YTFiODdhIiwicGxheWVySUQiOiI2NTVmZjNmYzU3ZDZhZWM4MzM3ZjY5NjEiLCJpc0RlbW8iOmZhbHNlLCJjdXJyZW5jeSI6eyJfaWQiOiI2NDFjZTExODI1MjU2N2ViMjQ4MzdkMzQiLCJzeW1ib2wiOiJSJCIsImNvZGUiOiJCUkwiLCJuYW1lIjoicmVhbCJ9fSwiaWF0IjoxNzU2NTY1MjQ0LCJleHAiOjE3OTk3NjUyNDR9.sucwXmkLSDzDtrvCu7O2xugt_BZgB68VSdoCOQNkIe8
Request Method:
";

const statusDiv = document.getElementById("status");
const historyList = document.getElementById("history");

function connectWebSocket() {
  try {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      statusDiv.textContent = "✅ Conectado ao servidor!";
    };

    socket.onerror = (err) => {
      statusDiv.textContent = "❌ Erro de conexão (veja Console)";
      console.error("Erro WebSocket:", err);
    };

    socket.onclose = () => {
      statusDiv.textContent = "⚠️ Conexão fechada. Tentando reconectar...";
      setTimeout(connectWebSocket, 3000); // tenta de novo
    };

    socket.onmessage = (event) => {
      console.log("Mensagem recebida:", event.data);

      // Exemplo simples: jogar o que vier na tela
      const li = document.createElement("li");
      li.textContent = event.data;
      historyList.prepend(li);
    };
  } catch (e) {
    console.error("Falha ao conectar:", e);
    statusDiv.textContent = "❌ Falha inesperada";
  }
}

// conecta assim que abrir a página
connectWebSocket();
