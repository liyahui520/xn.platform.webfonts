const fs = require('fs')
const path = require('path')
// 引入遍历插件
const _ = require('lodash')
// const rm = require('rimraf')

// 引入接口文档
const SCHEMA = require('./schema.json')
const beautify = require('js-beautify').js_beautify
// 导入生产types模板
const typesRender = require('./templates/types')

//导入生成store的模板
const storeRender = require('./templates/store')

const apiRender = require('./templates/apitemp')

const EntityRender = require('./templates/entity')

//导入modules模板
const modulesRender = require('./templates/moduleTemp')

// 配置文件
const config = {
    // 生成store文件路径
    outStorePath: '../src/store/modules/',
    outApiPath: '../src/api/',
    // 生成store配置文件路径
    outStoreType: '../src/store/',

    //生成entity
    outEntityPath: '../src/store/entities/',

    //生成modules
    outModulesPath : '../src/store/modules/'
}
// const MODELS = parseSchemas(SCHEMA.doc.models || {})
// json文件赋值
const MODELS = SCHEMA.doc.models || {};

/**
 * 创建文件
 * @param path
 * @param fileName
 * @param content
 */
function writeFile (path, fileName, content) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  // fs.writeFileSync(path + toKebabCase(fileName) + '.ts', content, {encoding: 'utf8'})
  fs.writeFileSync(path + fileName + '.ts', content, {encoding: 'utf8'})
}
// 大小写转换
function toUpperCase (name) {
  return name.toUpperCase()
}

/**
 * Foo Bar | --foo-bar | __foo_bar__ => fooBar
 * @param name
 */
function toCamelCase (name) {
  return _.camelCase(name)
}

/**
 * Foo Bar | fooBar | --foo-bar => foo_bar
 * @param name
 */
function toSnakeCase (name) {
  return _.snakeCase(name)
}

/**
 * fooBar => foo-bar
 * @param name
 */
function toKebabCase (name) {
  return _.kebabCase(name)
}

function toUpperSnakeCaseName (name) {
  return toUpperCase(toSnakeCase(name))
}

/**
 * 格式化js代码
 * @param content
 * @returns {*}
 */
function beautifyJs (content) {
  content = content.replace(/(\r\n|\n)\s*/g, '\n')
    .replace(/\(\n/g, '(')
    .replace(/,\n/g, ',')
    .replace(/\/\*\*/g, '\n/**')
    .replace(/\n\/\//g, '\n\n//')
  return beautify(content, {
    indent_with_tabs: false,
    indent_size: 2,
    jslint_happy: true,
    end_with_newline: true,
    space_after_anon_function: true
  })
}
function apitemp(){
  
  // 定义types模板的数据
  let types = {}
  //定义modules.js的数据和modules.js导出的字段
  let modules = [], extendsArray = []
  // 遍历json文件
  let moduleNamea="";
  let isPage = false;
  _.each(MODELS, function (model, name) {
    //entity生成
    _.each(model,function(item,modename) {
      //实体类生成
      
      if(modename!="apiT"){
        
        _.each(item,function(entityItem){ 
          moduleNamea= modename;
          const outPath = path.join(__dirname, config.outEntityPath) 
     // 生成store模板文件并传值
        writeFile(outPath, modename, beautifyJs(EntityRender({
          name: modename,
          importTypeArray: [],
          items: entityItem
            })))
        })

      }else{
        let items =[];
        _.each(item,function(entityItem){
        items.push({
          NAME: toUpperSnakeCaseName(modename),
          name: toCamelCase(modename),
          state: entityItem.state,
          tostate: entityItem.state.charAt(0).toUpperCase()+entityItem.state.slice(1),
          url: entityItem.path,
          httpMethod: entityItem.httpMethod, //请求参数
          ajaxParam: entityItem.IsParam, //是否存在参数
          page: entityItem.IsPage,   //是否有分页
          title: entityItem.title,    //描述
          isGet: entityItem.IsGet,   //是否为get？请求
          getParam: entityItem.GetParam     //?参数
        })
        if(entityItem.IsPage)
          isPage=entityItem.IsPage
        })
        console.log(items)

        const modulesOutPath = path.join(__dirname, config.outModulesPath)
        //生成modules
        writeFile(modulesOutPath,modename,beautifyJs(modulesRender({
          modelname: moduleNamea.charAt(0).toUpperCase()+moduleNamea.slice(1),
          name: moduleNamea,
          ispage:isPage,
          items:items
        })))

        //生成api
         // 定义生成文件的路径
      const outPath = path.join(__dirname, config.outApiPath) 
      console.log(moduleNamea.charAt(0).toUpperCase()+moduleNamea.slice(1)+"Api")
      let feilename = moduleNamea.charAt(0).toUpperCase()+moduleNamea.slice(1)+"Api";
     // 生成store模板文件并传值
      writeFile(outPath,  feilename, beautifyJs(apiRender({
        name: moduleNamea,
        items: items
      })))
      }
    })


    //  modules.push(`import ${name} from './modules/${ toKebabCase(name)}'`)
    //  extendsArray.push(name)
    //   let importTypeArray = [],
    //   customStateArray = [],
    //   items = []
    //  types[name] = []
    //  _.each(model, function (item) {
    //     types[name].push({
    //       name: toUpperSnakeCaseName(item.name)
    //     })
    //     importTypeArray.push(toUpperSnakeCaseName(item.name))
    //     customStateArray.push(item.state)
    //     items.push({
    //       NAME: toUpperSnakeCaseName(item.name),
    //       name: toCamelCase(item.name),
    //       state: item.state,
    //       url: item.path,
    //       httpMethod: item.httpMethod,
    //       ajaxParam: 'data'
    //     })
    //  })
    //  // 定义生成文件的路径
    //  const outPath = path.join(__dirname, config.outApiPath)
    //  console.log(items, 'itemsitemsitems');
    //  // 生成store模板文件并传值
    //  writeFile(outPath, name, beautifyJs(apiRender({
    //    name: name,
    //    kebabCaseName: toKebabCase(name),
    //    importTypeArray: importTypeArray,
    //    customStateArray: customStateArray,
    //    items: items
    //  })))
  });
}

/**
 * 生成store文件
 */
function writeStore () {
  // 定义types模板的数据
  let types = {}
  //定义modules.js的数据和modules.js导出的字段
  let modules = [], extendsArray = []
  // 遍历json文件
  _.each(MODELS, function (model, name) {
     modules.push(`import ${name} from './modules/${ toKebabCase(name)}'`)
     extendsArray.push(name)
      let importTypeArray = [],
      customStateArray = [],
      items = []
     types[name] = []
     _.each(model, function (item) {
        types[name].push({
          name: toUpperSnakeCaseName(item.name)
        })
        importTypeArray.push(toUpperSnakeCaseName(item.name))
        customStateArray.push(item.state)
        items.push({
          NAME: toUpperSnakeCaseName(item.name),
          name: toCamelCase(item.name),
          state: item.state,
          url: item.path,
          httpMethod: item.httpMethod,
          ajaxParam: 'data'
        })
     })
     // 定义生成文件的路径
     const outPath = path.join(__dirname, config.outStorePath)
     console.log(items, 'itemsitemsitems');
     // 生成store模板文件并传值
     writeFile(outPath, name, beautifyJs(storeRender({
       name: name,
       kebabCaseName: toKebabCase(name),
       importTypeArray: importTypeArray,
       customStateArray: customStateArray,
       items: items
     })))
  });
   // 定义生成文件的路径
  const outStore = path.join(__dirname, config.outStoreType)
  // 生成types模板文件并传值
  writeFile(outStore, 'types', beautifyJs(typesRender({types: types})))
  modules.push(`export default {${extendsArray.join(', ')}}`)
   // 生成modules模板文件并传值
  writeFile(outStore, 'modules', modules.join('\n') + '\n')
}
function init() {
    // 初始化
    // console.log(SCHEMA, 'asd');
    console.log('开始生成代码.....')
   // writeStore();
    apitemp();
    console.log('代码构建完成.....')
}
init()