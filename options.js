document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("options-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const apiKey = document.getElementById("api-key").value;
      chrome.storage.sync.set({ apiKey }, () => {
        alert("API key saved!");
      });
    });

  chrome.storage.sync.get("apiKey", (data) => {
    if (data.apiKey) {
      document.getElementById("api-key").value = data.apiKey;
    }
  });
});

const promptsContainer = document.getElementById("prompts-container");
const addPromptBtn = document.getElementById("add-prompt");

//checks if saved code exists
//addPormptBtn
addPromptBtn.addEventListener("click", () => {
  // Add a new input field
  const newPromptField = document.createElement("div");
  promptsContainer.appendChild(newPromptField);
  const newPromptInput = document.createElement("input");
  newPromptInput.type = "text";
  newPromptInput.name = "prompt[]"; // Use array notation for dynamic input names
  newPromptInput.classList.add("new-prompt")
  newPromptField.appendChild(newPromptInput);

  // Add a "Remove" button to the new input field
  const removePromptBtn = document.createElement("button");
  removePromptBtn.textContent = "Remove";
  newPromptInput.classList.add("delete-prompt")
  newPromptField.appendChild(removePromptBtn);

  // Add event listener to the "Remove" button
  removePromptBtn.addEventListener("click", () => {
    newPromptInput.remove();
    removePromptBtn.remove();
    localStorage.removeItem("myCode");
    localStorage.setItem("myCode", newPromptField.innerHTML);
  });
  localStorage.setItem("myCode", newPromptField.innerHTML);
});
/*
Things to work on:
- UI
- Custom prompts 
- integration across all sites 

Bugs to fix:
- need to reload 
- cuts off text 
- can’t delete text 
- main prompts not working
*/