// function to edit post
const editEntryHandler = async (event) => {
    event.preventDefault();
  
    
    // Gather updated data from the form
    const updatedData = {
      date: document.getElementById("date").value.trim(),
      daily_goal: document.getElementById("daily-goal").value.trim(),
      actual_intake: document.getElementById("actual-intake").value.trim(),
    };
  
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];

      // Make a PUT request to the water API route for editing
      const response = await fetch(`/api/water/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    };
  
  document.addEventListener("DOMContentLoaded", function () {
    document;
    document
      .querySelector(".edit-water-form")
      .addEventListener("submit", editEntryHandler);
  });
  