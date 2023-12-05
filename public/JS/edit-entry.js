// function to edit post
async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document
      .querySelector('textarea[name="content"]')
      .value.trim();
  
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
    if (title && content) {
      const foodResponse = await fetch(`/api/foodRoutes/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          post_id: id,
          title,
          content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // If successful, redirect the browser to the dashboard page
      if (foodResponse.ok) {
        document.location.replace("/dashboard/");
      } else {
        const foodErrorMessage = await foodResponse.text();
        alert(`Error editing post: ${foodErrorMessage}`);
      }
    }
  
    // Additional API routes
    const stepsResponse = await fetch(`/api/stepsRoutes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (stepsResponse.ok) {
      // Handle the response for the second route
    } else {
      const stepsErrorMessage = await stepsResponse.text();
      alert(`Error in steps route: ${stepsErrorMessage}`);
    }
  
    const waterResponse = await fetch(`/api/waterRoutes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (waterResponse.ok) {
      // Handle the response for the third route
    } else {
      const waterErrorMessage = await waterResponse.text();
      alert(`Error in water route: ${waterErrorMessage}`);
    }
  }
  
  document
    .querySelector(".edit-post-form")
    .addEventListener("submit", editFormHandler);
  
