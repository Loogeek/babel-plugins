import { declare } from '@babel/helper-plugin-utils';

const forDirectionLint = declare((api) => {
  api.assertVersion(7);

  return {
    pre(this) {
      this.set('errors', []);
    },

    visitor: {
      ForStatement(this, path, state) {
        const errors = this.get('errors');
        // @ts-ignore
        const testOperator = path.node.test?.operator;
        // @ts-ignore
        const updateOperator = path.node.update?.operator;

        let shouldOperator;
        if (['<', '<='].includes(testOperator)) {
          shouldOperator = '++';
        } else if (['>', '>='].includes(testOperator)) {
          shouldOperator = '--';
        }

        if (shouldOperator !== updateOperator) {
          const tmpErr = Error.stackTraceLimit;
          Error.stackTraceLimit = 0;
          errors.push(
            path
              .get('update')
              .buildCodeFrameError('for director error!', Error),
          );
          Error.stackTraceLimit = tmpErr;
        }
      },
    },

    post(this) {
      console.error(this.get('errors'));
    },
  };
});

export default forDirectionLint;
