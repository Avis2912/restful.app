document.addEventListener("DOMContentLoaded", () => {

  const frequencyInput = document.getElementById("hours");
  const saveBtn = document.getElementById("save");
  const durationInput = document.getElementById("seconds");

  // Load existing values from storage
  chrome.storage.local.get(['durationSeconds', 'frequencyHours'], (result) => {
    durationInput.value = result.durationSeconds || '';
    frequencyInput.value = result.frequencyHours || '';
  });

  // Listen for the Save Button Click
  saveBtn.addEventListener("click", () => {
    const frequencyHours = frequencyInput.value;
    const durationSeconds = durationInput.value;

    // Validate durationSeconds
    if (!isNumberInRange(durationSeconds, 10, 50)) {
      alert('Seconds must be a number between 10 and 50.');
      return;
    }

    // Validate frequencyHours
    if (!isNumberInRange(frequencyHours, 1, 12)) {
      alert('Hours must be a number between 1 and 12.');
      return;
    }

    // Save values to local storage
    chrome.storage.local.set({ 'frequencyHours': frequencyHours });
    chrome.storage.local.set({ 'durationSeconds': durationSeconds });

    alert('Changes Saved Successfully! 🎉');
  });
});

// Helper function to check if a value is a number within a specific range
function isNumberInRange(value, min, max) {
  const number = parseFloat(value);
  return !isNaN(number) && number >= min && number <= max;
}
