async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];

    // food api entry delete
    const foodResponse = await fetch(`/api/food/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        post_id: id,
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
      alert(`Error: ${foodErrorMessage}`);
    }

    // steps api entry delete
  const stepsResponse = await fetch(`/api/steps/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // If successful, redirect the browser to the dashboard page
  if (stepsResponse.ok) {
    document.location.replace("/dashboard/");
  } else {
    const stepsErrorMessage = await stepsResponse.text();
    alert(`Error: ${stepsErrorMessage}`);
  }

  // water api entry delete
  const waterResponse = await fetch(`/api/water/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // If successful, redirect the browser to the dashboard page
  if (waterResponse.ok) {
    document.location.replace("/dashboard/");
  } else {
    const waterErrorMessage = await waterResponse.text();
    alert(`Error: ${waterErrorMessage}`);
  }
  }


  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-post-btn")) {
      deleteFormHandler(event);
    }
  });
  

  