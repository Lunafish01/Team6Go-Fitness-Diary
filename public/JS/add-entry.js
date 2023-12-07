
const newEntryHandler = async (event) => {
  event.preventDefault();

  const food_name = document.querySelector("#meal-name").value.trim();
  const calorie_count = document.querySelector("#calories").value.trim();
  const serving_amount = document.querySelector("#serving-size").value.trim();

  if (food_name && calorie_count && serving_amount) {
    const response = await fetch("/api/food", {
      method: "POST",
      body: JSON.stringify({  food_name,
        calorie_count,
        serving_amount}),
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
    .querySelector("#new-food-entry2")
    .addEventListener("submit", newEntryHandler);
});