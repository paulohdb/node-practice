// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//    response.write('Hello World')

//    return response.end()
//})

// server.listen(3333)


// Importação da microframework e bibliotecas
import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

// Criação do servidor pelo fastify
const server = fastify()

// Criação do Banco de Dados interno
// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// Métodos do CRUD 

server.post('/books', async (request, reply) => {
    
    // destruturar o "body" 
    const { title, description, pages } = request.body


    // criando um novo livro com informações
    await database.create({
        title,
        description,
        pages,
    })

    // retornando um status code
    return reply.status(201).send()
})

server.get('/books', async (request) => {
    const search = request.query.search

    const books = await database.list(search)

    return books
})

server.put('/books/:id', async (request, reply) => {
    const bookId = request.params.id
    const { title, description, pages } = request.body

    await database.update(bookId, {
        title,
        description,
        pages,
    })

    return reply.status(204).send()
})

server.delete('/books/:id', async (request, reply) => {
    const bookId = request.params.id

    await database.delete(bookId)

    return reply.status(204).send()
})

// Porta para executar a aplicação
server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})

