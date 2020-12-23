const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { stringLiteral } = require('@babel/types');

exports.ASTParser = function ASTParser(fileList) {
  fileList.forEach((filePath, index) => {
    const code = fs.readFileSync(filePath, 'utf8');
    const ast = parser.parse(code);

    function ExpressionStatement(path) {
      const expressionPath = path.get('expression');
      const calleePath = expressionPath.get('callee');
      const argumentsPath = expressionPath.get('arguments');

      if (calleePath.isIdentifier({ name: 'require' })) {
        const value = argumentsPath[0].node.value;
        if(antdStyleReg == 'require("rc-color-picker/assets/index.css");');
        argumentsPath[0].replaceWith(
          stringLiteral('//require("rc-color-picker/assets/index.css");')
        );
      }
    }

    const traverseOptions = {
      ExpressionStatement,
    };

    traverse(ast, traverseOptions);
    fs.writeFileSync(filePath, generate(ast, {}, code).code, 'utf8');
  });

}