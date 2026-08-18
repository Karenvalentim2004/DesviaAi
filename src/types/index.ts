export type Usuario = {
    id: number;
    nome: string;
    email: string;
};

export type Midia = {
    id: number;
    buraco_id: number;
    uri: string;
    tipo: "foto" | "video";
};

export type Buraco = {
    id: number;
    usuario_id: number;
    titulo: string;
    descricao: string;
    endereco: string;
    bairro: string;
    cidade: string;
    latitude: number;
    longitude: number;
    categoria: string;
    gravidade: string;
    status: "Aberto" | "Em andamento" | "Resolvido";
    criado_em: string;
    usuario_nome?: string;
    midias?: Midia[];
};