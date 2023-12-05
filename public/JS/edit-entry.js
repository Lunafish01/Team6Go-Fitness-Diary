// function to edit post
async function editEntryHandler(event) {
  event.preventDefault();

  const id = getEntryIdFromUrl(); 
  
  // Gather updated data from the form
  const updatedData = {
    name: document.getElementById("meal-name").value.trim(),
    calories: document.getElementById("calories").value.trim(),
    servingSize: document.getElementById("serving-size").value.trim(),
  };

  try {
    // Make a PUT request to the food API route for editing
    const response = await fetch(`/api/foodRoutes/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Food entry updated successfully!");
     
    } else {
      const errorMessage = await response.text();
      alert(`Error updating food entry: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error updating food entry:", error);
    alert("An error occurred while updating the food entry.");
  }
}

document.querySelector(".edit-food-form").addEventListener("submit", editEntryHandler);
