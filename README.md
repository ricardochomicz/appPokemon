# Pokémon App

Este é um aplicativo simples de listagem de Pokémon desenvolvido usando Ionic com Angular, que consome a API RESTful do [PokeAPI](https://pokeapi.co/).

## Visão Geral

O aplicativo permite visualizar uma lista de Pokémon, visualizar detalhes de cada Pokémon, favoritar Pokémon, pesquisar por Pokémon e ordenar por nome. A aplicação utiliza sessionStorage para armazenar os Pokémon favoritos.

## Funcionalidades

- Listagem de Pokémon com paginação
- Visualização dos detalhes de cada Pokémon
- Marcar Pokémon como favorito
- Buscar Pokémon por nome
- Ordenar por nome
- Interface responsiva e adaptável a mudanças de orientação
- Dark Mode
- Rating

## Estrutura do Projeto

- `src/`
  - `app/`
    - `services/` - Contém os serviços utilizados para acessar a API e gerenciar favoritos
      - `pokemon.service.ts` - Serviço para consumir a PokeAPI
      - `favorite.service.ts` - Serviço para gerenciar Pokémon favoritos no sessionStorage
      - `toast.service.ts` - Serviço para exibir mensagens toast
    - `pages/`
      - `pokemon-list/` - Página para listar Pokémon
      - `pokemon-detail/` - Página para exibir detalhes do Pokémon
      - `pokemon-favorites/` - Página para exibir Pokémon favoritos
  - `assets/` - Contém os arquivos estáticos do projeto
  - `environments/` - Contém os arquivos de configuração de ambiente
- `webhook/`
  - `server.js` - Salva em um arquivo JSON os dados do Pokémon favoritado e uid do usuário autenticado

## Configuração do Ambiente de Desenvolvimento

### Requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: 14.x ou superior)
- [Ionic CLI](https://ionicframework.com/docs/cli) (versão recomendada: 6.x ou superior)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/ricardochomicz/appPokemon.git
   cd appPokemon

2. Instale as dependências
   npm install

3. Adicione as plataformas
   ionic cordova platform add android
   ionic cordova platform add ios

4. Iniciar servidor de desenvolvimento
   ionic serve

5. Construir projeto para produção
   ionic build

6. Rodar dispositivo Android
   ionic cordova run android

7. Rodar dispositivo IOS
   ionic cordova run ios

8. WebHook
   cd webhook
   node server.js

## Test
![image](https://github.com/ricardochomicz/appPokemon/assets/58947372/9eb440bb-a5fc-406e-929e-370b7e7c1209)


## Telas
![image](https://github.com/ricardochomicz/appPokemon/assets/58947372/405dc4a1-cca9-4f2e-99bc-6f0ab119aed9)

![image](https://github.com/ricardochomicz/appPokemon/assets/58947372/ba072e46-b1a3-4c1a-b3ec-96c360c6511b)

![image](https://github.com/ricardochomicz/appPokemon/assets/58947372/2512213f-91cd-442e-852c-942345142066)

## Vídeo
![pokemon_app](https://github.com/ricardochomicz/appPokemon/assets/58947372/68269ddb-e09c-4047-a167-4f4159cd2776)




