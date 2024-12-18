### Requisitos Funcionais
- [X] Deve ser possível cadastrar um usuário
- [X] Deve ser possível realizar login como usuário
- [x] Deve ser possível cadastrar novas localizações das frutas
- [x] Deve ser possível listar todas as frutas disponíveis 
- [x] Deve ser possível listar informações de uma fruta específica

### Requisitos não funcionais
- [X] Para cadastrar um usuário são necessárias as seguintes informações: nome do responsável, e-mail, cidade, estado, senha e número de contato.
  - A senha deverá ser armazenada com criptografia. 
- [x] Para autenticação é necessário que o usuário tenha um cadastro, necessitando das seguintes informações: e-mail e senha. Será gerado um token JWT.
- [x] Para cadastrar uma nova localização das frutas são necessárias as seguintes informações: nome da fruta, descrição, ID do usuário e localização.
  - A descrição deverá ter no máximo 300 caracteres.
  - O nome da fruta será do tipo ENUM com valores pré-definidos.
  - A localização terá os seguintes campos: logradouro, número, CEP, cidade e estado.
  - Deverá ser cadastrado o tempo em que a fruta ficará disponível no sistema. 
- [x] O retorno da listagem das frutas será com um array contendo objetos, onde terá o ID da fruta, nome, descrição e localização. Poderão haver filtros com query params.
  - Os filtros da consulta serão: cidade, estado e nome da fruta.
- [x] A solicitação de informações de uma fruta ocorrerá mediante retorno de um objeto contendo ID da fruta, nome da fruta, descrição e localização. Haverá também os dados do usuário: nome do responsável e número de contato.
  - O usuário, quando quiser solicitar a fruta, deverá entrar em contado com o usuário via WhatsApp

### Regras de negocio 
- [x] Todos os filtros são opcionais
- [x] Uma fruta deve está ligado a um usuário
- [x] Não é permitido ter e-mails duplicados no sistema para diferentes usuários