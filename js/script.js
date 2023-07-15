const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = (chatElemet) => {
  const messageElement = chatElemet.querySelector("p");

  const userMessageLowercase = userMessage.toLowerCase();

  if (userMessageLowercase.includes("hola") || userMessageLowercase.includes("saludos")) {
    messageElement.textContent = "¡Hola! ¿En qué puedo ayudarte hoy? 😀";
  } else if (userMessageLowercase.includes("adiós") || userMessageLowercase.includes("chao")) {
    messageElement.textContent = "¡Hasta luego! Si tienes más consultas, estaré aquí para ayudarte. 👋";
} else if (userMessageLowercase.includes("atención al cliente") || userMessageLowercase.includes("atencion al cliente") || userMessageLowercase.includes("ayuda")) {
    const response = "¿En qué puedo ayudarte?\n1.Ponerse en contacto con un asesor\n2. Seguir buscando";
    messageElement.textContent = response;
  } else if (userMessageLowercase.includes("contacto") || userMessageLowercase.includes("asesor") || userMessageLowercase.includes("1")) {
    const response = "Por supuesto, uno de nuestros asesores estará encantado de ayudarte. Puedes comunicarte con nosotros a través de este enlace de WhatsApp: <a href='https://wa.me/51980544923' target='_blank'>Haz clic aquí</a> 📞";
    messageElement.innerHTML = response;
  } else if (userMessageLowercase.includes("seguir buscando")|| userMessageLowercase.includes("2")) {
    const response = "Perfecto, sigue buscando lo que necesitas. Si tienes más preguntas, estaré aquí para ayudarte. 👍";
    messageElement.textContent = response;
  } else if (userMessageLowercase.includes("buscar", "buscar producto", "quiero buscar un producto")) {
    messageElement.textContent = "Claro, ¿que producto deseas buscar? 🔍";
  } else if (userMessageLowercase.includes(" ", "quiero buscar un producto")) {
    // Lógica para buscar productos
    const products = [

      { name: "televisor philips smart 32", link: "http://localhost:3000/product-details.php?pid=1" },
      { name: "iphone 6", link: "http://localhost:3000/product-details.php?pid=2" },
      { name: "redmi note 4", link: "http://localhost:3000/product-details.php?pid=3" },
      { name: "lenovo k6", link: "http://localhost:3000/product-details.php?pid=4" },
      { name: "lenovo k5", link: "http://localhost:3000/product-details.php?pid=5" },
      { name: "micromax 4g", link: "http://localhost:3000/product-details.php?pid=6" },
      { name: "samsung galaxy on5", link: "http://localhost:3000/product-details.php?pid=7" },
      { name: "oppo a57", link: "http://localhost:3000/product-details.php?pid=8" },
      { name: "affix", link: "http://localhost:3000/product-details.php?pid=9" },
      { name: "acer 15", link: "http://localhost:3000/product-details.php?pid=11" },
      { name: "micromax laptab", link: "http://localhost:3000/product-details.php?pid=12" },
      { name: "hp i5", link: "http://localhost:3000/product-details.php?pid=13" },
      { name: "lenovo ideapad 110", link: "http://localhost:3000/product-details.php?pid=14" },
      { name: "diario de greg", link: "http://localhost:3000/product-details.php?pid=15" },
      { name: "thea stilton", link: "http://localhost:3000/product-details.php?pid=16" },
      { name: "cama induscraft", link: "http://localhost:3000/product-details.php?pid=17" },
      { name: "cama nikamal", link: "http://localhost:3000/product-details.php?pid=18" },
      { name: "asian casual", link: "http://localhost:3000/product-details.php?pid=19" },
      { name: "zapatillas adidas messi", link: "http://localhost:3000/product-details.php?pid=20" }
    ];

    const productNames = products.map(product => product.name.toLowerCase());
    let response = "";

    for (let i = 0; i < productNames.length; i++) {
      if (userMessageLowercase.includes(productNames[i])) {
        response = `Puedes encontrar el producto "${products[i].name}" a un buen precio aquí: <a href="${products[i].link}">${products[i].name}</a>`;
        break;
      }
    }

    if (response === "") {
      response = "Lo siento, no pude encontrar información sobre ese producto.";
    }

    messageElement.innerHTML = response;
  } else {
    messageElement.textContent = "Lo siento, no puedo entender tu consulta. ¿Podrías ser más específico? ❓";
};
  }

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Escribiendo...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
