// Se o usuário estiver em outra página, o código não gera erro
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    
    if (loginForm) {
        loginForm.addEventListener("submit", validateUser);
    }
})

// Validação do usuário
async function validateUser(event) {
    // Impede o envio do formulário
    event.preventDefault();

    cleanErrors();

    // Coletar os dados
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const data = await getUserData();

    // Verificar se o usuário existe
    const user = data.users.find(user => user.username === username);

    if(user) {
        if (user.password === password) {
            localStorage.setItem("userLogged", JSON.stringify(user)); // Salva o usuário logado
            window.location.href = "home.html";
        } else {
            showMsg("Usuário ou senha incorretos.", "error");
        }
    } else {
        showMsg("Usuário ou senha incorretos.", "error");
    }
}