document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    var fileInput = document.getElementById("deckFile");
    var file = fileInput.files[0];

    if (!file) {
      displayMessage("No file selected");
      return;
    }

    var formData = new FormData();
    formData.append("deckFile", file);

    var request = new XMLHttpRequest();
    request.open("POST", "/upload");
    request.onload = function () {
      if (request.status === 200) {
        displayMessage("File uploaded successfully");
      } else {
        displayMessage("Error uploading file");
      }
    };
    request.send(formData);
  });

function displayMessage(message) {
  var messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
}
