import { transformFromAstSync } from '@babel/core';
import * as parser from '@babel/parser';
import noFuncAssignPlugin from './plugins/no-func-assign-lint';
import eqLintPlugin from './plugins/eq-lint';

/**
 * no-func-assign-lint plugin
 */
// const sourceCode = `
// function foo() {
//   foo = bar;
// }
// var a = function hello() {
//   hello = 123;
// };
// `;

/**
 * eq-lint plugin
 */

const sourceCode = `
  "123" == 123
`;

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
});

// no-func-assign-lint
// const result = transformFromAstSync(ast, sourceCode, {
//   plugins: [noFuncAssignPlugin],
//   filename: 'input.js',
// });

// eq-lint
const result = transformFromAstSync(ast, sourceCode, {
  plugins: [
    [
      eqLintPlugin,
      {
        fix: true,
      },
    ],
  ],
  comments: true,
});
console.log(result?.code);
