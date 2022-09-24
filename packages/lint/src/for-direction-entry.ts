import { transformFromAstSync } from '@babel/core';
import * as parser from '@babel/parser';
import forDirectionLintPlugin from './plugins/for-direction-lint';

const sourceCode = `
for (var i = 0; i < 10; i++) {
}
for (var i = 10; i >= 0; i--) {
}
for (var i = 0; i < 10; i--) {
}
for (var i = 10; i >= 0; i++) {
}
`;

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
});

const result = transformFromAstSync(ast, sourceCode, {
  plugins: [forDirectionLintPlugin],
  filename: 'input.js',
});

console.log(result?.code);
