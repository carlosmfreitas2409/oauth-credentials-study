<h1 align="center">🔒 Authentication</h1>
<p align="center">Projeto para aprender autenticação com OAuth integrado</p>

<p align="center">
  <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rotas">Rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-instalação-e-uso">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img
    alt="Github Top Language"
    src="https://img.shields.io/github/languages/top/carlosmfreitas2409/oauth-credentials-study?message=TOPLanguage&color=5965E0"
  >
  <img
    alt="Github Language Count"
    src="https://img.shields.io/github/languages/count/carlosmfreitas2409/oauth-credentials-study?message=Languages&color=5965E0"
  >

  <a href="https://github.com/carlosmfreitas2409/oauth-credentials-study/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/carlosmfreitas2409/oauth-credentials-study?message=Commit&color=5965E0">
  </a>
  <img
    alt="Project License"
    src="https://img.shields.io/github/license/carlosmfreitas2409/oauth-credentials-study?message=MIT&color=5965E0"
  >
</p>

----

## 💡 Sobre

Este projeto foi <b>realizado para estudos</b> de autenticação OAuth e credenciais em um mesmo sistema. Após um estudo bastante aprofundado de técnicas, estratégias e métodos, este foi o resultado que encontrei.

**OBS:** Esta será a técnica que iremos utilizar no projeto "XoneCode" do <a href="https://github.com/Space-Coders-Hackaton">Space Coders</a>.

## 🛠️ Tecnologias

Esse projeto foi desenvolvido usando as seguintes tecnologias:

### Back-end
- [Express](https://expressjs.com)
- [Typescript](https://typescriptlang.org/)
- [SQLite](https://www.sqlite.org)
- [TypeORM](hhttps://typeorm.io/#/)
- [Axios](https://github.com/axios/axios)
- [class-transformer](https://github.com/typestack/class-transformer)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [UUID](https://github.com/uuidjs/uuid)

### Front-end
- [React](https://reactjs.org)
- [NextJS](https://nextjs.org)
- [Typescript](https://typescriptlang.org/)
- [Axios](https://github.com/axios/axios)
- [Nookies](https://github.com/maticzav/nookies)
- [React Hot Toast](https://react-hot-toast.com)

## 🍃 Rotas do Backend

### Usuários
Resource URI          | Método HTTP | Finalidade
--------------------- | ----------- | -------
/users                | POST        | Cadastro de usuário com credencial
/profile/me           | GET         | Detalhes do usuário autenticado


### Autenticação
Resource URI          | Método HTTP | Finalidade
--------------------- | ----------- | -------
/sessions             | POST        | Autenticação de usuário com credencial
/oauth/github/:code   | POST        | Cadastro/obtenção de usuário com Github

## :information_source: Instalação e uso

Para clonar e executar esta aplicação, você precisará do [Git](https://git-scm.com/) e [Yarn](https://yarnpkg.com/). A partir de sua linha de comando:

```bash
# Clone este repositório
$ git clone https://github.com/carlosmfreitas2409/oauth-credentials-study

# Entre no repositório
$ cd oauth-credentials-study/client
$ cd oauth-credentials-study/server

# Instale as dependências
$ yarn

# Preencha as variáveis ambientes em .env

# Rode a aplicação
$ yarn dev

# O cliente estará ativo em http://localhost:3000
# A API estará ativa em http://localhost:3333
```

## ⚙️ Como contribuir

- Faça um fork desse repositório;
- Crie uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`;

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/carlosmfreitas2409/oauth-credentials-study/blob/master/LICENSE) para mais detalhes.

---

Feito com 💜 por Carlos Eduardo 👋 [Confira meu LinkedIn](https://www.linkedin.com/in/carlosmeduardo/)