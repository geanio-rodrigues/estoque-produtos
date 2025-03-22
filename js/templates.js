// Pegar a página atual que o usuário se encontra
const page = window.location.pathname.split("/").pop();

// Barra de navegação
const headerContainer = document.getElementById("header-container");

// Guardando os parâmetro de tipo
const params = new URLSearchParams(window.location.search);
const type = params.get("type");

if (headerContainer.innerHTML === "") {
    let navbar = document.createElement("nav");
    let navbarLeft = document.createElement("div");
    let navbarCenter = document.createElement("div");
    let navbarRight = document.createElement("div");
    let brand = document.createElement("a");
    let imgBrand = document.createElement("img");
    let userInformation = document.createElement("ul");
    let liUsername = document.createElement("li");
    let liRole = document.createElement("li");
    let username = document.createElement("span");
    let role = document.createElement("span");
    let divider = document.createElement("span");
    let logout = document.createElement("a");
    let iconLogout = document.createElement("i");
    let home = document.createElement("a");
    let iconHome = document.createElement("i");
    let register = document.createElement("a");
    let iconRegister = document.createElement("i");
    let search = document.createElement("a");
    let iconSearch = document.createElement("i");


    navbar.className = "navbar navbar-expand-lg";
    navbarLeft.className = "navbar-left";
    brand.href = "#"
    brand.className = "navbar-brand";
    imgBrand.src = "img/user-icon.png";
    imgBrand.alt = "User";
    imgBrand.id = "logo";
    userInformation.className = "user-information";
    username.id = "username";
    role.id = "role";
    if(userLogged) {
        username.innerText = userLogged.fullname;
        role.innerText = userLogged.role;
    } else {
        username.innerText = "Usuário Desconhecido";
        role.innerText = "Sem Cargo";
    }
    divider.className  = "divider";
    navbarRight.className = "navbar-right";
    logout.href = "#";
    logout.onclick = () => {logoutSystem()};
    logout.className = "logout";
    logout.innerText = "Sair ";
    iconLogout.className = "fas fa-power-off";
    home.className = "navbar-item";
    home.href = "home.html";

    navbarCenter.className = "navbar-center";
    home.href = "home.html";
    home.className = "navbar-item";
    iconHome.className = "fas fa-home";
    register.href = "#";
    register.onclick = () => {redirectToRegister(type)};
    register.className = "navbar-item";
    iconRegister.className = "fas fa-square-plus";
    search.href = "#";
    search.className = "navbar-item";
    iconSearch.className = "fas fa-search"; 
    
    headerContainer.appendChild(navbar);

    navbar.appendChild(navbarLeft);
    navbarLeft.appendChild(brand);
    navbarLeft.appendChild(divider);
    brand.appendChild(imgBrand);
    brand.appendChild(userInformation);
    userInformation.appendChild(liUsername);
    userInformation.appendChild(liRole);
    liUsername.appendChild(username);
    liRole.appendChild(role);

    navbar.appendChild(navbarRight);
    navbarRight.appendChild(logout);
    logout.appendChild(iconLogout);

    if (page === "dashboard.html") {

        // Excluir navbarRight
        navbar.removeChild(navbarRight);
        
        navbar.appendChild(navbarCenter);
        navbarCenter.appendChild(home);
        home.appendChild(iconHome);
        home.appendChild(document.createTextNode(" Home"));
        navbarCenter.appendChild(register);
        register.appendChild(iconRegister);
        register.appendChild(document.createTextNode(" Cadastrar"));
        navbarCenter.appendChild(search);
        search.appendChild(iconSearch);
        search.appendChild(document.createTextNode(" Procurar"));

        // Adicionando novamente navbarRight, agora depois de navbarCenter
        navbar.appendChild(navbarRight);
        navbarRight.appendChild(logout);
        logout.appendChild(iconLogout);
    }
}

// Body
// Página Inicial - Home
const mainContainer = document.getElementById("main-container");

if (page === "home.html") {

    let menu = document.createElement("div");
    let btnProduct = document.createElement("button");
    let btnUser = document.createElement("button");
    let btnSupplier = document.createElement("button");

    menu.className = "menu-group";
    btnProduct.className = "btn btn-lg";
    btnProduct.onclick = () => {redirectToDashboard('products')};
    btnProduct.innerText = "Produtos";
    btnUser.className = "btn btn-lg";
    btnUser.onclick = () => {redirectToDashboard('users')};
    btnUser.innerText = "Usuários";
    btnSupplier.className = "btn btn-lg";
    btnSupplier.onclick = () => {redirectToDashboard('suppliers')};
    btnSupplier.innerText = "Fornecedores";

    mainContainer.appendChild(menu);
    menu.appendChild(btnProduct);
    menu.appendChild(btnUser);
    menu.appendChild(btnSupplier);

} else if (page === "dashboard.html") {

    // Página Dashboard
    const tableContainer = document.getElementById("header-table");
    const dataTable = document.getElementById("data-table");

    let data = []; // Variável para armazenar os dados correspondentes

    if (type === "products") {
        data = products;
    } else if (type === "users") {
        data = users;
    } else if (type === "suppliers") {
        data = suppliers;
    } else {
        alert("Página não encontrada!");
        window.history.back();
    }

    if (tableContainer.innerHTML === "") {

        let row = document.createElement("tr");

        if(type === "products") {
            // Lista de colunas para o cabeçalho da tabela
            const headers = ["#", "Nome", "Categoria", "Marca", "Quantidade", "Valor Venda", "Valor Compra", ""];

            // Percorre os títulos e cria um <th> para cada um
            headers.forEach(text => {
                let th = document.createElement("th");
                th.setAttribute("scope", "col");
                th.innerText = text;
                row.appendChild(th);
            });

            tableContainer.appendChild(row);

        } else if(type === "users" || type === "suppliers") {
            const headers = ["#", "Nome", "Telefone", "E-mail", ""];

            headers.forEach(text => {
                let th = document.createElement("th");
                th.setAttribute("scope", "col");
                th.innerText = text;
                row.appendChild(th);
            });

            tableContainer.appendChild(row);

        } else {
            alert("Página não encontrada!");
            window.history.back();
        }
    }

    if (data.length > 0) {
        dataTable.innerHTML = ""; // Limpa o conteúdo anterior

        data.forEach(item => {
            let tr = document.createElement("tr");

            if (type === "products") {
                tr.innerHTML = `
                    <td scope="row">${item.id}</td>
                    <td scope="row">${item.name}</td>
                    <td scope="row">${item.category}</td>
                    <td scope="row">${item.brand}</td>
                    <td scope="row">${item.quantity}</td>
                    <td scope="row">R$ ${(item.purchase_price * 1.3).toFixed(2)}</td>
                    <td scope="row">R$ ${item.purchase_price.toFixed(2)}</td>
                    <td class="actions">
                        <a href="#"><i class="fas fa-eye check-icon"></i></a>
                        <a href="#"><i class="fas fa-edit edit-icon"></i></a>
                        <a href="#"><i class="far fa-circle-xmark delete-icon"></i></a>
                    </td>
                `;
            } else {
                tr.innerHTML = `
                    <td scope="row">${item.id}</td>
                    <td scope="row">${type === "users" ? item.fullname : item.name}</td>
                    <td scope="row">${item.phone}</td>
                    <td scope="row">${item.email}</td>
                    <td class="actions">
                        <a href="#"><i class="fas fa-eye check-icon"></i></a>
                        <a href="#"><i class="fas fa-edit edit-icon"></i></a>
                        <a href="#"><i class="far fa-circle-xmark delete-icon"></i></a>
                    </td>
                `;
            }

            dataTable.appendChild(tr);
        });
    } else {
        dataTable.innerHTML = "<tr><td colspan='5'>Nenhum dado disponível.</td></tr>";
    }

} else if (page === "register.html") {

    let formContainer = document.getElementById("form-container");
    let title = document.createElement("h2");
    let form = document.createElement("form");
    form.id = "dynamic-form";

    if(type === "products") {
        title.innerText = "Novo Produto";
        form.appendChild(title);

        form.appendChild(createInput("Nome:", "name", "text", "Informe o nome do Produto"));
        form.appendChild(createInput("Categoria:", "category", "text", "Informe a categoria do produto"));
        form.appendChild(createInput("Marca:", "brand", "text", "Informe a marca do produto"));
        form.appendChild(createInput("Quantidade:", "quantity", "number", "Informe a quantidade atual em estoque"));
        form.appendChild(createInput("Valor de Compra:", "purchase_price", "number", "Informe o valor de compra"));

        // Resgatando o nome dos fornecedores
        let supplierNames = suppliers.map(supplier => supplier.name);
        form.appendChild(createSelect("Fornecedor:", "supplier", supplierNames));

        form.appendChild(createTextArea("Observações:", "notes", "Insira informações adicionais sobre o produto..."));

    } else if(type === "users") {
        title.innerText = "Novo Usuário";
        form.appendChild(title);

        let fullName = createInput("Nome Completo:", "fullname", "text", "Informe o nome completo do usuário");
        let username = createInput("Nome de Usuário:", "username", "text", "Gerado automaticamente");

        // Nome de usuário gerado automáticamente
        let usernameInput = username.querySelector("input"); 
        if(usernameInput) {
            usernameInput.readOnly = true;
        }

        // Atualiza o campo de nome de usuário com base no nome completo
        fullName.querySelector("input").addEventListener("input", function () {
            let names = this.value.trim().split(" "); 
            if(names.length > 1) {
                let first = names[0].toLowerCase();
                let last = names[names.length - 1].toLowerCase();
                username.querySelector("input").value = `${first}${last}`;
            }
        });

        form.appendChild(fullName);
        form.appendChild(username);
        form.appendChild(createInput("Telefone:", "phone", "tel", "Informe o telefone com DDD. Ex: 88999998888"));
        form.appendChild(createInput("E-mail:", "email", "email", "Informe o e-mail"));
        form.appendChild(createInput("Senha:", "password", "password", "Informe sua senha"));
        form.appendChild(createInput("Confirme a Senha:", "confirm_password", "password", "Confirme sua senha"));
        form.appendChild(createInput("Cargo/Função:", "role", "text", "Informe o cargo/função do usuário"));
        form.appendChild(createTextArea("Observações:", "notes", "Insira informações adicionais sobre o usuário..."));


    } else {
        title.innerText = "Novo Fornecedor";
        form.appendChild(title);

        form.appendChild(createInput("Nome:", "name", "text", "Informe o nome do Fornecedor"));
        form.appendChild(createInput("Telefone:", "phone", "tel", "Informe o telefone com DDD. Ex: 8899998888"));
        form.appendChild(createInput("E-mail:", "email", "email", "Informe o email do Fornecedor"));
        form.appendChild(createTextArea("Observações:", "notes", "Insira informações adicionais sobre o fornecedor..."))
    }
    

    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "btn btn-primary";
    submitButton.innerText = "Cadastrar";

    form.appendChild(submitButton);
    formContainer.appendChild(form);

}

// Footer
const footerContainer = document.getElementById("footer-container");

if (footerContainer.innerHTML === "") {
    let p = document.createElement("p");
    p.innerHTML = "&copy; 2025 Sistema de Estoque";
    footerContainer.appendChild(p);
}