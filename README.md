# FullstackReactGraphQLTypescriptPostgress

# Concepts Learning
1. React
2. TS
3. GraphQL
4. URQL/Apollo
5. Node
6. PostgreSQL
7. MikroORM/TyprORM
8. Redis
9. Next.js
10. TypeGraphQL

# MikroORM => How we interact with DB's (CRUD)
    @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgresql pg
# DOCS: https://mikro-orm.io/docs/defining-entities

# Create new migration with current schema diff
npx mikro-orm migration:create   

# GraphQL Modules (Complete CRUD) GraphQL/CRUD/MikrORM
npm i express apollo-server-express graphql type-graphql

npm i -D @types/express

# GraphQL GUI : http://localhost:4000/graphql

# User Session Creation is in progress.
# Hashing : using argon2

# Redis DataBase
 # Link  :https://github.com/microsoftarchive/redis/releases/tag/win-3.2.100
 # installing 
    npm install redis connect-redis express-session
    npm i --save-dev @types/redis
    npm i --save-dev @types/connect-redis
# set session for user when register/ login