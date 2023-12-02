document.addEventListener("DOMContentLoaded", () => {   

  // Function to update the display with remaining time
  function updateRemainingTimeDisplay() {
    chrome.storage.local.get(['hours', 'minutes'], (result) => {
      let hours = result.hours ?? 4; // Default to 4 if undefined
      let minutes = result.minutes ?? 0; // Default to 0 if undefined

      // Update the display
      let timeDisplay = document.getElementById("timeDisplay");
      if (timeDisplay) {
        timeDisplay.textContent = `${hours}h${minutes}m`;
      }
    });
  }

  // Retrieve and display the duration in seconds
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

  // Call the function to update the remaining time display
  updateRemainingTimeDisplay();
});
