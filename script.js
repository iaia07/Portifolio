import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// URL do seu projeto Supabase
const supabaseUrl = "https://hjuscxfnsigrjbemmgqs.supabase.co";

// Publishable Key do Supabase
const supabaseKey = "sb_publishable_ISScGeHISLRCRqqOlVI3rA_mBKko7CU";

// Cria a conexão com o Supabase
const supabase = createClient(
    supabaseUrl,
    supabaseKey
);


// FUNÇÃO DE LOGIN
async function entrar(event) {

    event.preventDefault();

    const email = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
    const botao = document.getElementById("loginBtn");
    const mensagem = document.getElementById("mensagem");

    // Muda o botão enquanto faz o login
    botao.value = "Entrando...";
    botao.disabled = true;

    mensagem.textContent = "";

    try {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            console.error(error);

            mensagem.textContent = "E-mail ou senha incorretos.";
            botao.value = "Login";
            botao.disabled = false;

            return;
        }

        console.log("Usuário logado:", data.user);

        mensagem.textContent = "Login realizado com sucesso!";

        // Depois do login, vai para o site
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (erro) {

        console.error(erro);

        mensagem.textContent = "Ocorreu um erro ao realizar o login.";

        botao.value = "Login";
        botao.disabled = false;
    }
}

window.entrar = entrar;