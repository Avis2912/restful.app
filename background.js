chrome.alarms.create("updateTime", { periodInMinutes: 1/60 }); 


  chrome.alarms.onAlarm.addListener(alarm => {

  if (alarm.name === "updateTime") {
      updateRemainingTime();
  }

  function updateRemainingTime() {
    chrome.storage.local.get(['hours', 'minutes'], (result) => {
      let hours = result.hours ?? 4; // Default to 4 if undefined
      let minutes = result.minutes ?? 0; // Default to 0 if undefined
      
      chrome.storage.local.get(['frequencyHours'], (result2) => {
      let frequencyHours = result2.frequencyHours ?? 4; // Default to 4 if undefined

      if (minutes === 0) {
        if (hours === 0) {
          restful();
          hours = frequencyHours; // Reset hours to 4 after countdown ends
        } else {
          hours--;
          minutes = 59;
        }
      } else {
        minutes--;
      }
      chrome.storage.local.set({ 'hours': hours, 'minutes': minutes });
    });

  });
    
    // chrome.storage.local.get(['hours', 'minutes'], (result) => {
    //   port.postMessage({ message: result });
    // });    

  }


  function restful() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            function: executeScriptInTab,
        });
    });
}



function executeScriptInTab() {

    // Retrieve durationSeconds and frequencyHours from storage
    chrome.storage.local.get(['durationSeconds', 'frequencyHours'], (result) => {
        let seconds = result.durationSeconds ?? 15; // Default to 15 if undefined
        let hours = result.frequencyHours ?? 4;    // Default to 4 if undefined

        // If values are undefined, set default values in storage
        if (result.durationSeconds === undefined) {
            chrome.storage.local.set({ 'durationSeconds': seconds });
        }
        if (result.frequencyHours === undefined) {
            chrome.storage.local.set({ 'frequencyHours': hours });
        }
        // Now call the function to start the countdown
        run_restful_app(seconds, hours);
    });




function run_restful_app(seconds, hours) {

            // Create a countdown element
            const overlayDiv = document.createElement('div');
            overlayDiv.style.position = 'fixed';
            overlayDiv.style.top = '0';
            overlayDiv.style.left = '0';
            overlayDiv.style.width = '100%';
            overlayDiv.style.height = '100%';
            overlayDiv.style.backgroundColor = 'transparent';
            overlayDiv.style.zIndex = '999999';
            overlayDiv.style.opacity = '0'; // Opacity set to 10%
            overlayDiv.style.transition = 'opacity 2s ease-in-out';  // 1s transition for opacity

            const colorOverlay = document.createElement('div');
            colorOverlay.style.position = 'fixed';
            colorOverlay.style.top = '0';
            colorOverlay.style.left = '0';
            colorOverlay.style.width = '100%';
            colorOverlay.style.height = '100%';
            colorOverlay.style.zIndex = '9999999';
            colorOverlay.style.backgroundColor = 'blue';
            colorOverlay.style.opacity = '0.2'; 
            colorOverlay.style.transition = 'opacity 1s'; 

            const textOverlay = document.createElement('div');
            textOverlay.style.position = 'fixed';
            textOverlay.style.top = '0';
            textOverlay.style.left = '0';
            textOverlay.style.width = '100%';
            textOverlay.style.height = '100%';
            textOverlay.style.zIndex = '99999999';
            textOverlay.style.opacity = '1'; 
            textOverlay.style.backgroundColor = 'transparent';
            textOverlay.style.transition = 'opacity 1.8s'; 


            const centerText = document.createElement('h1');
            centerText.className="my";
            // centerText.textContent = 'BLINK';
            centerText.style.color = '#FFF';
            centerText.style.textAlign = 'center';
            centerText.style.fontFamily = "Futura"; //georgia, palatino, fantasy, didot, 
            centerText.style.fontSize = '120px';
            centerText.style.fontStyle = 'light';
            centerText.style.fontWeight = '100';
            centerText.style.lineHeight = 'normal';
            centerText.style.position = 'absolute';
            centerText.style.letterSpacing = '8px'; // Adjust the letter spacing as needed
            centerText.style.top = '48%';
            centerText.style.left = '50%';
            centerText.style.transform = 'translate(-50%, -50%)';
            centerText.style.opacity = "0.8";

            const centerText2 = document.createElement('h1');
            centerText2.style.color = '#FFF';
            centerText2.style.textAlign = 'center';
            centerText2.style.fontFamily = "Fantasy"; //georgia, palatino, fantasy, didot, 
            centerText2.style.fontSize = '25px';
            centerText2.style.fontStyle = 'light';
            centerText2.style.fontWeight = '600';
            centerText2.style.lineHeight = 'normal';
            centerText2.style.position = 'relative';
            centerText2.style.letterSpacing = '1px'; // Adjust the letter spacing as needed
            centerText2.style.top = '-20px';
            centerText2.style.left = '0%';
            centerText2.style.transform = 'translate(0%, 0%)';
            centerText2.style.opacity = "0.8";

            const bottomText = document.createElement('div');
            bottomText.textContent = 'PRESS ENTER TO SKIP';
            bottomText.style.color = '#FFF';
            bottomText.style.textAlign = 'center';
            bottomText.style.fontFamily = "'Italiana', sans-serif";
            bottomText.style.fontSize = '22px';
            bottomText.style.fontStyle = 'light';
            bottomText.style.fontWeight = '100';
            bottomText.style.lineHeight = 'normal';
            bottomText.style.position = 'absolute';
            bottomText.style.letterSpacing = '4px'; // Adjust the letter spacing as needed
            bottomText.style.top = '93%';
            bottomText.style.left = '50%';
            bottomText.style.transform = 'translate(-50%, -50%)';
            bottomText.style.opacity = "0.6";

            const mainCountdownElement = document.createElement('div');
            mainCountdownElement.textContent = '10';
            mainCountdownElement.style.color = '#FFF';
            mainCountdownElement.style.textAlign = 'center';
            mainCountdownElement.style.fontFamily = "Palatino";
            mainCountdownElement.style.fontSize = '26px';
            mainCountdownElement.style.fontStyle = 'light';
            mainCountdownElement.style.fontWeight = '100';
            mainCountdownElement.style.lineHeight = 'normal';
            mainCountdownElement.style.position = 'absolute';
            mainCountdownElement.style.letterSpacing = '0px'; // Adjust the letter spacing as needed
            mainCountdownElement.style.top = '8%';
            mainCountdownElement.style.left = '5%';
            mainCountdownElement.style.opacity = "0.6";
            mainCountdownElement.style.transform = 'translate(-50%, -50%)';

            const Texts = {
              'BLINK': 'Five Times In Slow Succession',
              'STARE': 'At The Furthest Wall Nearby', //'zmKK7Wxe22k',
              'CLOSE': 'Your Eyes Completely',
              // 'BLINK': 'Ten Times In Quick Succession',
              'PLACE': 'Your Palms On Your Eyes',
 
             };

            const textKeys = Object.keys(Texts);
            const randomTextKey = textKeys[Math.floor(Math.random() * textKeys.length)];
            centerText.textContent = randomTextKey;
            centerText2.textContent = Texts[randomTextKey];

            centerText.style.justifyContent = "center";
            centerText.appendChild(centerText2);
            textOverlay.appendChild(centerText);
            textOverlay.appendChild(bottomText);
            textOverlay.appendChild(mainCountdownElement);


            const IDs = {
             'blue': 'oGGHE6YXBlo',
             'black': '3FHTPADy3QU', //'zmKK7Wxe22k',
              'darkred': 'OdT7niw9w7M',
              'green': '0-jUHUz_swY',
              'black': 'FslCeCp1GqM',
              

            // night waves, night stuff, beach waves, forest
            };

            const colorKeys = Object.keys(IDs);
            const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
            
            colorOverlay.style.backgroundColor = randomColorKey;
            const youtubeVideoId = IDs[randomColorKey];
            
            const youtubeIframe = document.createElement('iframe');
            youtubeIframe.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&controls=0&vq=hd1080&playlist=${youtubeVideoId}`;
            youtubeIframe.allowFullscreen = true;
            youtubeIframe.style.width = '1920px';
            youtubeIframe.style.height = '1080px';

            overlayDiv.appendChild(youtubeIframe);


            const carrier = document.createElement('div');
            carrier.style.position = 'fixed';
            carrier.style.top = '70px';
            carrier.style.right = '-130px';
            carrier.style.width = '120px';
            carrier.style.height = '60px';
            carrier.style.zIndex = '999999';
            carrier.style.backgroundColor = '#539F86';
            carrier.style.borderTopLeftRadius = "50px";
            carrier.style.borderBottomLeftRadius = "50px";
            carrier.style.transition = 'right 1.8s';  // 1s transition for opacity

            const carrier2 = document.createElement('div');
            carrier2.style.position = 'absolute';
            carrier2.style.top = '5.245px';
            carrier2.style.right = '-6px';
            carrier2.style.width = '120px';
            carrier2.style.height = '50px';
            carrier2.style.zIndex = '9999999';
            carrier2.style.backgroundColor = '#5AAF93';
            carrier2.style.borderTopLeftRadius = "50px";
            carrier2.style.borderBottomLeftRadius = "50px";
            carrier2.style.transition = 'right 2s';  

            const countdownElement = document.createElement('div');
            countdownElement.style.position = 'absolute';
            countdownElement.style.top = '53%';
            countdownElement.style.left = '35px';
            countdownElement.style.transform = 'translate(-50%, -50%)';
            countdownElement.style.fontSize = '30px';
            countdownElement.style.zIndex = '99999999';
            countdownElement.style.color = 'white';
            countdownElement.style.paddingBottom = '4px';
            countdownElement.style.fontWeight = '800';
            countdownElement.style.fontFamily = 'serif';


            const countdownElement2 = document.createElement('div');
            countdownElement2.style.position = 'absolute';
            countdownElement2.style.top = '37.5%';
            countdownElement2.style.left = '60px';
            countdownElement2.style.transform = 'translate(-14%, -50%)';
            countdownElement2.style.fontSize = '13px';
            countdownElement2.style.zIndex = '999999999';
            countdownElement2.style.color = 'white';
            countdownElement2.style.paddingBottom = '5px';
            countdownElement2.style.fontWeight = '400';
            countdownElement2.style.fontFamily = 'serif';
            countdownElement2.textContent = "take a";

            const countdownElement3 = document.createElement('div');
            countdownElement3.style.position = 'absolute';
            countdownElement3.style.top = '62.5%';
            countdownElement3.style.left = '60px';
            countdownElement3.style.transform = 'translate(-14%, -50%)';
            countdownElement3.style.fontSize = '13px';
            countdownElement3.style.zIndex = '999999999';
            countdownElement3.style.color = 'white';
            countdownElement3.style.paddingBottom = '0px';
            countdownElement3.style.fontWeight = '400';
            countdownElement3.style.fontFamily = 'serif';
            countdownElement3.textContent = "breather";

      
            overlayDiv.append(colorOverlay);
            overlayDiv.append(textOverlay);

            carrier.appendChild(carrier2);
            carrier.appendChild(countdownElement);
            carrier.appendChild(countdownElement2);
            carrier.appendChild(countdownElement3);

            document.body.appendChild(carrier);
            
            

            // Countdown logic
            let fake = 7;
            let countdown = 4;
            let mainCountdown = seconds;
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
                overlayDiv.remove(); // Remove the overlay after countdown
                document.removeEventListener('keydown', handleKeyPress);
              } else {
                if (mainCountdown === seconds - 5) {
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
                overlayDiv.remove(); // Remove the overlay when 'Enter' is pressed
                document.removeEventListener('keydown', handleKeyPress); // Remove the event listener
              }
            }
  
            updateCountdown();
          };
        };



});

chrome.runtime.onConnect.addListener(port => {
  console.assert(port.name === "regularUpdate");

});

