// 1. Base de Conhecimento
const locais = [
    { nome: "Glouton", tags: ["date", "caro", "comida", "bebida"], desc: "Alta gastronomia do chef Leo Paixão. Perfeito para impressionar." },
    { nome: "Cofre Bar", tags: ["date", "caro", "bebida", "alternativo"], desc: "Localizado no subsolo do antigo Banco Lavra. Experiência única e misteriosa." },
    { nome: "Taste-Vin", tags: ["date", "familia", "caro", "comida", "bebida"], desc: "O melhor suflê de BH e uma carta de vinhos premiada." },
    { nome: "Fogo de Chão", tags: ["familia", "caro", "comida"], desc: "Churrascaria premium para quem não abre mão de fartura em família." },
    { nome: "Juramento 202", tags: ["amigos", "acessivel", "bebida", "alternativo"], desc: "Cervejaria artesanal raiz com mesas na calçada e clima de bairro." },
    { nome: "Dub", tags: ["amigos", "acessivel", "bebida", "musica", "alternativo"], desc: "Localizado no Maletta, com DJs e vista para o centro histórico." },
    { nome: "Mercado Central", tags: ["familia", "acessivel", "comida", "bebida"], desc: "O coração de BH. Fígado com jiló e queijos artesanais." },
    { nome: "Sula", tags: ["alternativo", "acessivel", "comida", "bebida", "musica", "amigos"], desc: "Cozinha contemporânea no Hipercentro com pista de dança." },
    { nome: "Cantina do Lucas", tags: ["date", "familia", "acessivel", "comida", "bebida"], desc: "Patrimônio cultural de BH no Edifício Maletta. Tradicional e acolhedor." },
    { nome: "Bolão (Santa Tereza)", tags: ["amigos", "acessivel", "comida", "bebida", "musica"], desc: "O rei do espaguete na madrugada de Santa Tereza." },
    { nome: "Arcângelo (Maletta)", tags: ["amigos", "acessivel", "comida", "bebida", "alternativo"], desc: "Cerveja gelada e o melhor bolinho de carne do Maletta." },
    { nome: "Xapuri", tags: ["familia", "acessivel", "comida"], desc: "Referência em comida mineira feita no fogão a lenha na Pampulha." },
    { nome: "Panorama Pizzaria", tags: ["date", "acessivel", "comida"], desc: "Pizzas com sotaque mineiro e uma das vistas mais icônicas da cidade." },
    { nome: "Praça da Liberdade", tags: ["familia", "date", "gratis", "alternativo"], desc: "Conjunto arquitetônico maravilhoso para um piquenique ou passeio." },
    { nome: "Praça do Papa", tags: ["date", "amigos", "gratis", "bebida", "musica"], desc: "Pôr do sol clássico com galera jovem e artistas de rua." },
    { nome: "Mirante do Mangabeiras", tags: ["date", "gratis", "alternativo"], desc: "A vista mais completa da cidade. Ideal para casais." },
    { nome: "Viaduto Santa Tereza", tags: ["amigos", "gratis", "musica", "alternativo"], desc: "Palco da cultura Hip Hop e do Duelo de MCs. Puro suco de BH." },
    { nome: "Parque Municipal", tags: ["familia", "gratis", "musica", "comida"], desc: "Oásis verde no centro com coreto e apresentações gratuitas." },
    { nome: "Rua Sapucaí", tags: ["amigos", "date", "gratis", "bebida", "alternativo"], desc: "A varanda da cidade. Galeria de arte a céu aberto e muitos bares." },
    { nome: "Gastrô Hub", tags: ["familia", "date", "caro", "comida"], desc: "Um restaurante de cozinha variada com um ambiente contemporâneo e acolhedor." } 
];

let fatos = {};

// 2. Captura de cliques (Chips)
document.querySelectorAll('.chip').forEach(button => {
    button.addEventListener('click', function() {
        const categoria = this.parentElement.getAttribute('data-category');
        const valor = this.getAttribute('data-value');
        
        // Ativar/Desativar visualmente
        this.parentElement.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Salvar escolha
        fatos[categoria] = valor;
    });
});

// 3. Motor de Inferência (Múltiplos Resultados)
document.getElementById('btn-inferir').addEventListener('click', () => {
    const display = document.getElementById('resultado');
    const selecoesUsuario = Object.values(fatos);
    const totalCriterios = selecoesUsuario.length;

    if (totalCriterios === 0) {
        alert("Uai, selecione pelo menos uma opção para eu pensar!");
        return;
    }

    // Filtro Estrito: Deve conter TODOS os critérios selecionados
    const locaisCompativeis = locais.filter(local => {
        return selecoesUsuario.every(criterio => local.tags.includes(criterio));
    });

    // Limpeza e Preparação do Display
    display.innerHTML = ""; // Limpa tudo dentro da div de resultados
    display.classList.add('hidden');

    if (locaisCompativeis.length > 0) {
        display.classList.remove('hidden');

        // Renderiza cada local compatível
        locaisCompativeis.forEach(local => {
            const card = document.createElement('div');
            card.style.marginBottom = "30px";
            card.innerHTML = `
                <h2 style="font-size: 2rem; font-weight: 900; text-transform: uppercase; margin-bottom: 10px; border-bottom: 5px solid var(--primary-yellow); display: inline-block;">
                    ${local.nome}
                </h2>
                <p style="font-size: 1.1rem; margin-top: 10px; font-weight: 500;">${local.desc}</p>
            `;
            display.appendChild(card);
        });

        // Adiciona a área de raciocínio ao final
        const raciocinio = document.createElement('div');
        raciocinio.className = "explanation";
        raciocinio.innerHTML = `
            <h4>Raciocínio do Sistema:</h4>
            <ul id="log-explicacao">
                <li><strong>Analisando:</strong> Base de dados com ${locais.length} locais.</li>
                <li><strong>Filtro:</strong> Buscando locais que atendam 100% aos critérios: <i>${selecoesUsuario.join(", ")}</i>.</li>
                <li><strong>Sucesso:</strong> Encontrei ${locaisCompativeis.length} opção(ões) bão demais para o seu rolê!</li>
            </ul>
        `;
        display.appendChild(raciocinio);

    } else {
        alert("Não encontrei nenhum local com TODOS esses filtros. Tente mudar um pouquinho sua escolha!");
        display.classList.add('hidden');
    }
});