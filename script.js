async function entrar(event) {
    event.preventDefault();

    // Pega os valores digitados
    const email = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
    const botao = document.getElementById("loginBtn");

    // Verifica se os campos estão preenchidos
    if (email === "" || senha === "") {
        alert("Preencha o e-mail e a senha!");
        return;
    }

    // Muda o botão enquanto faz o login
    botao.value = "Entrando...";
    botao.disabled = true;

    try {
        const resposta = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        // Mostra no console o que o servidor respondeu
        console.log("Resposta do servidor:", dados);

        if (resposta.ok && dados.success) {

            botao.value = "Sucesso!";
            botao.style.background = "green";

            // Salva os dados do usuário
            localStorage.setItem("usuario", JSON.stringify(dados.user));

            // Redireciona para a página home.html
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);

        } else {

            botao.value = "Login";
            botao.disabled = false;

            alert(dados.message || "E-mail ou senha inválidos!");
        }

    } catch (erro) {

        console.error("Erro no login:", erro);

        botao.value = "Login";
        botao.disabled = false;

        alert("Não foi possível conectar ao servidor. Verifique se o Node.js está rodando.");
    }
}