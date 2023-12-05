async function newEntryHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const steps = document.querySelector('input[name="step-count"]').value;
    const calories = document.querySelector('input[name="calories-burned"]').value;
    const distance = document.querySelector('input[name="distance-travelled"]').value;

    const response = await fetch(`/api/stepsRoutes`, {
      method: "POST",
      body: JSON.stringify({
        title,
        steps,
        calories,
        distance
        
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
    }
    
  }
  
  document.querySelector("#new-steps-entry").addEventListener("submit", newEntryHandler);