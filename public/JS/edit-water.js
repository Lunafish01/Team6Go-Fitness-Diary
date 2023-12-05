// function to edit post
async function editEntryHandler(event) {
    event.preventDefault();
  
    const id = getEntryIdFromUrl(); 
    
    // Gather updated data from the form
    const updatedData = {
      date: document.getElementById("date").value.trim(),
      goal: document.getElementById("daily-goal").value.trim(),
      intake: document.getElementById("actual-intake").value.trim(),
    };
  
    try {
      // Make a PUT request to the water API route for editing
      const response = await fetch(`/api/waterRoutes/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        alert("Water entry updated successfully!");
        
      } else {
        const errorMessage = await response.text();
        alert(`Error updating water entry: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error updating water entry:", error);
      alert("An error occurred while updating the water entry.");
    }
  }
  
  document.querySelector(".edit-water-form").addEventListener("submit", editEntryHandler);
  