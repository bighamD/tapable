const babel = require('@babel/core');
const trverse = require('@babel/traverse').default;
const code = `a["b"].x.m ? c.d.e.f: ''`;
var ast = babel.parse(code);
var l = []
trverse(ast, {
  Identifier(p) {
    const node = p.node;
    // console.log(node.name)
  },
  MemberExpression(p) {
    // var obj = {
    //   name: '',
    //   property: ''
    // }
    const node = p.node;
    propertyCollection(node, l)

  }
});
console.log(l)

function propertyCollection(node, l, obj = {
  name: '',
  property: ''
}) {
  const object = node.object;
  const property = node.property;
  if (object) {
    obj.name = object.name;
    let computed = node.computed;
    let isIdentifier = property.type === 'Identifier';
    let concatProperty = '';
    if (computed) {
      console.log(property)
      concatProperty = isIdentifier ? `[${property.name}]` : `[${property.extra.raw}]`;
    } else {
      concatProperty = `.${property.name}`;
    }
    obj.property = concatProperty + obj.property;
    if (object.object) {
      propertyCollection(object, l, obj);
    } else {
      if (!l.find(o => o.name === obj.name)) {
        l.push(obj);
      }
    }
  }
}