// DOMContentLoaded - Se o usuário estiver em outra página, o código não gera erro
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("dynamic-form");
    if(registerForm){
        registerForm.addEventListener("submit", validateForm);
    }
});

// Evento de submit para página de login
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", validateUser);
}


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
    const user = data.users.find(user => user.username === username);

    if(user) {
        if (user.password === password) {
            localStorage.setItem("userLogged", JSON.stringify(user)); // Salva o usuário logado
            localStorage.setItem("welcomeMessage", "Seja Bem-vindo");
            localStorage.setItem("statusMsg", "sucess");
            window.location.href = "home.html";
        } else {
            showMsg("Usuário ou senha incorretos.", "error");
        }
    } else {
        showMsg("Usuário ou senha incorretos.", "error");
    }
}

async function validateForm(event) {
    event.preventDefault();
    let success = false;
    let dataToSend = {};

    if (type === "products") {
        dataToSend = {
            type: "products",
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            brand: document.getElementById("brand").value,
            quantity: document.getElementById("quantity").value,
            purchase_price: document.getElementById("purchase_price").value,
            supplier: document.getElementById("supplier").value,
            notes: document.getElementById("notes").value
        };
        success = true;
    } else if (type === "users") {
        dataToSend = {
            type: "users",
            fullname: document.getElementById("fullname").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            confirm_password: document.getElementById("confirm_password").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            role: document.getElementById("role").value,
            notes: document.getElementById("notes").value
        };
        success = true;
    } else if (type === "suppliers") {
        dataToSend = {
            type: "suppliers",
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            notes: document.getElementById("notes").value
        };
        success = true;
    }

    if (success) {
        try {
            const response = await fetch("http://127.0.0.1:5000/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("msg", "Dados cadastrados com sucesso!");
                localStorage.setItem("statusMsg", "success");
                redirectToDashboard(type);
            } else {
                showMsg(result.message || "Erro ao cadastrar os dados!", "error");
            }
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
            showMsg("Erro ao conectar com o servidor!", "error");
        }
    }
}