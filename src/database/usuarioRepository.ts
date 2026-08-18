import { db } from "./database";

export function criarUsuario(
    nome: string,
    email: string,
    senha: string
) {
    const resultado = db.runSync(
        `
        INSERT INTO usuarios (
            nome,
            email,
            senha
        )
        VALUES (?, ?, ?)
        `,
        [nome, email, senha]
    );

    return resultado.lastInsertRowId;
}

export function buscarUsuario(
    email: string,
    senha: string
) {
    return db.getFirstSync<{
        id: number;
        nome: string;
        email: string;
    }>(
        `
        SELECT
            id,
            nome,
            email
        FROM usuarios
        WHERE email = ?
        AND senha = ?
        `,
        [email, senha]
    );
}

export function buscarUsuarioPorEmail(email: string) {
    return db.getFirstSync<{
        id: number;
        nome: string;
        email: string;
    }>(
        `
        SELECT
            id,
            nome,
            email
        FROM usuarios
        WHERE email = ?
        `,
        [email]
    );
}