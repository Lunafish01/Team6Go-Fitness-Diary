
  const newEntryHandler = async (event) => {
    event.preventDefault();
  
    const date = document.querySelector("#date").value.trim();
    const steps = document.querySelector("#step-count").value.trim();
    const calories = document.querySelector("#calories-burned").value.trim();
    const distance = document.querySelector("#distance-travelled").value.trim();

    if (date && steps && calories && distance) {
      const response = await fetch("/api/steps", {
        method: "POST",
        body: JSON.stringify({  date,
          steps,
          calories,
          distance
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    document;
    document
      .querySelector("#new-steps-entry")
      .addEventListener("submit", newEntryHandler);
  });