// function to edit post
async function editEntryHandler(event) {
    event.preventDefault();
  
    const id = getEntryIdFromUrl(); 
    
    // Gather updated data from the form
    const updatedData = {
      date: document.getElementById("date").value.trim(),
      steps: document.getElementById("step-count").value.trim(),
      calories: document.getElementById("calories-burned").value.trim(),
      distance: document.getElementById("distance-travelled").value.trim(),
    };
  
    try {
      // Make a PUT request to the steps API route for editing
      const response = await fetch(`/api/stepsRoutes/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        alert("Steps entry updated successfully!");
        
      } else {
        const errorMessage = await response.text();
        alert(`Error updating steps entry: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error updating steps entry:", error);
      alert("An error occurred while updating the steps entry.");
    }
  }
  
  document.querySelector(".edit-steps-form").addEventListener("submit", editEntryHandler);
  