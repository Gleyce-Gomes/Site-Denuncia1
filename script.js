document.getElementById("form-denuncia").addEventListener("submit", async function(event) {
    event.preventDefault(); // impede o recarregamento da página

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const local = document.getElementById("local").value.trim();
    const arquivo = document.getElementById("foto").files[0];

    //Validação
    if (!nome || !email || !local) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Digite um e-mail válido!");
        return;
    }

    if (!arquivo) {
        alert("Por Favor, anexe uma foto!");
        return;
    }

    if (arquivo.size > 5 * 1024 * 1024) {
        alert("O arquivo é muito grande! Máximo permitido: 5MB.");
        return;
    }

    if (arquivo.size > 5 * 1024 * 1024) { // 5 MB
        alert("O arquivo é muito grande! Máximo: 5MB.");
        return;
    }

    //Enviar via fetch()
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("local", local);
    formData.append("foto", arquivo);

    try {
        const resposta = await fetch("seu_arquivo_backend.php", {
            method: "POST",
            body: formData
        });

        if (resposta.ok) {
            alert("Denúncia enviada com sucesso!");
            document.getElementById("form-denuncia").reset();
        } else {
            alert("Erro ao enviar. Tente novamente mais tarde.");
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro de conexão com o servidor.");
    }
});