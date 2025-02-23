document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Очищаем предыдущее сообщение
    let messageBox = document.getElementById("form-message");
    if (!messageBox) {
      messageBox = document.createElement("p");
      messageBox.id = "form-message";
      messageBox.className = "text-center mt-4 font-medium p-2 rounded-lg";
      form.appendChild(messageBox);
    }
    messageBox.textContent = "Sending...";
    messageBox.classList.remove("text-red-500", "text-green-500", "bg-red-200", "bg-green-200", "border-red-500", "border-green-500");
    messageBox.classList.add("text-blue-400");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        messageBox.textContent = "✅ Message sent successfully!";
        messageBox.classList.replace("text-blue-400", "text-green-500");
        messageBox.classList.add("bg-green-200", "border-green-500", "border", "border-opacity-100", "bg-opacity-30");
        form.reset();
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      messageBox.textContent = `❌ ${error.message}`;
      messageBox.classList.replace("text-blue-400", "text-red-500");
      messageBox.classList.add("bg-red-200", "border-red-500", "border", "border-opacity-100", "bg-opacity-30");
    }
  });
});