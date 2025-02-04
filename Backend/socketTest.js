const { io } = require("socket.io-client");

// Replace with your actual backend URL
const socket = io("http://localhost:3000", {
    transports: ["websocket"]
});

socket.on("connect", () => {
    console.log("✅ Connected to server:", socket.id);

    // Example: Join event
    socket.emit("join", { userId: "123", userType: "user" });

    // Example: Send message
    setTimeout(() => {
        socket.emit("send-message", {
            receiverId: "456",
            message: "Hello, Captain!"
        });
    }, 2000);
});

// Listen for messages
socket.on("receive-message", (data) => {
    console.log("📩 Message received:", data);
});

// Listen for captain location updates
socket.on("location-updated", (data) => {
    console.log("📍 Captain location updated:", data);
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected from server.");
});