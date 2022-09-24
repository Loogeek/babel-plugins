import { declare } from '@babel/helper-plugin-utils';

/**
 * 内部不能对function重新赋值
 */
const noFuncAssignLint = declare((api) => {
  api.assertVersion(7);

  return {
    pre(this) {
      this.set('errors', []);
    },

    visitor: {
      AssignmentExpression(this, path, state) {
        const errors = this.get('errors');

        const assignTarget = path.get('left').toString();
        const binding = path.scope.getBinding(assignTarget); // 获取变量的引用
        if (binding) {
          if (
            binding.path.isFunctionDeclaration() ||
            binding.path.isFunctionExpression()
          ) {
            const tmp = Error.stackTraceLimit;
            Error.stackTraceLimit = 0;
            errors.push(
              path.buildCodeFrameError('Can not reassign to function', Error),
            );

            Error.stackTraceLimit = tmp;
          }
        }

        Error.stackTraceLimit = errors;
      },
    },

    post(this) {
      console.error(this.get('errors'));
    },
  };
});

export default noFuncAssignLint;
