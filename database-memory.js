// Criação de uma memória interna (Banco de Dados local)

// importação de randomID
import { randomUUID } from "node:crypto"

// exportação da classe DatabaseMemory
export class DatabaseMemory {

    // criando um novo map() para armazenar os livros
    #books = new Map()

    // listagem dos livros usanod Array e Map 
    // para retornar com id em um único objeto
    list(search) {
        return Array.from(this.#books.entries())
			.map((bookArr) => {
				const id = bookArr[0]
				const data = bookArr[1]

				return {
					id,
					...data,
				}
			})
			.filter(book => {
				if (search) {
					return book.title.includes(search)
				}

				return true
			})
    }

    // criação de um livro com ID único
    create(book) {
        const bookId = randomUUID()

        this.#books.set(bookId, book)
    }
    
    // update de um livro com o identificador
    update(id, book) {
        this.#books.set(id, book)
    }

    // exclusão de um livro com o seu ideentificador
    delete(id) {
        this.#books.set(id)
    }
}