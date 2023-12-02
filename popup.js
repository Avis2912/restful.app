document.addEventListener("DOMContentLoaded", () => {   

  const meditationButton = document.getElementById("meditationMode");

  meditationButton.onclick = () => {
    meditationMode();
  };

  function updateRemainingTimeDisplay() {
    chrome.storage.local.get(['hours', 'minutes'], (result) => {
      let hours = result.hours ?? 4;
      let minutes = result.minutes ?? 0;

      let timeDisplay = document.getElementById("timeDisplay");
      if (timeDisplay) {
        timeDisplay.textContent = `${hours}h${minutes}m`;
      }
    });
  }

  chrome.storage.local.get(['durationSeconds'], (result) => {
    if (result.durationSeconds) {
      document.getElementById("durationDisplay").textContent = result.durationSeconds + " seconds";
    }
  });

  chrome.storage.local.get(['frequencyHours'], (result) => {
    if (result.frequencyHours) {
      document.getElementById("frequencyDisplay").textContent = result.frequencyHours + " hours";
    }
  });

  updateRemainingTimeDisplay();

  function meditationMode() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            function: executeScriptInTab,
        });
    });
  }

  function executeScriptInTab() {
    chrome.storage.local.get(['durationSeconds', 'frequencyHours'], (result) => {
        let seconds = result.durationSeconds ?? 15;
        let hours = result.frequencyHours ?? 4;

        if (result.durationSeconds === undefined) {
            chrome.storage.local.set({ 'durationSeconds': seconds });
        }
        if (result.frequencyHours === undefined) {
            chrome.storage.local.set({ 'frequencyHours': hours });
        }
        run_restful_app(seconds, hours);
    });

    function run_restful_app(seconds, hours) {
      const overlayDiv = document.createElement('div');
      overlayDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:transparent;z-index:999999;opacity:0;transition:opacity 2s ease-in-out;';
      
      const colorOverlay = document.createElement('div');
      colorOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999999;opacity:0.2;transition:opacity 1s;';

      const textOverlay = document.createElement('div');
      textOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999999;opacity:1;background-color:transparent;transition:opacity 1.8s;';

      const centerText = document.createElement('h1');
      centerText.style.cssText = 'color:#FFF;text-align:center;font-family:Futura;font-size:120px;font-style:light;font-weight:100;line-height:normal;position:absolute;letter-spacing:8px;top:48%;left:00%;transform:translate(-50%, -50%);opacity:0.8;';

      const centerText2 = document.createElement('h1');
      centerText2.style.cssText = 'color:#FFF;text-align:center;font-family:Fantasy;font-size:25px;font-style:light;font-weight:600;line-height:normal;position:absolute;letter-spacing:1px; top:140px; left:0%;transform:translate(0%, -0%);opacity:0.8;';

      const bottomText = document.createElement('div');
      bottomText.style.cssText = 'color:#FFF;text-align:center;font-family:"Italiana", sans-serif;font-size:22px;font-style:light;font-weight:100;line-height:normal;position:absolute;letter-spacing:4px;top:93%;left:50%;transform:translate(-50%, -50%);opacity:0.6;';
      bottomText.textContent = 'PRESS ENTER TO QUIT'; // Add the text you want to display

      const mainCountdownElement = document.createElement('div');
      mainCountdownElement.style.cssText = 'color:#FFF;text-align:center;font-family:Palatino;font-size:26px;font-style:light;font-weight:100;line-height:normal;position:absolute;letter-spacing:0px;top:8%;left:5%;opacity:0.6;transform:translate(-50%, -50%);';

      const Texts = {
        'CLOSE': 'Your Palms are heavy', 
      // 'STARE': 'At The Furthest Wall Nearby', 
      // 'CLOSE': 'Your Eyes Completely', 
      // 'BLINK': 'Ten Times In Quick Succession', 
      // 'PLACE': 'Your Palms On Your Eyes'
    };

      const textKeys = Object.keys(Texts);
      const randomTextKey = textKeys[Math.floor(Math.random() * textKeys.length)];
      centerText.textContent = randomTextKey;
      centerText2.textContent = Texts[randomTextKey];

      centerText.appendChild(centerText2);
      textOverlay.appendChild(centerText);
      textOverlay.appendChild(bottomText);
      textOverlay.appendChild(mainCountdownElement);

      const IDs = {
      // 'blue': 'oGGHE6YXBlo', 
      'black': 'M1nkuavHI0g',
      // 'darkred': 'IadsLclBOS8', 
      // 'green': '0-jUHUz_swY'

      //SnUBb-FAlCY
    };
      const colorKeys = Object.keys(IDs);
      const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      colorOverlay.style.backgroundColor = randomColorKey;
      const youtubeVideoId = IDs[randomColorKey];
      const start = 0;

      const youtubeIframe = document.createElement('iframe');
      youtubeIframe.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&controls=0&vq=hd1080&playlist=${youtubeVideoId}&start=${start}`;
      youtubeIframe.allowFullscreen = true;
      youtubeIframe.style.cssText = 'width:1920px;height:1080px;';

      overlayDiv.appendChild(youtubeIframe);

      const carrier = document.createElement('div');
      carrier.style.cssText = 'position:fixed;top:70px;right:-130px;width:120px;height:60px;z-index:999999;background-color: #46917d;border-top-left-radius:50px;border-bottom-left-radius:50px;transition:right 1.8s;';

      const carrier2 = document.createElement('div');
      carrier2.style.cssText = 'position:absolute;top:5.245px;right:-6px;width:120px;height:50px;z-index:9999999;background-color:#5DC6AC;border-top-left-radius:50px;border-bottom-left-radius:50px;transition:right 2s;';

      const countdownElement = document.createElement('div');
      countdownElement.style.cssText = 'position:absolute;top:53%;left:35px;transform:translate(-50%, -50%);font-size:32px;z-index:99999999;color:white;padding-bottom:4px;font-weight:800;font-family:serif;';

      const countdownElement2 = document.createElement('div');
      countdownElement2.style.cssText = 'position:absolute;top:37.5%;left:60px;transform:translate(-14%, -50%);font-size:13px;z-index:999999999;color:white;padding-bottom:5px;font-weight:400;font-family:serif;';
      countdownElement2.textContent = "time to";

      const countdownElement3 = document.createElement('div');
      countdownElement3.style.cssText = 'position:absolute;top:62.5%;left:60px;transform:translate(-14%, -50%);font-size:13px;z-index:999999999;color:white;padding-bottom:0px;font-weight:400;font-family:serif;';
      countdownElement3.textContent = "ready up";

      overlayDiv.append(colorOverlay);
      overlayDiv.append(textOverlay);

      carrier.appendChild(carrier2);
      carrier.appendChild(countdownElement);
      carrier.appendChild(countdownElement2);
      carrier.appendChild(countdownElement3);

      document.body.appendChild(carrier);

      let fake = 7;
      let countdown = 4;
      meditationSeconds = 60;
      let mainCountdown = meditationSeconds;
      let x = parseInt(mainCountdown) + 5;

      function updateCountdown() {
        countdownElement.textContent = countdown;
        if (fake === 3) {
          carrier.style.right = "-120px";
          document.addEventListener('keydown', handleKeyPress);
        } else {
          if (fake === 7) {
            document.body.appendChild(overlayDiv);
            updateMainCountdown(); 
          }
          if (fake == 0) {
            carrier.remove();
          }
          if (countdown === 3) {
            carrier.style.right = "0px";
          }
          countdown--;
          fake--;
          setTimeout(updateCountdown, 1000);
        }
      }

      function updateMainCountdown() {
        mainCountdownElement.textContent = x;
        if (x === 0) {
          overlayDiv.remove();
          document.removeEventListener('keydown', handleKeyPress);
        } else {
          if (mainCountdown === meditationSeconds - 5) {
            overlayDiv.style.opacity = '1';
          }
          if (x === 2) {
            overlayDiv.style.opacity = '0';
          }
          mainCountdown--;
          x--;
          setTimeout(updateMainCountdown, 1000);
        }
      }

      function handleKeyPress(event) {
        if (event.key === 'Enter') {
          overlayDiv.remove();
          document.removeEventListener('keydown', handleKeyPress);
        }
      }

      updateCountdown();
    }
  }
  
});
  
