[![Frontend tests](https://github.com/Matsuzaki-Dev/Mecanica-Zoio/actions/workflows/frontend-tests.yml/badge.svg?branch=main)](https://github.com/Matsuzaki-Dev/Mecanica-Zoio/actions/workflows/frontend-tests.yml)

Site para Oficina — scaffold inicial

Conteúdo:
- docker-compose.yml (Postgres, backend, frontend)
- backend/ (NestJS scaffold mínimo)
- frontend/ (Next.js scaffold mínimo)
- .env.example

Como usar:
1. Ajustar variáveis em .env.example -> criar .env
2. docker-compose up --build
3. Seguir instruções em backend/ e frontend/ para instalar dependências locais

CI:
- O workflow Frontend CI - Tests roda em pushes e PRs e executa os testes do frontend (Jest). Veja o badge no topo para o status.
