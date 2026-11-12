const conectar = require("./db");

async function buscarVeiculo(id) {
    let conexao;
    try {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Informe um ID válido.");
        }
        conexao = await conectar();
        const sql = `
            SELECT v.id, v.placa, v.modelo, v.ano, v.cor, c.nome_completo AS nome_cliente 
            FROM veiculos v
            JOIN clientes c ON v.cliente_id = c.id
            WHERE v.id = ?
        `;
        const [resultado] = await conexao.execute(sql, [id]);
        
        if (resultado.length === 0) {
            console.log("Veículo não encontrado.");
        } else {
            console.log("Resultado da busca:");
            console.table(resultado);
        }
    } catch (erro) {
        console.error("Erro ao buscar veículo:", erro.message);
    } finally {
        if (conexao) {
            await conexao.end();
        }
    }
}

const [idArg] = process.argv.slice(2);
if (!idArg) {
    console.log("Uso: node buscar.js <id>");
    process.exitCode = 1;
} else {
    buscarVeiculo(Number(idArg));
}