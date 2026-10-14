// Respostas paginadas vêm em {results,next}; listas simples vêm como array.
export const list = d => d.results || d
