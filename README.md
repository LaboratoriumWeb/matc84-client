# Instalação

**Clone o repositório:**

```bash
git clone https://github.com/LaboratoriumWeb/matc84-client.git
```

**Baixe as dependências do projeto:**

```bash
yarn
```

**execute o projeto:**

```bash
yarn dev
```

# ⚠️ ATENÇÃO: LEIA AS ORIENTAÇÕES A BAIXO

# Padronização das branch's

⚠️ **Atenção:** As branch's devem ser criadas sempre a partir da **main**

Um branch git deve começar com uma categoria. Escolha uma destas: `feature`, `bugfix`, `hotfix`, ou `test`.

Após a categoria, deve haver um " `/`" seguido pela referência do problema ou nova implementação no qual você está trabalhando. Se não houver referência, basta adicionar `no-ref`. Esta descrição deve ser curta e "kebab-case".

### Siga esse padrão:

```bash
git checkout -b <category/description-in-kebab-case>
```

### Exemplo:

```bash
git checkout -b feature/criar-tela-de-login
```

⚠️ Lembre-se de atualizar sua branch com a `main` antes de enviar um commit para o repositório.

### Como atualizar a branch:

```bash
git rebase main
```

# Padronização de commit

Uma mensagem de commit deve começar com uma categoria de mudança. Você pode usar as 4 categorias a seguir para tudo: `feat`, `fix`, `refactor`, e `chore`.

- `feat`é para adicionar um novo recurso
- `fix`é para consertar um bug
- `refactor`é para alterar o código para fins de desempenho ou conveniência (por exemplo, legibilidade)
- `chore`serve para todo o resto (escrever documentação, formatar, adicionar testes, limpar código inútil etc.)

Após a categoria, deve haver um " `:`" anunciando a descrição do commit.

Após os dois pontos, a descrição do commit deve consistir em declarações curtas descrevendo as mudanças.

Cada declaração deve começar com um verbo conjugado de forma imperativa. As declarações devem ser separadas de si mesmas com um " `;`".

### Siga esse padrão:

```
git commit -m '<category: do something; do some other things>'

```

### Exemplo:

```
git commit -m 'feat: add novo componente de botão'
```

```
git commit -m 'fix: add uma diretiva no componente de botão'
```

### Você pode ler mais detalhes nesses artigos/documentações

[A Simplified Convention for Naming Branches and Commits in Git](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4)
[Submission Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

## Figma

[Figma](<https://www.figma.com/design/EFm41gOmhyO82NZXVfibUy/Registration-flow-(Community)?node-id=9-427&node-type=frame&t=k06ZWhHUoDIIU1Gm-0>)

## Bibliotecas utilizadas nesse projeto:

- Material UI
- Tailwind
- NextJS
- Axios
- Redux Toolkit
