// Configuração do Supabase usando a CDN global
const supabaseUrl = "https://hjuscxfnsigrjbemmgqs.supabase.co";

// ATENÇÃO: Substitua pela chave "anon key" válida do seu painel do Supabase
const supabaseKey = "sb_publishable_ISScGeHISLRCRqqOlVI3rA_mBKko7CU";

// Instancia o cliente usando a variável global 'supabase' carregada no HTML
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    
    if (form) {
        form.addEventListener("submit", entrar);
    }
});

async function entrar(event) {
    // Cancela o recarregamento da página ao enviar o formulário
    event.preventDefault();

    const email = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
    const botao = document.getElementById("loginBtn");
    const mensagem = document.getElementById("mensagem");

    // Desabilita o botão para feedback visual
    botao.value = "Entrando...";
    botao.disabled = true;
    mensagem.style.color = "#333";
    mensagem.textContent = "Verificando dados...";

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            console.error("Erro do Supabase:", error.message);
            mensagem.style.color = "red";
            mensagem.textContent = "E-mail ou senha incorretos.";
            
            botao.value = "Login";
            botao.disabled = false;
            return;
        }

        console.log("Usuário logado:", data.user);
        mensagem.style.color = "green";
        mensagem.textContent = "Login realizado com sucesso!";

        // Redireciona para o home.html
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000);

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        mensagem.style.color = "red";
        mensagem.textContent = "Ocorreu um erro ao conectar com o servidor.";

        botao.value = "Login";
        botao.disabled = false;
    }
}