import { declare } from '@babel/helper-plugin-utils';

const eqLint = declare((api) => {
  api.assertVersion(7);

  return {
    pre(this) {
      this.set('errors', []);
    },

    visitor: {
      BinaryExpression(this, path, state) {
        if (['==', '!='].includes(path.node.operator)) {
          const left = path.get('left');
          const right = path.get('right');
          // !(如果两边都是字面量且值的类型一样)
          console.log(123, left.isLiteral());
          if (
            !(
              left.isLiteral() === right.isLiteral() &&
              // @ts-ignore
              typeof left.node.value === typeof right.node.value
            )
          ) {
            const errors = this.get('errors');
            const tmpErr = Error.stackTraceLimit;
            Error.stackTraceLimit = 0;
            errors.push(
              path.buildCodeFrameError(
                `Please release ${path.node.operator} to ${path.node.operator}=`,
              ),
            );
            Error.stackTraceLimit = tmpErr;
            console.log(22, state.opts);

            // @ts-ignore
            if (state.opts.fix) {
              // @ts-ignore
              path.node.operator = path.node.operator + '=';
            }
          }
        }
      },
    },

    post(this) {
      console.error(this.get('errors'));
    },
  };
});

export default eqLint;
