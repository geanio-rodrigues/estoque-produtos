function redirectToDashboard(type) {
    window.location.href = `dashboard.html?type=${type}`;
}

// Mostrar erros
function showError(field, msg) {
    const input = document.getElementById(field);
    let erroMsg = document.createElement("p");
    erroMsg.classList.add("error-message");
    erroMsg.innerText = msg;
    input.parentNode.appendChild(erroMsg);
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
    if(type === "error") {
        const errorElement = document.getElementById("error-msg");
        errorElement.textContent = message;
    } else if(type === "success") {
        const successElement = document.getElementById("success-msg");
        successElement.textContent = message;
    }
}
