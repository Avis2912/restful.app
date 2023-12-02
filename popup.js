/*global chrome*/

document.addEventListener("DOMContentLoaded", () => {   
  
  chrome.storage.local.get(['durationSeconds'], (result) => {
    if (result.durationSeconds) {
        document.getElementById("durationDisplay").textContent = result.durationSeconds + " seconds";
    }
});

// Retrieve and display the frequency in hours
chrome.storage.local.get(['frequencyHours'], (result) => {
    if (result.frequencyHours) {
        document.getElementById("frequencyDisplay").textContent = result.frequencyHours + " hours";
    }
});

  // restful();
  });




  