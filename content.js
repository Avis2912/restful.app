const openAiApiCall = async (apiKey, prompt) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", 
      messages: [{"role": "user", "content": prompt}],
      temperature: 0.7
    }),
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("data check: ", data.choices[0].message)
  return data.choices[0].message.content;
};

chrome.runtime.sendMessage({ type: "getKeys" }, async (response) => {
  const apiKey = response.apiKey;

  if (!apiKey) {
    alert("Please set your OpenAI API key in the extension options.");
    return;
  }

  document.addEventListener("keyup", async (event) => {
    if (event.key !== ";") {
      return;
    }

    const target = event.target;
    // let inputText = target.value;    /// original working code here.

    let inputText;
    if (target.value !== "" && target.value !== undefined) {
      const cursorPosition = target.selectionStart;
      const startOfLine = target.value.lastIndexOf('\n', cursorPosition - 1) + 1;
      const endOfLine = target.value.indexOf('\n', cursorPosition);
      inputText = endOfLine === -1 ? target.value.slice(startOfLine) : target.value.slice(startOfLine, endOfLine);
    } else {
      inputText = document.activeElement.innerText; // LinkedIn
      if (inputText === "" || inputText === undefined) {
        inputText = document.activeElement.textContent; // Twitter
      }
    }

    // if (inputText === "" || inputText === undefined) {
    //   inputText = document.activeElement.innerText; // LinkedIn
    //   if (inputText === "" || inputText === undefined) {
    //     inputText = document.activeElement.textContent; // Twitter
    //   }
    // }

    alert("input text: " + inputText);
    // console.log("inputText: ",ext);

    const lastHelpCommandIndex = inputText.lastIndexOf('help:');
    if (lastHelpCommandIndex >= 0) {
      inputText = inputText.slice(lastHelpCommandIndex);
    }

      // Match formats
      // const helpRegex = /help:(?:(\d*):)?\s*(.+?)(?=;)/g; // Updated regex for help to make the word limit optional
      // const helpRegex = /(?:^|\n)help:(?:(\d*):)?\s*([^\n]+?)(?=;|\n|$)/g;
      const helpRegex = /(?:^|[\r\n])help:(?:(\d*):)?\s*([^\r\n]+?)(?=;|$)/g;
      const helpMatch = inputText.match(helpRegex);
      if (helpMatch) {
        inputText = helpMatch[0];
      }

      const langRegex = /translate,([a-zA-Z]+):\s*(.+?);/g;
      const codeRegex = /code,([a-zA-Z]+):\s*(.+?);/g;
      const chatgptRegex = /chatgpt:\s*(.+?)(?=;)/g; // Added regex for ChatGPT

      const updateInput = async (regex, callback) => {
        const matches = Array.from(inputText.matchAll(regex));
      
        if (matches.length === 0) {
          return;
        }
    
        const replacements = await Promise.all(matches.map(match => callback(match)));
        let updatedText = inputText;
      
        for (let i = 0; i < matches.length; i++) {
          const match = matches[i];
          const generatedText = replacements[i];
          // updatedText += "\n\n" + generatedText.replace(match[0], "").trim(); // Append the generated text instead of replacing
          updatedText = inputText.slice(1, -match[0].length) + "\n\n" + generatedText;
        }
        console.log("updatedText: ", updatedText);

        const activeElement = document.activeElement;

        if (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "INPUT") {
          // For textarea and input elements
          const event = new Event("keydown", {
            bubbles: true,
            cancelable: true,
            key: "a", // Replace with the key you want to simulate
            code: "KeyA", // Replace with the key code you want to simulate
          });

        document.activeElement.dispatchEvent(event);
      

        // Calculate the difference between original and updated text
        const difference = updatedText.slice(inputText.length);
      
        // Use InputEvent for updating text
        const inputEvent = new InputEvent("input", {
          bubbles: true,
          cancelable: true,
          data: difference,
        });

        // Set the value before dispatching the input event
        document.activeElement.value = updatedText;
        console.log("Input event created:", updatedText);

        document.activeElement.dispatchEvent(inputEvent);
        console.log("Input event dispatched");

        // document.activeElement.innerText = updatedText; //Linkedin
        // document.activeElement.textContent = updatedText; //Twitter
      } else {
        // For contentEditable elements
        const sel = window.getSelection();
        const range = sel.getRangeAt(0);
        const endNode = document.createTextNode("\n\n" + updatedText);
        range.insertNode(endNode);
        range.setStartAfter(endNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    };


    const isActiveElementContentEditable = () => {
      return document.activeElement.getAttribute("contenteditable") === "true";
    };

    const updateInputReddit = async (regex, callback) => {
      const matches = Array.from(inputText.matchAll(regex));
    
      if (matches.length === 0) {
        return;
      }

      const replacements = await Promise.all(matches.map(match => callback(match)));
      let updatedText = inputText;
    
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const generatedText = replacements[i];
        // updatedText += "\n\n" + generatedText.replace(match[0], "").trim(); // Append the generated text instead of replacing
        updatedText = inputText.slice(1, -match[0].length) + "\n\n" + generatedText;
      }
      console.log("updatedText: ", updatedText);

      const activeElement = document.activeElement;

      if (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "INPUT") {
        // For textarea and input elements
        const event = new Event("keydown", {
          bubbles: true,
          cancelable: true,
          key: "a", // Replace with the key you want to simulate
          code: "KeyA", // Replace with the key code you want to simulate
        });

      document.activeElement.dispatchEvent(event);
    

      // Calculate the difference between original and updated text
      const difference = updatedText.slice(inputText.length);
    
      // Use InputEvent for updating text
      const inputEvent = new InputEvent("input", {
        bubbles: true,
        cancelable: true,
        data: difference,
      });

      // Set the value before dispatching the input event
      document.activeElement.value = updatedText;
      console.log("Input event created:", updatedText);

      document.activeElement.dispatchEvent(inputEvent);
      console.log("Input event dispatched");
    } else if (isActiveElementContentEditable()) {
      if (isReddit()) {
        const sel = window.getSelection();
        const range = sel.getRangeAt(0);
        const endNode = document.createTextNode("\n\n" + updatedText);
        range.insertNode(endNode);
        range.setStartAfter(endNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);

        // Trigger input event for React
        const inputEvent = new Event("input", {
          bubbles: true,
          cancelable: true,
        });
        activeElement.dispatchEvent(inputEvent);
      }
      else if (isNotion()) {
        // For contentEditable elements on Notion
        const sel = window.getSelection();
        const range = sel.getRangeAt(0);
    
        // Create a new text node with the updatedText and a line break
        const endNode = document.createTextNode("\n" + updatedText);
    
        // Insert the new text node at the current cursor position
        range.insertNode(endNode);
    
        // Set the cursor position after the inserted text node
        range.setStartAfter(endNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    
        // Trigger input event for Notion's React component
        const inputEvent = new Event("input", {
          bubbles: true,
          cancelable: true,
        });
        activeElement.dispatchEvent(inputEvent);
      } 
    }
  };
    

    const generateText = async (query, wordLimit) => {
      const prompt = wordLimit ? `In exactly : ${wordLimit} words: ${query}` : `help: ${query}`;
      console.log("prompt: ", prompt);

      const responseText = await openAiApiCall(apiKey, prompt);
      console.log("response got: "+ responseText);
      return responseText.replace(prompt, "").trim();
      // return await openAiApiCall(apiKey, query);
    };

    const translateText = async (language, query) => {
      const prompt = `Translate the following English text to ${language}: "${query}"`;
      return await openAiApiCall(apiKey, prompt);
    };

    const generateCode = async (language, query) => {
      console.log("programming language: ", language);
      const prompt = `Write ${language} code to ${query}`;
      return await openAiApiCall(apiKey, prompt);
    };

    const isReddit = () => {
      return window.location.hostname.includes("reddit.com");
    };

    const isNotion = () => {
      return window.location.hostname.includes("notion.so");
    };

    console.log("help thing:"+ helpRegex);

    if (isReddit() || isNotion()) {
      await updateInputReddit(helpRegex, (match) => generateText(match[2], match[1] ? parseInt(match[1]) : null));
      await updateInputReddit(langRegex, (match) => translateText(match[1], match[2]));
      await updateInputReddit(codeRegex, (match) => generateCode(match[1], match[2]));
      await updateInputReddit(chatgptRegex, (match) => generateText(match[1])); // Added call for ChatGPT  
    }
    else {
      await updateInput(helpRegex, (match) => generateText(match[2], match[1] ? parseInt(match[1]) : null));
      await updateInput(langRegex, (match) => translateText(match[1], match[2]));
      await updateInput(codeRegex, (match) => generateCode(match[1], match[2]));
      await updateInput(chatgptRegex, (match) => generateText(match[1])); // Added call for ChatGPT
    }
    
  });
});
