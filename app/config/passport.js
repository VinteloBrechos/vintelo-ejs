const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const usuario = require('../models/usuarioModel');
const tipoUsuario = require('../models/tipoUsuarioModel');

passport.serializeUser((user, done) => {
    done(null, user.ID_USUARIO);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usuario.findId(id);
        done(null, user[0]);
    } catch (error) {
        done(error, null);
    }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Verificar se usuário já existe
        const existingUser = await usuario.findCampoCustom('email_usuario', profile.emails[0].value);
        
        if (existingUser > 0) {
            const user = await usuario.findUserEmail({ user_usuario: profile.emails[0].value });
            return done(null, user[0]);
        }

        // Criar novo usuário
        const tipoCliente = await tipoUsuario.findByTipo('cliente');
        const newUser = {
            NOME_USUARIO: profile.displayName,
            USER_USUARIO: profile.emails[0].value,
            EMAIL_USUARIO: profile.emails[0].value,
            SENHA_USUARIO: null, // Usuário social não precisa de senha
            TIPO_USUARIO: tipoCliente.length > 0 ? tipoCliente[0].ID_TIPO_USUARIO : 2,
            STATUS_USUARIO: 1,
            GOOGLE_ID: profile.id
        };

        const result = await usuario.create(newUser);
        if (result && result.insertId) {
            const createdUser = await usuario.findId(result.insertId);
            return done(null, createdUser[0]);
        }
    } catch (error) {
        return done(error, null);
    }
}));

// Instagram Strategy
passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: "/auth/instagram/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Verificar se usuário já existe pelo Instagram ID
        const existingUser = await usuario.findCampoCustom('instagram_id', profile.id);
        
        if (existingUser > 0) {
            const user = await usuario.findUserByInstagramId(profile.id);
            return done(null, user[0]);
        }

        // Criar novo usuário
        const tipoCliente = await tipoUsuario.findByTipo('cliente');
        const newUser = {
            NOME_USUARIO: profile.displayName || profile.username,
            USER_USUARIO: profile.username,
            EMAIL_USUARIO: null, // Instagram pode não fornecer email
            SENHA_USUARIO: null,
            TIPO_USUARIO: tipoCliente.length > 0 ? tipoCliente[0].ID_TIPO_USUARIO : 2,
            STATUS_USUARIO: 1,
            INSTAGRAM_ID: profile.id
        };

        const result = await usuario.create(newUser);
        if (result && result.insertId) {
            const createdUser = await usuario.findId(result.insertId);
            return done(null, createdUser[0]);
        }
    } catch (error) {
        return done(error, null);
    }
}));

module.exports = passport;