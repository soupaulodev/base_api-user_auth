# IO Finance

### Instruções para Executar o Projeto

##### Objetivo:

Este guia visa auxiliar na execução do projeto, fornecendo instruções passo a passo para iniciar e utilizar o sistema.

### Pré-requisitos:

- Docker instalado e configurado em sua máquina local.
- Uma ferramenta de linha de comando (como bash ou PowerShell).
- Editor de código de sua preferência (opcional, mas recomendado o Visual Studio Code).

### Etapas:

##### 1. Clonando o Repositório:

Clone este repositório em sua máquina local utilizando o seguinte comando:

```
git clone https://github.com/soupaulodev/io-finance.git
```

##### 2. Inicializando o Banco de Dados:

Acesse o diretório do projeto clonado:

```
cd io-finance
```

Inicie os containers do PostgreSQL e Dragonfly (se necessário) usando o comando `docker-compose up -d`. Isso irá criar e inicializar os bancos de dados necessários para o projeto.

##### 3. Configurando Variáveis de Ambiente:

Crie um arquivo `.env` na raiz do projeto. Este arquivo conterá as variáveis de ambiente necessárias para a execução da aplicação. Utilize as seguintes variáveis como base:

```
DATABASE_URL="postgresql://docker:docker@localhost:5432/iofinance?schema=public"
JWT_SECRET="YOUR_JWT_SECRET_KEY"
PORT=3333
COOKIE_SECRET="COOKIE_SECRET"
NODE_ENV="development"
```

Substitua `YOUR_JWT_SECRET_KEY` e `COOKIE_SECRET` por chaves secretas fortes e únicas.

##### 4. Executando a Aplicação:

Na raiz do projeto, execute o seguinte comando para iniciar a aplicação:

```
npm run dev
```

Isso iniciará o processo de desenvolvimento da aplicação, compilando o código e executando-o em modo de desenvolvimento. A aplicação estará acessível na porta **_3333_**.

##### 5. Testando a Aplicação:

- Utilize ferramentas como Postman ou navegadores web para realizar requisições à API da aplicação.
- Consulte a documentação da API em [IO Finance - API Documentation](http://127.0.0.1:3333/api/docs/) para obter mais informações sobre endpoints e formatos de dados. Note que sua aplicação deve estar executando para que a página possa ser acessada.

##### Observações:

- Este guia assume que você já possui familiaridade com ferramentas básicas de desenvolvimento e linha de comando.
- Para obter mais informações sobre as tecnologias utilizadas neste projeto, consulte a documentação oficial de cada ferramenta.
- Em caso de dúvidas ou problemas, consulte a comunidade de desenvolvedores ou busque por tutoriais específicos sobre as ferramentas utilizadas.

###### Lembre-se:

- Este guia é um ponto de partida.
- O projeto pode ter funcionalidades e configurações adicionais que não foram detalhadas aqui.
- Explore o código-fonte, a documentação da API e outros recursos disponíveis para entender completamente o funcionamento do projeto.
- Utilize as melhores práticas de desenvolvimento e segurança ao trabalhar com este projeto.

##### Atenção:

- Este software é fornecido "como está", sem nenhuma garantia expressa ou implícita.

##### Contribuindo:

- Se você tiver dúvidas, sugestões ou melhorias para este guia, sinta-se à vontade para contribuir.
- Abra um issue no GitHub ou envie um pull request com suas alterações.

##### Agradecimentos:

- Agradeço à comunidade de desenvolvedores de software por suas ferramentas e recursos valiosos.
- Agradeço a você por usar este projeto e esperamos que ele seja útil para seus objetivos.
