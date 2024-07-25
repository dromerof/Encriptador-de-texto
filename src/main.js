document.addEventListener("DOMContentLoaded", () => {
  // Selección de elementos del DOM
  const textToEncrypt = document.getElementById("contenido-encriptar");
  const encryptedText = document.getElementById("contenido-desencriptar");
  const encryptButton = document.getElementById("encriptar");
  const decryptButton = document.getElementById("desencriptar");
  const copyButton = document.getElementById("copiar");
  const alertMessage = document.getElementById("mensaje-alerta");

  // Inicialización: limpiar campos y ocultar el botón de copiar al cargar la página
  textToEncrypt.value = "";
  encryptedText.value = "";
  copyButton.style.display = "none";

  // Reglas de reemplazo para encriptación y desencriptación
  const replacementRules = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];

  // Función para validar si el texto contiene caracteres no permitidos
  function validar(texto) {
    return /[A-ZÀ-ÖØ-öø-ÿ\u00E0-\u00FC]/.test(texto);
  }

  // Función para mostrar mensajes de alerta
  function showAlertMessage(mensaje, duracion) {
    alertMessage.textContent = mensaje;
    alertMessage.style.display = "flex";
    setTimeout(() => {
      alertMessage.style.display = "none";
    }, duracion);
  }

  // Función para alternar la visibilidad del botón de copiar
  function toggleCopyButton() {
    if (encryptedText.value.trim() !== "") {
      copyButton.style.display = "inline";
    } else {
      copyButton.style.display = "none";
    }
  }

  // Función para encriptar el texto
  function encryptText() {
    let texto = textToEncrypt.value;
    if (validar(texto)) {
      showAlertMessage(
        "Sólo se aceptan minúsculas y palabras sin acento",
        2000
      );
      textToEncrypt.value = "";
      encryptedText.value = "";
    } else {
      for (let i = 0; i < replacementRules.length; i++) {
        texto = texto.replaceAll(
          replacementRules[i][0],
          replacementRules[i][1]
        );
      }
      encryptedText.value = texto;
    }
    encryptedText.focus();
    toggleCopyButton();
  }

  // Función para desencriptar el texto
  function decryptText() {
    let texto = textToEncrypt.value;
    if (validar(texto)) {
      showAlertMessage(
        "Sólo se aceptan minúsculas y palabras sin acento",
        2000
      );
      textToEncrypt.value = "";
      encryptedText.value = "";
    } else {
      for (let i = 0; i < replacementRules.length; i++) {
        texto = texto.replaceAll(
          replacementRules[i][1],
          replacementRules[i][0]
        );
      }
      encryptedText.value = texto;
    }
    encryptedText.focus();
    toggleCopyButton();
  }

  // Función para copiar el texto al portapapeles
  function copyText() {
    if (encryptedText.value.trim() !== "") {
      encryptedText.select();
      encryptedText.setSelectionRange(0, encryptedText.value.length);
      navigator.clipboard
        .writeText(encryptedText.value)
        .then(() => showAlertMessage("Texto copiado al portapapeles", 700))
        .catch((err) =>
          showAlertMessage(`Error al copiar el texto: ${err}`, 2000)
        );
    } else {
      showAlertMessage("No hay texto para copiar", 2000);
    }
  }

  // Agregar un event listener al área de encriptar para limpiar el área de desencriptar
  textToEncrypt.addEventListener("input", () => {
    if (textToEncrypt.value.trim() === "") {
      encryptedText.value = "";
      toggleCopyButton();
    }
  });

  // Asocia los botones con sus respectivas funciones
  encryptButton.addEventListener("click", encryptText);
  decryptButton.addEventListener("click", decryptText);
  copyButton.addEventListener("click", copyText);
});
