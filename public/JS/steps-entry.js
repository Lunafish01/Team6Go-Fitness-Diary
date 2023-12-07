
  const newEntryHandler = async (event) => {
    event.preventDefault();
  
    const date = document.querySelector("#date").value.trim();
    const step_count = document.querySelector("#step-count").value.trim();
    const calories_burned = document.querySelector("#calories-burned").value.trim();
    const distance_travelled = document.querySelector("#distance-travelled").value.trim();

    if (date && step_count && calories_burned && distance_travelled) {
      const response = await fetch("/api/steps", {
        method: "POST",
        body: JSON.stringify({  date,
          step_count,
          calories_burned,
          distance_travelled
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