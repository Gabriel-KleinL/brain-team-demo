const papeis = Object.freeze([
  Object.freeze({ id: 'leader', nome: 'Líder' }),
  Object.freeze({ id: 'support', nome: 'Suporte' }),
  Object.freeze({ id: 'programmer', nome: 'Programador' }),
  Object.freeze({ id: 'qa', nome: 'QA' }),
  Object.freeze({ id: 'devops', nome: 'DevOps' }),
]);

export function listarPapeis() {
  return papeis.map(({ id, nome }) => ({ id, nome }));
}

export function encontrarPapel(id) {
  if (typeof id !== 'string') {
    throw new TypeError('O id do papel deve ser uma string.');
  }

  const papel = papeis.find((item) => item.id === id);
  if (!papel) {
    throw new RangeError(`Papel desconhecido: ${id}`);
  }

  return { id: papel.id, nome: papel.nome };
}
