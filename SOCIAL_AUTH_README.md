# Configuração de Autenticação Social - Vintélo

## Funcionalidades Adicionadas

- Login com Google
- Login com Instagram
- Integração nas páginas: cadastro, login e entrar

## Configuração

### 1. Banco de Dados
Execute o script SQL para adicionar as colunas necessárias:
```sql
-- Execute o arquivo social_auth_migration.sql no seu banco de dados
```

### 2. Variáveis de Ambiente
Configure as seguintes variáveis no arquivo `.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Instagram OAuth
INSTAGRAM_CLIENT_ID=your_instagram_client_id_here
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret_here
```

### 3. Configuração do Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+
4. Vá para "Credenciais" > "Criar credenciais" > "ID do cliente OAuth"
5. Configure as URLs de redirecionamento:
   - `http://localhost:3000/auth/google/callback` (desenvolvimento)
   - `https://seudominio.com/auth/google/callback` (produção)

### 4. Configuração do Instagram OAuth

1. Acesse o [Facebook for Developers](https://developers.facebook.com/)
2. Crie um novo app
3. Adicione o produto "Instagram Basic Display"
4. Configure as URLs de redirecionamento:
   - `http://localhost:3000/auth/instagram/callback` (desenvolvimento)
   - `https://seudominio.com/auth/instagram/callback` (produção)

## Como Funciona

### Fluxo de Autenticação

1. **Usuário clica no botão de rede social**
2. **Redirecionamento para o provedor** (Google/Instagram)
3. **Usuário autoriza a aplicação**
4. **Callback recebe os dados do usuário**
5. **Sistema verifica se usuário já existe**
6. **Se não existe, cria novo usuário**
7. **Login automático e redirecionamento**

### Páginas Atualizadas

- **cadastro.ejs**: Botões conectados às rotas de autenticação
- **login.ejs**: Botões conectados às rotas de autenticação  
- **entrar.ejs**: Botões conectados às rotas de autenticação

### Rotas Adicionadas

- `GET /auth/google` - Inicia autenticação Google
- `GET /auth/google/callback` - Callback do Google
- `GET /auth/instagram` - Inicia autenticação Instagram
- `GET /auth/instagram/callback` - Callback do Instagram

## Arquivos Modificados

- `app.js` - Configuração do Passport
- `app/config/passport.js` - Estratégias de autenticação (NOVO)
- `app/models/usuarioModel.js` - Métodos para IDs sociais
- `app/routes/router.js` - Rotas de autenticação social
- `app/views/pages/cadastro.ejs` - Links dos botões
- `app/views/pages/login.ejs` - Links dos botões
- `app/views/pages/entrar.ejs` - Links dos botões

## Dependências Instaladas

- `passport` - Framework de autenticação
- `passport-google-oauth20` - Estratégia Google OAuth 2.0
- `passport-instagram` - Estratégia Instagram

## Observações

- O Facebook não está implementado pois requer configuração mais complexa
- Os usuários de login social não precisam de senha
- O sistema cria automaticamente usuários do tipo "cliente"
- Após login social, usuários são redirecionados conforme seu tipo