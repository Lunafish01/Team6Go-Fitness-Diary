async function newEntryHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const calories = document.querySelector('input[name="calories"]').value;
  const servingSize = document.querySelector('input[name="serving-size"]').value;

  const response = await fetch(`/api/foodRoutes`, {
    method: "POST",
    body: JSON.stringify({
      title,
      calories,
      servingSize
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#new-food-entry").addEventListener("submit", newEntryHandler);
