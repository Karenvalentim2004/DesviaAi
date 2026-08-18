import { db } from "./database";

export type Buraco = {
  id: number;
  usuario_id: number;

  titulo: string;
  descricao: string | null;

  endereco: string | null;
  bairro: string | null;
  cidade: string | null;

  latitude: number | null;
  longitude: number | null;

  categoria: string | null;
  gravidade: string | null;

  status: string;

  criado_em: string;

  usuario_nome?: string;
  foto?: string | null;
};

export function criarBuraco(
  usuarioId: number,
  titulo: string,
  descricao: string,
  endereco: string,
  bairro: string,
  cidade: string,
  latitude: number,
  longitude: number,
  categoria: string,
  gravidade: string
) {
  const resultado = db.runSync(
    `
        INSERT INTO buracos (
            usuario_id,
            titulo,
            descricao,
            endereco,
            bairro,
            cidade,
            latitude,
            longitude,
            categoria,
            gravidade,
            status,
            criado_em
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
    [
      usuarioId,
      titulo,
      descricao,
      endereco,
      bairro,
      cidade,
      latitude,
      longitude,
      categoria,
      gravidade,
      "Aberto",
      new Date().toISOString(),
    ]
  );

  return resultado.lastInsertRowId;
}

export function adicionarMidia(
  buracoId: number,
  uri: string,
  tipo: string
) {
  db.runSync(
    `
        INSERT INTO midias (
            buraco_id,
            uri,
            tipo
        )
        VALUES (?, ?, ?)
        `,
    [
      buracoId,
      uri,
      tipo,
    ]
  );
}

export function listarBuracos() {
  return db.getAllSync<Buraco>(
    `
        SELECT
            b.*,
            u.nome AS usuario_nome,

            (
                SELECT m.uri
                FROM midias m
                WHERE m.buraco_id = b.id
                ORDER BY m.id ASC
                LIMIT 1
            ) AS foto

        FROM buracos b

        INNER JOIN usuarios u
            ON u.id = b.usuario_id

        ORDER BY b.id DESC
        `
  );
}

export function buscarBuraco(id: number) {
  return db.getFirstSync<Buraco>(
    `
        SELECT
            b.*,
            u.nome AS usuario_nome,

            (
                SELECT m.uri
                FROM midias m
                WHERE m.buraco_id = b.id
                ORDER BY m.id ASC
                LIMIT 1
            ) AS foto

        FROM buracos b

        INNER JOIN usuarios u
            ON u.id = b.usuario_id

        WHERE b.id = ?
        `,
    [id]
  );
}

export function listarMidias(buracoId: number) {
  return db.getAllSync<{
    id: number;
    uri: string;
    tipo: string;
  }>(
    `
        SELECT
            id,
            uri,
            tipo
        FROM midias
        WHERE buraco_id = ?
        ORDER BY id ASC
        `,
    [buracoId]
  );
}