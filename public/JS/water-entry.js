
const newEntryHandler = async (event) => {
  event.preventDefault();

  const date = document.querySelector("#date").value.trim();
  const daily_goal = document.querySelector("#daily-goal").value.trim();
  const actual_intake = document.querySelector("#actual-intake").value.trim();

  if (date && daily_goal && actual_intake) {
    const response = await fetch("/api/water", {
      method: "POST",
      body: JSON.stringify({  date,
        daily_goal,
        actual_intake}),
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
    .querySelector("#new-water-entry")
    .addEventListener("submit", newEntryHandler);
});