# Escola de Natação (React + Vite)

    npm install
    npm run dev      # desenvolvimento
    npm run build    # gera a pasta dist/

## API
Em `src/api/config.js` troque `MOCK=true` por `false` e ajuste `BASE` para o endereço da sua API.
Com `MOCK=true` o app usa dados simulados (`src/api/mock.js`).

## Estrutura de `src/`

    api/          config.js (MOCK, BASE, ORG) · session.js (tokens) · client.js (requisições e renovação de token) · mock.js (API simulada)
    context/      AuthContext.jsx: usuário logado, permissões, login e logout
    components/   peças reutilizáveis: Form/Field, Page, Load, Nav, Layout, Protected, DayBar, AulaItem, Tag, Avatar...
    hooks/        useLoad.js: carrega dados de uma tela (carregando / erro / tentar de novo)
    pages/
      auth/       Entrada, Cadastro, Login, EsqueciSenha, Perfil, AlterarSenha        (E1 a E6)
      student/    Inicio, EscolherServico ... PerfilProfessor                         (C1 a C11)
      admin/      AgendaDoDia, AConfirmar, DadosNegocio, Professores, Serviços...     (A1 a A10)
    state/        booking.js: escolhas do agendamento em andamento
    utils/        date.js · format.js · feedback.js (toast e erros) · pagination.js
    routes.jsx    todas as rotas · App.jsx · main.jsx · styles/global.css

## Formatação
`npm run format` aplica o Prettier em todo o `src/`.
