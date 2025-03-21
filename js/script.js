function redirectToDashboard(type) {
    window.location.href = `dashboard.html?type=${type}`;
}

function redirectToRegister(type) {
    window.location.href = `register.html?type=${type}`;
}

// Recuperar o usuário logado do localStorage
const userLogged = JSON.parse(localStorage.getItem("userLogged"));

const users = JSON.parse(localStorage.getItem("users")) || [];
const products = JSON.parse(localStorage.getItem("products")) || [];
const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

async function getUserData() {
    try {
        const response = await fetch ("js/data.json");
        if(!response.ok) {
            showMsg("Erro ao carregar os dados do servidor.", "error");
        }
        const data = await response.json();
        localStorage.setItem("users", JSON.stringify(data.users));
        localStorage.setItem("products", JSON.stringify(data.products));
        localStorage.setItem("suppliers", JSON.stringify(data.suppliers));

        return data;
    } catch (error) {
        console.error("Erro ao obter dados:", error);
        showMsg(error.message, "error");
        return null;
    }
}

function showMsg(message, type) {
    let elementId = type === "error" ? "error-msg" : "success-msg";
    const messageElement = document.createElement("p");
    messageElement.className = elementId;
    const msgContainer = document.getElementById("msg-container");

    if(messageElement) {
        messageElement.textContent = message;
        msgContainer.style.display = "block"; // Garantir que o bloco da mensagem seja visível
        msgContainer.appendChild(messageElement);

        // Remover a mensagem após 3 segundos
        setTimeout(() => {
            messageElement.textContent = "";
            msgContainer.style.display = "none"; // Esconde o bloco da mensagem novamente
        }, 3000);
    }
}

function logoutSystem() {
    localStorage.removeItem("userLogged");
    localStorage.removeItem("users");
    localStorage.removeItem("products");
    localStorage.removeItem("suppliers");
    window.location.href = "index.html";
}
