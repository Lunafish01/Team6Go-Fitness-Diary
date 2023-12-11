const editEntryHandler = async (event) => {
  event.preventDefault();

  // Gather updated data from the form
  const updatedData = {
    date: document.getElementById("date").value.trim(),
    steps: document.getElementById("step-count").value.trim(),
    calories: document.getElementById("calories-burned").value.trim(),
    distance: document.getElementById("distance-travelled").value.trim(),
  }

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];


  console.log("Updated Data:", updatedData);
  console.log("Food ID:", id);

  const response = await fetch(`/api/steps/${id}`, {
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
    .querySelector(".edit-steps-form")
    .addEventListener("submit", editEntryHandler);
});
