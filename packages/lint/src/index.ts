import { transformFromAstSync } from '@babel/core';
import * as parser from '@babel/parser';
import noFuncAssign from './plugins/no-func-assign-lint';

const sourceCode = `
function foo() {
  foo = bar;
}
var a = function hello() {
hello = 123;
};

a = 'test'
`;

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
});

const result = transformFromAstSync(ast, sourceCode, {
  plugins: [noFuncAssign],
  filename: 'input.js',
});
