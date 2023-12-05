async function newEntryHandler(event) {
    event.preventDefault();
  
    const date = document.querySelector('input[name="date"]').value;
    const goal = document.querySelector('input[name="daily-goal"]').value;
    const intake = document.querySelector('input[name="actual-intake"]').value;

    const response = await fetch(`/api/waterRoutes`, {
      method: "POST",
      body: JSON.stringify({
        date,
        goal,
        intake
        
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
  
  document.querySelector("#new-water-entry").addEventListener("submit", newEntryHandler);