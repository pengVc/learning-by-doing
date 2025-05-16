// @ts-nocheck

window.x = 'global'

/**
 * 直接调用 eval
 */
function directEval() {
  'use strict'
  var x = 'local'

  // local
  // 可以解析当前(调用 eval 的)作用域的变量
  console.log('directEval: ', eval('x')) // => 'local'
}
directEval()

/**
 * 间接调用 eval
 */
function indirectEval() {
  'use strict'
  var x = 'local'

  // 非直接调用 eval 的几种方式
  console.log('indirectEval: ', eval.call(null, 'x')) // => 'global'
  console.log('indirectEval: ', window.eval('x')) // => 'global'
  console.log('indirectEval: ', (1, eval)('x')) // => 'global'
  var aliasEval = eval
  console.log('indirectEval: ', aliasEval('x')) // => 'global'

  aliasEval('var _foo = 3')
  console.log('indirectEval: ', window._foo) // => 3

  var obj = { eval: eval }
  console.log('indirectEval: ', obj.eval('x')) // => global
}
indirectEval()

function newFnWithDeclare() {
  var foo
  var fn = new Function('var foo = 1')

  fn()
  // `undefined` 因为 Function 构造函数创造的变量 foo 并不在全局范围内!
  console.log('new Function (with declare): ', typeof foo) // => undefined

  if (typeof window !== 'undefined') {
    console.log('new Function (with declare): ', window.foo) // => undefined
  } else if (typeof global !== 'undefined') {
    console.log('new Function (with declare): ', global.foo) // => undefined
  }
}
newFnWithDeclare()

function newFnWithoutDeclare() {
  var foo
  var fn = new Function('foo = 1024')

  fn()

  console.log('new Function (without declare): ', foo) // => undefined
  if (typeof window !== 'undefined') {
    console.log('new Function (without declare): ', window.foo) // => 1024
  } else if (typeof global !== 'undefined') {
    console.log('new Function (without declare): ', global.foo) // => 1024
  }
}

newFnWithoutDeclare()

function thisOfStrictFunc() {
  var sl = new Function('return this')
  console.log('unStrict+unStrict this:', sl()) // => window or global

  var st = new Function('"use strict"; return this')
  // 严格模式下, 禁止 this 关键字执行全局对象!
  console.log('unStrict+strict this:', st()) // => undefined
}
thisOfStrictFunc()

function thisOfUnStrictFunc() {
  'use strict'
  var sl = new Function('return this')
  // 不受当前作用域影响
  console.log('strict+unStrict this:', sl()) // => window or global

  var st = new Function('"use strict"; return this')
  // 严格模式下, 禁止 this 关键字执行全局对象!
  console.log('strict+strict this:', st()) //  => undefined
}
thisOfUnStrictFunc()
