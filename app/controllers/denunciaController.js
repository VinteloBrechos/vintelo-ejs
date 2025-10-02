const denunciaModel = require('../models/denunciaModel');

const denunciaController = {
    listarDenuncias: async function(req, res) {
        try {
            const denuncias = await denunciaModel.listarDenuncias();
            res.render('pages/denuncias', { 
                denuncias: denuncias,
                usuario: req.session.autenticado
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    criarDenuncia: async function(req, res) {
        try {
            const dadosDenuncia = {
                idUsuario: req.session.autenticado.id,
                tipoAlvo: req.body.tipoAlvo,
                idAlvo: req.body.idAlvo,
                motivo: req.body.motivo,
                descricao: req.body.descricao
            };

            const resultado = await denunciaModel.criarDenuncia(dadosDenuncia);
            
            if (resultado.affectedRows > 0) {
                res.json({ sucesso: true, mensagem: 'Denúncia enviada com sucesso!' });
            } else {
                res.json({ sucesso: false, mensagem: 'Erro ao enviar denúncia' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
        }
    },

    analisarDenuncia: async function(req, res) {
        try {
            const id = req.params.id;
            const resultado = await denunciaModel.atualizarStatus(id, 'analisando');
            
            if (resultado.affectedRows > 0) {
                res.json({ sucesso: true, mensagem: 'Análise iniciada!' });
            } else {
                res.json({ sucesso: false, mensagem: 'Erro ao iniciar análise' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
        }
    },

    resolverDenuncia: async function(req, res) {
        try {
            const id = req.params.id;
            const resolucao = req.body.resolucao;
            const resultado = await denunciaModel.atualizarStatus(id, 'resolvida', resolucao);
            
            if (resultado.affectedRows > 0) {
                res.json({ sucesso: true, mensagem: 'Denúncia resolvida!' });
            } else {
                res.json({ sucesso: false, mensagem: 'Erro ao resolver denúncia' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
        }
    },

    rejeitarDenuncia: async function(req, res) {
        try {
            const id = req.params.id;
            const resultado = await denunciaModel.excluirDenuncia(id);
            
            if (resultado.affectedRows > 0) {
                res.json({ sucesso: true, mensagem: 'Denúncia rejeitada!' });
            } else {
                res.json({ sucesso: false, mensagem: 'Erro ao rejeitar denúncia' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor' });
        }
    },

    analisarDenunciaDetalhada: async function(req, res) {
        try {
            const id = req.params.id;
            const denuncias = await denunciaModel.listarDenuncias();
            const denuncia = denuncias.find(d => d.ID_DENUNCIA == id);
            
            if (!denuncia) {
                return res.status(404).send('Denúncia não encontrada');
            }
            
            res.render('pages/analisar-denuncia', { 
                denuncia: denuncia,
                usuario: req.session.autenticado
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno do servidor');
        }
    }
};

module.exports = denunciaController;