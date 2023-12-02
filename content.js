let port = chrome.runtime.connect({name: "regularUpdate"});

port.onMessage.addListener(msg => {
  if (msg.message) {
    console.log(msg.message); 
  }
});

// Handle disconnect if needed
port.onDisconnect.addListener(() => {
  console.log("Disconnected");
});

