import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("buracos.db");

export function initDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS buracos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      usuario_id INTEGER NOT NULL,

      titulo TEXT NOT NULL,
      descricao TEXT,

      endereco TEXT,
      bairro TEXT,
      cidade TEXT,

      latitude REAL,
      longitude REAL,

      categoria TEXT,
      gravidade TEXT,

      status TEXT DEFAULT 'Aberto',

      criado_em TEXT NOT NULL,

      FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
    );

    CREATE TABLE IF NOT EXISTS midias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      buraco_id INTEGER NOT NULL,

      uri TEXT NOT NULL,
      tipo TEXT NOT NULL,

      FOREIGN KEY (buraco_id)
        REFERENCES buracos(id)
    );
  `);
}