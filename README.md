# **FreelaCRM**
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>

**FreelaCRM** é uma solução eficiente para otimizar a gestão de profissionais freelancers, garantindo maior controle sobre projetos, clientes e faturamento.

💡 **Por que usar o FreelaCRM?**

Freelancers enfrentam desafios ao gerenciar múltiplos projetos, acompanhar prazos, organizar informações de clientes e calcular ganhos. O FreelaCRM resolve esse problema ao oferecer um sistema intuitivo que:

✅ Centraliza informações essenciais – Gerencia dados pessoais do freelancer e organiza detalhes dos projetos.

✅ Facilita a gestão de clientes – Armazena contatos, preços, prazos e status de cada serviço.

✅ Acompanha o progresso dos projetos – Permite visualizar tarefas concluídas, pendentes e pagamentos a receber.

✅ Fornece dashboards inteligentes – Consolida todas as informações em uma interface clara e acessível.

Seja mais produtivo e tenha total controle sobre seu trabalho com o FreelaCRM!
---

## Índice

- [Introdução](#introdução)
- [Funcionalidades principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Documentação](#documentação)
- [Instalação](#instalação)
- [Executando a Aplicação](#executando-a-aplicação)
- [Contato](#contato)

---

## Introdução

Empresas e prestadores de serviço muitas vezes enfrentam dificuldades para gerenciar projetos, acompanhar horas trabalhadas, calcular faturamento e manter um bom relacionamento com clientes. Isso pode resultar em atrasos nos pagamentos, falta de transparência nos serviços prestados e dificuldades na organização dos projetos.
**FreelaCRM** foi projetado para mitigar esses problemas, fornecendo uma plataforma que organiza o trabalho dos freelancer, promovendo redução do tempo gasto em gestão de projetos.

---

### **Funcionalidades Principais**

- **Registro de Usuário**: Cadastro de novos usuários.
- **Login de Usuário**: Autenticação segura para acesso às funcionalidades, tambem sendo possível realizar o login via SSO (SingleSignOn)
- **Gerenciamento de Clientes**: CRUD para gerir clientes, incluindo informações pessoais e status.
- **Gerenciamento de Projetos**: CRUD para gerir projetos, incluindo informações de preço, prazo e status.
- **Controle de tempo**: Registro e controle do tempo investido por projeto.
- **Dashboard inteligente**: Informações de faturamento, status, quantidade de projetos, prazo e esforço.

## Tecnologias Utilizadas

### **Frontend**

- **React**: Biblioteca JavaScript para construção de interfaces de usuário reutilizáveis e interativas.
- **TypeScript**: Superset do JavaScript que oferece segurança de tipos e recursos avançados do ECMAScript.
- **TailwindCSS**: Framework CSS focado em utilidades, fornecendo classes pré-definidas para estilização ágil.

### **Backend**

- **Node**: Permite a construção de aplicações escaláveis e de alto desempenho, especialmente no backend, utilizando JavaScript no lado do servidor.
- **TypeScript**: Superset do JavaScript que oferece segurança de tipos e recursos avançados do ECMAScript.
- **Express**: framework para Node.js que simplifica a criação de APIs e aplicações web, oferecendo uma estrutura leve e eficiente para o gerenciamento de rotas, middleware e requisições HTTP.
- **Prisma**: ORM para Node.js e TypeScript que simplifica a interação com bancos de dados PostgreeSQL, proporcionando consultas eficientes e segurança.
- **Autenticação**: Baseeada em token JWT.
---
## Documentação

A documentação completa da API é gerada com Swagger, utilizando o **DRF Spectacular**. Inclui detalhes de endpoints, exemplos de uso e respostas esperadas.

**Acesse a documentação aqui**:

---

## Instalação 

### **Pré-requisitos**
Certifique-se de que você tenha instalado:
- `node`, `npm` e '.env'
- Banco de dados PostgreSQL configurado

### **Passos**

1. **Clone o repositório**:
   ```bash
   git clone [https://github.com/ProgramadoresSemPatria/Team04---Code-Builders.git]
    ```

2. **Navegue para o repositório:**:

   ```bash
   cd Team04---Code-Builders
   ```

3. **Instale as dependências:**:

   - For Frontend:
   
     ```bash
     cd Frontend
     npm install
     ```

   - For Backend:

     ```bash
     cd Backend
     npm install
     ```
   

## Executando a Aplicação

- **Para executar o Frontend**:
1. Navegue até o diretório do Frontend
  ```bash
  cd Frontend
  ```
2. Inicie o servidor React
   ```bash
   npm run dev
   ```
3. Acesse o frontend no navegador em: http://localhost:5173

- **Para executar o Backend**:
1. Inicie o servidor 
  ```bash
  npm run-dev
  ```
2. Acesse o backend no navegador em: http://localhost:5050
  
## Contato
- Developers: 
Ricardo Franco dos Santos: https://github.com/RicardoFrancodosSantos
Breno Silva: https://github.com/brenosilldev
Guilherme Resende: https://github.com/guilhermelr291
Vinicius Padilha: https://github.com/vinipadilha
