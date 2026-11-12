const conectar = require("./db"); 

async function excluirVeiculo(id) {    
    let conexao;    
    try {        
        if (!Number.isInteger(id) || id <= 0) {            
            throw new Error("Informe um ID válido.");        
        }        
        conexao = await conectar();        
        const sql = `DELETE FROM veiculos WHERE id = ?`;        
        const [resultado] = await conexao.execute(sql, [id]);        
        
        if (resultado.affectedRows === 0) {            
            console.log("Veículo não encontrado.");        
        } else {            
            console.log("Veículo excluído com sucesso!");        
        }    
    } catch (erro) {        
        console.error("Erro ao excluir veículo:", erro.message);        
        if (erro.code === "ER_ROW_IS_REFERENCED_2" || erro.code === "ER_ROW_IS_REFERENCED") {            
            console.error("Existem ordens de serviço relacionadas a este veículo. Exclusão bloqueada.");        
        }    
    } finally {        
        if (conexao) {            
            await conexao.end();        
        }    
    } 
} 

const [idArg] = process.argv.slice(2); 
if (!idArg) {    
    console.log("Uso: node excluir.js <id>");    
    process.exitCode = 1; 
} else {    
    excluirVeiculo(Number(idArg)); 
}