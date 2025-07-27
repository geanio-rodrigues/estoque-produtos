# 📦 Estoque Produtos

**PI - UFCA** 
Sistema Web de Gerenciamento de Estoque para um Supermercado de Bairro.

---

## 📖 Sobre o Projeto

O **Estoque Produtos** é uma aplicação web simples que permite o controle de produtos, fornecedores e usuários de forma centralizada.  
Foi desenvolvida com foco em acessibilidade, aprendizado e aplicação prática de conceitos como CRUD, API REST e integração contínua (CI).

---

## ✨ Funcionalidades

- 🔐 **Login Simples**: Autenticação básica de usuários.
- 📦 **Gestão de Produtos**: Cadastro, listagem, edição e remoção de produtos.
- 🚚 **Gestão de Fornecedores**: Controle e registro de fornecedores.
- 👤 **Gestão de Usuários**: Cadastro de novos usuários no sistema.
- 💾 **Armazenamento Local com JSON** (sem banco de dados relacional).

---

## 🛠️ Tecnologias Utilizadas

| Camada       | Tecnologias                               |
|--------------|--------------------------------------------|
| Frontend     | HTML5, CSS3, JavaScript                    |
| Backend      | Python 3.11, Flask, Flask-CORS             |
| Armazenamento| Arquivo local data.json                  |
| CI/CD        | GitHub Actions + Flake8 (validação de código) |
| Linter       | Flake8 (PEP8)                              |

---

## 📸 Screenshots

**🔐 Tela de Login e Inicial**
<br>
<img src="/screenshots/tela_login.png" height="200px" width="356px">
<img src="/screenshots/tela_inicial.png" height="200px" width="356px">

**👁️‍🗨️ Telas de Visualização**
<br>
<img src="/screenshots/tela_produtos.png" height="180px" width="320px">
<img src="/screenshots/tela_fornecedores.png" height="180px" width="320px">
<img src="/screenshots/tela_usuarios.png" height="180px" width="320px">

**➕ Telas de Cadastro**
<br>
<img src="/screenshots/tela_cadastrar_produto.png" height="180px" width="320px">
<img src="/screenshots/tela_cadastrar_fornecedor.png" height="180px" width="320px">
<img src="/screenshots/tela_cadastrar_usuario.png" height="180px" width="320px">

**✏️ Telas de Edição**
<br>
<img src="/screenshots/tela_editar_produto.png" height="180px" width="320px">
<img src="/screenshots/tela_editar_fornecedor.png" height="180px" width="320px">
<img src="/screenshots/tela_editar_usuario.png" height="180px" width="320px"> 

---

## 🚀 Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos

- Python 3.11 ou superior
- Navegador moderno (Chrome, Firefox etc.)

### ⚙️ Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```
2.  **Crie um ambiente virtual e ative:**
    ```bash
    # Crie o ambiente virtual
    python -m venv venv

    # Ative o ambiente
    # No Linux/macOS:
    source venv/bin/activate
    # No Windows:
    venv\Scripts\activate
    ```
3.  **Instale as dependências:**
    ```bash
    pip install flask flask-cors
    ```
4.  **Inicie o servidor:**
    ```bash
    python server.py
    ```
5.  Abra o arquivo `index.html` no seu navegador para usar a aplicação.

---

## 🔁 Integração Contínua (CI) com GitHub Actions
Este projeto utiliza GitHub Actions para automatizar a verificação de estilo do código Python com Flake8.

### 📂 Arquivo de workflow
O arquivo de CI está localizado em:
```
.github/workflows/python-ci.yml
```

### 🛠️ A tarefa automatizada incluída:
-   **lint**: Executa o Flake8 no arquivo `server.py` para garantir que o código siga os padrões do PEP8.

### ✅ Para rodar a verificação localmente:
1.  Instale o Flake8:
    ```bash
    pip install flake8
    ```
2.  Rode o comando na raiz do projeto:
    ```bash
    flake8 server.py
    ```

### 📚 [Componente Extensionista] – O que é Integração Contínua?
Integração Contínua (CI) é uma prática em que alterações de código são verificadas automaticamente assim que são enviadas para o repositório. Isso garante que o código continue funcionando corretamente e siga padrões de qualidade.

### 👨‍🎓 Por que isso é importante para quem está aprendendo?
-   Evita erros simples e comuns.
-   Ajuda a entender como funcionam projetos reais.
-   Incentiva o hábito de escrever código limpo e organizado.
-   Mostra na prática como funciona o ciclo de desenvolvimento usado na indústria.

---

## 🗺️ Roadmap
- [x] Implementar API com Flask.
- [x] Criar interface simples em HTML/CSS.
- [x] Armazenar dados em `data.json`.
- [x] Integrar Flake8 e GitHub Actions.
- [ ] Melhorar sistema de login com autenticação segura.
- [ ] Adicionar testes automatizados para o backend.
- [ ] Separar front e back com chamadas via `fetch`.

---

## 📄 Licença
Este projeto está sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

## 🙏 Agradecimentos
-   UFCA - Universidade Federal do Cariri
-   Professores e colegas pela colaboração e aprendizado!