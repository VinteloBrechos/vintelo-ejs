const perfilModel = require("../models/perfilModel");
const { body, validationResult } = require("express-validator");

const perfilController = {

  regrasValidacaoPerfil: [
    body("descricao")
      .isLength({ min: 3, max: 255 })
      .withMessage("Descrição deve ter entre 3 e 255 caracteres"),
    body("site")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("Site deve ser uma URL válida"),
    // Adicione outras validações para os campos que seu perfil tem
  ],

  listarPerfis: async (req, res) => {
    try {
      const perfis = await perfilModel.findAll();
      res.render("pages/listarPerfis", { perfis, listaErros: null, dadosNotificacao: null });
    } catch (error) {
      console.error(error);
      res.render("pages/listarPerfis", { perfis: [], listaErros: null, dadosNotificacao: { titulo: "Erro", mensagem: "Erro ao carregar perfis.", tipo: "error" } });
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
        return res.render("pages/perfil", { valores: {}, listaErros: null, dadosNotificacao: null });
      }

      const perfil = perfis[0];

      res.render("pages/perfil", { valores: perfil, listaErros: null, dadosNotificacao: null });
    } catch (error) {
      console.error(error);
      res.render("pages/perfil", { valores: {}, listaErros: null, dadosNotificacao: { titulo: "Erro", mensagem: "Erro ao carregar perfil.", tipo: "error" } });
    }
  },

  gravarPerfil: async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.render("pages/perfil", { valores: req.body, listaErros: erros, dadosNotificacao: null });
    }

    try {
      const idUsuario = req.session?.autenticado?.id;
      if (!idUsuario) {
        return res.redirect("/login");
      }

      // Monta os dados que quer salvar/atualizar no perfil
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
