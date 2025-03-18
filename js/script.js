function redirectToDashboard(type) {
    window.location.href = `dashboard.html?type=${type}`;
}

// Remover todos os erros antes de validar novamente
function cleanErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
}


// Recuperar o usuário logado do localStorage
const userLogged = JSON.parse(localStorage.getItem("userLogged"));

async function getUserData() {
    try {
        const response = await fetch ("js/data.json");
        if(!response.ok) {
            throw new Error("Erro ao carregar os dados do servidor.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao obter dados:", error);
        showMsg(error.message, "error");
        return null;
    }
}

function showMsg(message, type) {
    let elementId = type === "error" ? "error-msg" : "success-msg";
    const messageElement = document.getElementById(elementId);

    if(messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = "block"; // Garantir que o bloco da mensagem seja visível

        // Remover a mensagem após 3 segundos
        setTimeout(() => {
            messageElement.textContent = "";
            messageElement.style.display = "none"; // Esconde o bloco da mensagem novamente
        }, 3000);
    }
}

function logoutSystem(event) {
    localStorage.removeItem("userLogged");
    window.location.href = "index.html";
}
