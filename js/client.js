document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("miFormulario");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("Nombre").value;
    const email = document.getElementById("Email").value;
    const asunto = document.getElementById("Asunto").value;
    const descripcion = document.getElementById("Descripcion").value;

    try {
      const response = await fetch("http://localhost:3000/enviar-correo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: nombre,
          Email: email,
          Asunto: asunto,
          Descripcion: descripcion,
        }),
      });

      const data = await response.text();
      console.log(data);

      // Limpiar los campos del formulario después de enviar el correo
      limpiarFormulario();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  });

  function limpiarFormulario() {
    document.getElementById("Nombre").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("Asunto").value = "";
    document.getElementById("Descripcion").value = "";
  }
});
