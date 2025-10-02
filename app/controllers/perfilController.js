const perfilModel = require("../models/perfilModel");
const { body, validationResult } = require("express-validator");

const perfilController = {

  regrasValidacaoPerfil: [
   cadastrar: async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.render("pages/cadastro", {
        listaErros: erros,
        dadosNotificacao: null,
        valores: req.body,
      });
    }

    try {
     
      const dadosForm = {
        NOME_USUARIO: req.body.nome_usu,
        USER_USUARIO: req.body.nomeusu_usu,
        EMAIL_USUARIO: req.body.email_usu,
        SENHA_USUARIO: req.body.senha_usu, 
        CELULAR_USUARIO: req.body.fone_usu || null,
        CEP_USUARIO: req.body.cep ? req.body.cep.replace("-", "") : null,
        ENDERECO_USUARIO: req.body.endereco || null,
        NUMERO_USUARIO: req.body.numero || null,
        BAIRRO_USUARIO: req.body.bairro || null,
        CIDADE_USUARIO: req.body.cidade || null,
        UF_USUARIO: req.body.uf || null,
      };
    ],

  listarPerfis: async (req, res) => {
    try {
      const perfis = await perfilModel.findAll();
      res.render("pages/perfilcliente", { perfis, listaErros: null, dadosNotificacao: null });
    } catch (error) {
      console.error(error);
      res.render("pages/cadastro", { perfis: [], listaErros: null, dadosNotificacao: { titulo: "Erro", mensagem: "Erro ao carregar perfis.", tipo: "error" } });
    }
  },

  mostrarPerfilPorUsuario: async (req, res) => {
    try {
      const idUsuario = req.session?.autenticado?.id;
      if (!idUsuario) {
        return res.redirect("/login");
      }

      const perfis = await perfilModel.findByUserId(idUsuario);

      if (perfis.length === 0) {
        return res.render("pages/perfilcliente", { valores: {}, listaErros: null, dadosNotificacao: null });
      }

      const perfil = perfis[0];

      res.render("pages/perfilcliente", { valores: perfil, listaErros: null, dadosNotificacao: null });
    } catch (error) {
      console.error(error);
      res.render("pages/cadastro", { valores: {}, listaErros: null, dadosNotificacao: { titulo: "Erro", mensagem: "Erro ao carregar perfil.", tipo: "error" } });
    }
  },

  gravarPerfil: async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.render("pages/perfilcliente", { valores: req.body, listaErros: erros, dadosNotificacao: null });
    }

    try {
      const idUsuario = req.session?.autenticado?.id;
      if (!idUsuario) {
        return res.redirect("/login");
      }

      const dadosForm = {
        DESCRICAO: req.body.descricao,
        SITE: req.body.site || null,
        // outros campos do perfil que você tenha...
        ID_USUARIO: idUsuario
      };

      // Verifica se já existe um perfil para esse usuário para decidir criar ou atualizar
      const perfilExistente = await perfilModel.findByUserId(idUsuario);

      if (perfilExistente.length > 0) {
        // Atualiza perfil existente
        await perfilModel.updateByUserId(dadosForm, idUsuario);
        res.render("pages/perfil", { valores: dadosForm, listaErros: null, dadosNotificacao: { titulo: "Sucesso", mensagem: "Perfil atualizado com sucesso.", tipo: "success" } });
      } else {
        // Cria novo perfil
        await perfilModel.create(dadosForm);
        res.render("pages/perfil", { valores: dadosForm, listaErros: null, dadosNotificacao: { titulo: "Sucesso", mensagem: "Perfil criado com sucesso.", tipo: "success" } });
      }
    } catch (error) {
      console.error(error);
      res.render("pages/perfil", { valores: req.body, listaErros: null, dadosNotificacao: { titulo: "Erro", mensagem: "Erro ao salvar perfil.", tipo: "error" } });
    }
  },

  deletarPerfil: async (req, res) => {
    try {
      const idPerfil = req.params.id;
      await perfilModel.delete(idPerfil);
      res.redirect("/perfis?msg=Perfil deletado com sucesso");
    } catch (error) {
      console.error(error);
      res.redirect("/perfis?msg=Erro ao deletar perfil");
    }
  }
};

module.exports = perfilController;
