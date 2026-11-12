const conectar = require("./db"); 

async function atualizarVeiculo(id, placa, modelo, ano, cor, cliente_id) {    
    let conexao;    
    try {        
        if (!Number.isInteger(id) || id <= 0) {            
            throw new Error("Informe um ID válido.");        
        }        
        if (!placa || !modelo || !ano || !cor || !cliente_id) {            
            throw new Error("Todos os campos são obrigatórios.");        
        }        
        conexao = await conectar();        
        const sql = `            
            UPDATE veiculos            
            SET placa = ?, modelo = ?, ano = ?, cor = ?, cliente_id = ?            
            WHERE id = ?        
        `;        
        const valores = [placa, modelo, Number(ano), cor, Number(cliente_id), id];        
        const [resultado] = await conexao.execute(sql, valores);        
        
        if (resultado.affectedRows === 0) {            
            console.log("Veículo não encontrado para atualização.");        
        } else {            
            console.log("Veículo atualizado com sucesso!");        
        }    
    } catch (erro) {        
        console.error("Erro ao atualizar veículo:", erro.message);    
    } finally {        
        if (conexao) {            
            await conexao.end();        
        }    
    } 
} 

const [idArg, placa, modelo, ano, cor, cliente_id] = process.argv.slice(2); 
if (!idArg || !placa || !modelo || !ano || !cor || !cliente_id) {    
    console.log('Uso: node atualizar.js <id> <placa> "<modelo>" <ano> "<cor>" <cliente_id>');    
    process.exitCode = 1; 
} else {    
    atualizarVeiculo(Number(idArg), placa, modelo, ano, cor, cliente_id); 
}