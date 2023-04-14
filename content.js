// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//   var url = tabs[0].url
//   console.log(JSON.stringify(url));
// })

const openAiApiCall = async (apiKey, prompt) => {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      model: "text-davinci-003",
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  });

  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].text.trim();
};

chrome.runtime.sendMessage({ type: "getKeys" }, async (response) => {
  const apiKey = response.apiKey;

  if (!apiKey) {
    return;
  }
  //Loop

  document.addEventListener("keyup", async (event) => {
    if (event.key !== ";") {
      return;
    }
    async function getCurrentTab() {
      let queryOptions = { active: true, currentWindow: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      return tab;
    }
    let currentUrl = await getCurrentTab();

    if (currentUrl.includes("linkedin.com")){
    let inputElement = document.querySelector('.ql-editor');
    const inputText = inputElement.innerText
    }
    // let inputText = target.value;

    // if (inputText === "" || inputText === undefined) {
    //   inputText = document.activeElement.innerText; // LinkedIn
    //   if (inputText === "" || inputText === undefined) {
    //     inputText = document.activeElement.textContent; // Twitter
    //   }
    // }

    console.log("inputText: ", inputText);

    // Match formats
    // const helpRegex = /help:\s*(.+?);/g;
    const langRegex = /translate:\s*(.+?):\s*(.+?);/g;
    const codeRegex = /code:\s*(.+?):\s*(.+?);/g;
    //V1
    const scribRegex = /scrib:\s*(.+?);/g;
    const summarizeRegex = /summarize:\s*(.+?);/g;
    const elongateRegex = /elongate:\s*(.+?);/g;
    const listRegex = /list:\s*(.+?);/g;
    const toneRegex = /tone:\s*(.+?):\s*(.+?);/g;
    //End of V1

    const updateInput = async (regex, callback) => {
      let updatedText = inputText;
      let match;
      let matchFound = false;

      console.log("regex: ", regex);
      console.log("updatedText: ", JSON.stringify(updatedText));

      while ((match = regex.exec(updatedText)) !== null) {
        console.log("Match found:", match); // Log the match
        matchFound = true;
        const generatedText = await callback(match);
        console.log("GeneratedText: ", generatedText);
        updatedText = updatedText.replace(match[0], generatedText);

        // Reset lastIndex to 0 to avoid infinite loops
        regex.lastIndex = 0;
      }
      if (matchFound) {
        const event = new Event("input", {
          bubbles: true,
          cancelable: true,
        });
        await document.activeElement.dispatchEvent(event);
        target.value = updatedText; //General
        document.activeElement.innerText = updatedText; //Linkedin
        document.activeElement.textContent = updatedText; //Twitter
      }
    };

    const generateText = async (query) => {
      console.log("query: ", query);
      return await openAiApiCall(apiKey, query);
    };

    const translateText = async (language, query) => {
      console.log("language: ", language);
      const prompt = `Translate the following English text to ${language}: "${query}"`;
      return await openAiApiCall(apiKey, prompt);
    };

    const generateCode = async (language, query) => {
      console.log("programming language: ", language);
      const prompt = `Write ${language} code to ${query}`;
      return await openAiApiCall(apiKey, prompt);
    };

    //New V1
    const summarizeText = async (query) => {
      console.log("summarize: ", query);
      return await openAiApiCall(apiKey, query);
    };
    const elongateText = async (query) => {
      console.log("elongate: ", query);
      return await openAiApiCall(apiKey, query);
    };
    const listText = async (query) => {
      console.log("Turn into list: ", query);
      return await openAiApiCall(apiKey, query);
    };
    const toneText = async (tone, query) => {
      console.log("tone", tone);
      const prompt = `Write ${tone} tone to ${query}`;
      return await openAiApiCall(apiKey, prompt);
    };

    await updateInput(summarizeRegex, (match) => summarizeText(match[1]));
    await updateInput(elongateRegex, (match) => elongateText(match[1]));
    await updateInput(listRegex, (match) => listText(match[1]));
    await updateInput(toneRegex, (match) => toneText(match[1], match[2]));
    
    //End of V1

    await updateInput(scribRegex, (match) => generateText(match[1]));
    await updateInput(langRegex, (match) => translateText(match[1], match[2]));
    await updateInput(codeRegex, (match) => generateCode(match[1], match[2]));
  });
});

// - 

// /scrib for general prompting
// /code for code but ideally /code, language name for code
// /summarize for summarizing
// /rewrite for rewriting
// /elongate for making text longer

// /friendly, 

// /formal

// /casual

// /excited
// /translate, language name for translating
// /list to convert a para into a list