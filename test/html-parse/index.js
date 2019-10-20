const parse5 = require('parse5');
const babylon =  require('babylon');
const babel = require('@babel/core')
const t =  require('@babel/types');
const path = require('path');
const fs =  require('fs');
const traverse = require('@babel/traverse').default;
const code  =  fs.readFileSync(path.resolve(__dirname, 'a.wxml'), 'utf8');
const expPattern = '{{(.+?)}}';
const EXP_REG = new RegExp(expPattern);
const TRINOCULAR_EXP = /\w+\s+(?)\s+\w\s+(:)\s+\w+/
const EXP_REG_ALL = new RegExp(expPattern, 'g');
const tree = parse5.parseFragment(code);
const props = {
  propsList: new Map(),
  tempPropsList: []
}
function isExp(exp) {
  return EXP_REG.test(exp);
}

function getExpVal(exp) {
  if (isExp(exp)) {
    return exp.match(EXP_REG)[1];
  }
}
/**
 *  获取小程序标签节点非textNode的属性变量
 *
 * @param {*} node 要遍歷的節點
 * @param {*} props 裝載變量的集合
 * @example    <template is="foo" attr="{{attr1}}" data="{{obj1, ...obj2}}"></template> 该标签的变量有[attr1, obj1, obj2]
 */
function traveNodes(node, props) {
  if (node.tagName === '#text') {}
  if(node.childNodes && node.childNodes.length) {
    for (const cnode of node.childNodes) {
      if (cnode.attrs && cnode.attrs.length) {
        for (const attr of cnode.attrs) {
          const expVal = getExpVal(attr.value);
          if(expVal) {
            // props.propsList.push(expVal)
            let code = `var xxxxx = {${expVal}}`;
            console.log(code);
            let ast = babel.parse(code);
            traverseWrapper(ast, props)
          }
        }
      }
      traveNodes(cnode, props)
    }
  }
}

traveNodes(tree, props);
function traverseWrapper(ast, props) {
  traverse(ast, {
    Identifier(path) {
      const propsList = props.propsList;
      const node = path.node;
      // console.log(path)
      if (node.name === 'xxxxx') return;
      if(!['properties','property'].includes(path.key)) {
        // props.propsList.push(path.node.name);
        // propsList[node.name] = propsList[node.name] ? propsList[node.name] += propsList[node.name] : 1;
        if(!propsList.get(node.name)) {
          propsList.set(node.name, 1)
        } else {
          var times = propsList.get(node.name);
          propsList.set(node.name, ++times);
        }
      }
    }
  })
}
console.log(props.propsList)