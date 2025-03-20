// Se o usuário estiver em outra página, o código não gera erro
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    
    if (loginForm) {
        loginForm.addEventListener("submit", validateUser);
    }
})

// Impedir que usuário acesse outras páginas sem estar logado
document.addEventListener("DOMContentLoaded", () => {
    if(window.location.pathname !== "/index.html" && !localStorage.getItem("userLogged")) {
        window.location.href = "index.html";
        alert("Você não tem permissão para acessar essa página!");
    }
})

// Validação do usuário
async function validateUser(event) {
    // Impede o envio do formulário
    event.preventDefault();

    // Coletar os dados
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const data = await getUserData();

    // Verificar se o usuário existe
    const user = users.find(user => user.username === username);

    if(user) {
        if (user.password === password) {
            localStorage.setItem("userLogged", JSON.stringify(user)); // Salva o usuário logado
            localStorage.setItem("welcomeMessage", "true");
            window.location.href = "home.html";
        } else {
            showMsg("Usuário ou senha incorretos.", "error");
        }
    } else {
        showMsg("Usuário ou senha incorretos.", "error");
    }
}

// Mensagem de boas vindas apenas na primeira vez
document.addEventListener("DOMContentLoaded", () => {
    if(window.location.pathname === "/home.html" && localStorage.getItem("welcomeMessage")) {
        showMsg("Seja Bem-vindo!");
        localStorage.removeItem("welcomeMessage");
    }
})