const editEntryHandler = async (event) => {
  event.preventDefault();

  // Gather updated data from the form
  const updatedData = {
    food_name: document.getElementById("meal-name").value.trim(),
    calorie_count: document.getElementById("calories").value.trim(),
    serving_amount: document.getElementById("serving-size").value.trim(),
  };

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];


  console.log("Updated Data:", updatedData);
  console.log("Food ID:", id);

  const response = await fetch(`/api/food/${id}`, {
    method: "PUT",
    body: JSON.stringify(
     updatedData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("API Response:", response);

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document;
  document
    .querySelector(".edit-food-form")
    .addEventListener("submit", editEntryHandler);
});
