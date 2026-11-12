const conectar = require("./db"); 

async function listarVeiculos() {    
    let conexao;    
    try {        
        conexao = await conectar();        
        const sql = `            
            SELECT v.id, v.placa, v.modelo, v.ano, v.cor, c.nome_completo AS nome_cliente
            FROM veiculos v
            JOIN clientes c ON v.cliente_id = c.id
            ORDER BY v.id
        `;        
        const [resultado] = await conexao.execute(sql);        
        if (resultado.length === 0) {            
            console.log("Nenhum veículo cadastrado.");            
            return;        
        }        
        console.table(resultado);    
    } catch (erro) {        
        console.error("Erro ao listar veículos:", erro.message);    
    } finally {        
        if (conexao) {            
            await conexao.end();        
        }    
    } 
} 

listarVeiculos();