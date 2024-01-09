// Criação de um banco de dados (Externo)

// importação de randomID
import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

// exportação da classe DatabasePostgres
export class DatabasePostgres {

	// Get ou listagem dos livros
	async list(search) {
		let books
		
		if (search) {
			books = await sql`select * from books where title ilike ${'%' + search + '%'}`
		} else {
			books = await sql`select * from books`
		}
		
		return books
	}

	// criação de um livro com ID único
	async create(book) {
		const bookId = randomUUID()
		const { title, description, pages } = book

		await sql`insert into books (id, title, description, pages) VALUES (${bookId}, ${title}, ${description}, ${pages})`
	}
	
	// update de um livro com o identificador
	async update(id, book) {
		const { title, description, pages } = book

		await sql`update books set title = ${title}, description = ${description}, pages = ${pages} WHERE id = ${id}`
	}

	// exclusão de um livro com o seu identificador
	async delete(id) {
		await sql`delete from books where id = ${id}`
	}
}