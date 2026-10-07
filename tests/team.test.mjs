import test from 'node:test';
import assert from 'node:assert/strict';
import { encontrarPapel, listarPapeis } from '../team.mjs';

const esperados = [
  { id: 'leader', nome: 'Líder' },
  { id: 'support', nome: 'Suporte' },
  { id: 'programmer', nome: 'Programador' },
  { id: 'qa', nome: 'QA' },
  { id: 'devops', nome: 'DevOps' },
];

test('listarPapeis retorna os cinco papéis na ordem definida', () => {
  assert.deepEqual(listarPapeis(), esperados);
});

test('mutações na lista e nos objetos não afetam chamadas futuras', () => {
  const primeira = listarPapeis();
  primeira[0].id = 'alterado';
  primeira[1].nome = 'Alterado';
  primeira.push({ id: 'extra', nome: 'Extra' });

  assert.deepEqual(listarPapeis(), esperados);
});

test('encontrarPapel devolve uma cópia do papel exato', () => {
  const papel = encontrarPapel('programmer');
  assert.deepEqual(papel, esperados[2]);
  assert.notStrictEqual(papel, encontrarPapel('programmer'));

  papel.nome = 'Alterado';
  assert.deepEqual(encontrarPapel('programmer'), esperados[2]);
});

test('encontrarPapel rejeita tipos que não sejam string com TypeError', () => {
  for (const valor of [null, true, false, 0, 42, [], ['leader'], {}, undefined]) {
    assert.throws(() => encontrarPapel(valor), TypeError);
  }
});

test('encontrarPapel rejeita IDs desconhecidos com RangeError', () => {
  for (const id of ['', 'LEADER', 'constructor', '__proto__']) {
    assert.throws(() => encontrarPapel(id), RangeError);
  }
});
