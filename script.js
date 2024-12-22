// Armazenar produtos e vendas
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

// Referências aos elementos
const formProduto = document.getElementById('form-produto');
const tabelaEstoque = document.getElementById('tabela-estoque');
const tabelaRelatorio = document.getElementById('tabela-relatorio');

// Adicionar produto
formProduto.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const precoVista = parseFloat(document.getElementById('preco-vista').value);
    const precoCredito = parseFloat(document.getElementById('preco-credito').value);
    const precoDebito = parseFloat(document.getElementById('preco-debito').value);
    const precoPix = parseFloat(document.getElementById('preco-pix').value);

    produtos.push({ nome, quantidade, precoVista, precoCredito, precoDebito, precoPix });
    salvarDados();
    atualizarTabelaEstoque();
    formProduto.reset();
});

// Atualizar tabela de estoque
function atualizarTabelaEstoque() {
    tabelaEstoque.innerHTML = '';
    produtos.forEach((produto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.precoVista.toFixed(2)}</td>
            <td>R$ ${produto.precoCredito.toFixed(2)}</td>
            <td>R$ ${produto.precoDebito.toFixed(2)}</td>
            <td>R$ ${produto.precoPix.toFixed(2)}</td>
            <td><button onclick="venderProduto(${index})">Vender</button></td>
        `;
        tabelaEstoque.appendChild(row);
    });
}

// Registrar venda
function venderProduto(index) {
    const quantidadeVendida = prompt('Digite a quantidade a ser vendida:');
    if (!quantidadeVendida || isNaN(quantidadeVendida) || quantidadeVendida <= 0) {
        alert('Quantidade inválida!');
        return;
    }

    const quantidade = parseInt(quantidadeVendida);
    const produto = produtos[index];

    if (quantidade > produto.quantidade) {
        alert('Estoque insuficiente!');
        return;
    }

    const valorDigitado = prompt(`Digite o valor total da venda para ${quantidade} unidades:`);
    if (!valorDigitado || isNaN(valorDigitado) || parseFloat(valorDigitado) <= 0) {
        alert('Valor inválido!');
        return;
    }

    const totalVendido = parseFloat(valorDigitado);
    produto.quantidade -= quantidade;
    const dataVenda = new Date().toLocaleDateString();

    vendas.push({ dataVenda, produto: produto.nome, quantidade, totalVendido });
    salvarDados();
    atualizarTabelaEstoque();
    atualizarTabelaRelatorio();
}

// Atualizar tabela de relatório
function atualizarTabelaRelatorio() {
    tabelaRelatorio.innerHTML = '';
    vendas.forEach((venda) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${venda.dataVenda}</td>
            <td>${venda.produto}</td>
            <td>${venda.quantidade}</td>
            <td>R$ ${venda.totalVendido.toFixed(2)}</td>
        `;
        tabelaRelatorio.appendChild(row);
    });
}

// Salvar dados no localStorage
function salvarDados() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
    localStorage.setItem('vendas', JSON.stringify(vendas));
}

// Carregar tabelas ao iniciar
atualizarTabelaEstoque();
atualizarTabelaRelatorio();