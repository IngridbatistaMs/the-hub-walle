const conectar = require("./db");

async function inserirVeiculo(placa, modelo, ano, cor, cliente_id) {
    let conexao;
    try {
        if (!placa || !modelo || !ano || !cor || !cliente_id) {
            throw new Error("Todos os campos são obrigatórios: placa, modelo, ano, cor, cliente_id");
        }
        conexao = await conectar();
        const sql = `
            INSERT INTO veiculos (placa, modelo, ano, cor, cliente_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const valores = [placa, modelo, Number(ano), cor, Number(cliente_id)];
        const [resultado] = await conexao.execute(sql, valores);
        
        console.log("Veículo cadastrado com sucesso!");
        console.log("ID do veículo gerado:", resultado.insertId);
    } catch (erro) {
        console.error("Erro ao inserir veículo:", erro.message);
    } finally {
        if (conexao) {
            await conexao.end();
        }
    }
}

const [placa, modelo, ano, cor, cliente_id] = process.argv.slice(2);
if (!placa || !modelo || !ano || !cor || !cliente_id) {
    console.log('Uso: node inserir.js <placa> "<modelo>" <ano> "<cor>" <cliente_id>');
    process.exitCode = 1;
} else {
    inserirVeiculo(placa, modelo, ano, cor, cliente_id);
}