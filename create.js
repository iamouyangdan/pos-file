
// @ts-nocheck
const fs = require("fs");
const path = require("path");
const vscode = require('vscode');

const {
    mkdirsSync
} = require('./utils.js')


const {
    getApiText,
    getDaoText,
    getModelText,
    getServiceText,
    getViewText,
    getPopupText
} = require('./files.js')



function toFirstWordUpperCase(str) {
    return str.replace(/^\S/, s => s.toUpperCase())
}

function toHump(name) {
    let _name =  name.replace(/[_-](\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
    return toFirstWordUpperCase(_name)
}

function addRoute(dir, name) {
    if(!name) {
        return vscode.window.showErrorMessage(`route添加失败, 输入值为空`);
    }
    if(/.*[_-]/.test(name)) {
        vscode.window.showErrorMessage(`Sorry, 你输入的 ${name} 包含"_"或"-"，不符合route文件的命名规范`);
        return;
    }
    const filePath = `${dir}/router/index.ts`
    const routeJsStr = fs.readFileSync(filePath, 'utf-8')
    name = toFirstWordUpperCase(name)
    const str = routeJsStr.replace(/\]\/\/routes-endTag/g, 
    `  {
     path: '/${name}',
     name: '${name}',
     component: () => import(/* webpackChunkName: "${name}" */'../views/${name}.vue')
  },
]//routes-endTag
    `
    )
    try{
        // router
        mkdirsSync(`${dir}/router/`)
        fs.writeFileSync(filePath, str, 'utf-8')
    } catch(e) {
        console.error('创建文件出错了', e)
        vscode.window.showErrorMessage("创建文件出错了" + e.message);
    }   
}
function addView(dir, viewName) {
    if(!viewName) {
        return vscode.window.showErrorMessage(`文件创建失败, 输入值为空`);
    }
    console.log('输入值', viewName)
    if(/.*[_-]/.test(viewName)) {
        vscode.window.showErrorMessage(`Sorry, 你输入的 ${viewName} 包含"_"或"-"，不符合view层文件的命名规范`);
        return;
    }

    console.log('value ', viewName)
    viewName = toFirstWordUpperCase(viewName)
    let data = new Uint8Array(Buffer.from(getViewText(viewName)))
    
    try {
        mkdirsSync(`${dir}/views/`)
        fs.writeFileSync(`${dir}/views/${viewName}.vue`, data);
        addRoute(dir, viewName)
    } catch(e) {
        console.error('创建文件出错了', e)
        vscode.window.showErrorMessage("创建文件出错了" + e.message);
    } 
}
function addService(dir, name) {
    if(!name) {
        return vscode.window.showErrorMessage(`文件创建失败, 输入值为空`);
    }
    console.log('输入值', name)
    if(/.*[_-]/.test(name)) {
        vscode.window.showErrorMessage(`Sorry, 你输入的${name}包含"_"或"-"，不符合service层文件的命名规范`);
        return;
    }
    if(/.+[Ss]ervice\.ts$/.test(name)) {
        name = name?.split(/[Ss]ervice(\.ts)?$/)[0]
    }
    console.log('value ', name)
    name = toFirstWordUpperCase(name)
    let data = new Uint8Array(Buffer.from(getServiceText(name)))
    
    try {
        mkdirsSync(`${dir}/services/`)
        fs.writeFileSync(`${dir}/services/${name}Service.ts`, data);
    } catch(e) {
        console.error('创建文件出错了', e)
        vscode.window.showErrorMessage("创建文件出错了" + e.message);
    }  
}

function addPopup(dir, inputValue) {
    if(!inputValue) {
        return vscode.window.showErrorMessage(`文件创建失败, 输入值为空`);
    }
    console.log('输入值', inputValue)
    if(/.*[_-]/.test(inputValue)) {
        vscode.window.showErrorMessage(`Sorry, 你输入的${inputValue}包含"_"或"-"，不符合view层文件的命名规范`);
        return;
    }
    const name = toFirstWordUpperCase(inputValue)
    console.log('name ', name)
   
    let data = new Uint8Array(Buffer.from(getPopupText(name)))
    
    try {
        mkdirsSync(`${dir}/components/popup/`)
        fs.writeFileSync(`${dir}/components/popup/${name}Popup.vue`, data);
    } catch(e) {
        console.error('创建文件出错了', e)
        vscode.window.showErrorMessage("创建文件出错了" + e.message);
    }  
}

function addApi(dir, inputValue) {
    if(!inputValue) {
        return vscode.window.showErrorMessage(`文件创建失败, 输入值为空`);
    }
    console.log('输入值', inputValue)
    if(/.*[_-]/.test(inputValue)) {
        vscode.window.showErrorMessage(`Sorry, 你输入的${inputValue}包含"_"或"-"，不符合api层文件的命名规范`);
        return;
    }

    console.log('value ', inputValue)
    let data = new Uint8Array(Buffer.from(getApiText(inputValue)))
    
    try {
        mkdirsSync(`${dir}/models/api/`)
        fs.writeFileSync(`${dir}/models/api/${inputValue}.ts`, data);
    } catch(e) {              
        vscode.window.showErrorMessage("创建文件出错了" + e.message);
    }
}

function addDao(dir, inputValue) {
    if(!inputValue) {
        return vscode.window.showErrorMessage(`文件创建失败, 输入值为空`);
    }
    console.log('输入值', inputValue)
    const [dbName, tableName] = inputValue?.split(' ')
    const upperCaseTableName = toHump(tableName)
    console.log('dbName tableName ', dbName, tableName, upperCaseTableName)
    const dataMap = getDaoText(tableName, upperCaseTableName)
    let daoData = new Uint8Array(Buffer.from(dataMap.dao))
    let configData = new Uint8Array(Buffer.from(dataMap.config))
    try {
        mkdirsSync(`${dir}/models/dao/${dbName}/${tableName}/`)
        fs.writeFileSync(`${dir}/models/dao/${dbName}/${tableName}/${upperCaseTableName}Dao.ts`, daoData);
        fs.writeFileSync(`${dir}/models/dao/${dbName}/${tableName}/config.ts`, configData);
    } catch(e) {              
        vscode.window.showErrorMessage("创建文件出错了" + e.message);
    }
}

function addModel(dir, inputValue) {
    if(!inputValue) {
        return vscode.window.showErrorMessage(`文件创建失败, 输入值为空`);
    }
    console.log('输入值', inputValue)
    const [dbName, tableName, apiName] = inputValue?.split(' ')
 
    const upperCaseTableName = toHump(tableName)
    let str = getModelText(dbName, tableName, upperCaseTableName)
    if(!!apiName) {
        str = `import ${apiName}Api from '@/models/api/${apiName}'\n` + str
      }
    let data = new Uint8Array(Buffer.from(str))
    
    try {
        mkdirsSync(`${dir}/models/`)
        fs.writeFileSync(`${dir}/models/${upperCaseTableName}Model.ts`, data);
    } catch(e) {
        console.error('创建文件出错了', e)
        vscode.window.showErrorMessage("创建文件出错了" + e.message);
    }  
}

function addAllModel(dir, inputValue) {
    if(!inputValue) {
        return vscode.window.showErrorMessage(`文件创建失败, 输入值为空`);
    }
    console.log('输入值', inputValue)
    const [dbName, tableName, apiName] = inputValue?.split(' ')
 
    const upperCaseTableName = toHump(tableName)
    let str = getModelText(dbName, tableName, upperCaseTableName)
    if(!!apiName) {
        const apiData = new Uint8Array(Buffer.from(getApiText(inputValue)))
        mkdirsSync(`${dir}/models/api/`)
        fs.writeFileSync(`${dir}/models/api/${apiName}.ts`, apiData);
        str = `import ${apiName}Api from '@/models/api/${apiName}'\n` + str
      }
    let data = new Uint8Array(Buffer.from(str))
    const dataMap = getDaoText(tableName, upperCaseTableName)
    let daoData = new Uint8Array(Buffer.from(dataMap.dao))
    let configData = new Uint8Array(Buffer.from(dataMap.config))

    
    try {
        mkdirsSync(`${dir}/models/dao/${dbName}/${tableName}/`)
        fs.writeFileSync(`${dir}/models/dao/${dbName}/${tableName}/${upperCaseTableName}Dao.ts`, daoData);
        fs.writeFileSync(`${dir}/models/dao/${dbName}/${tableName}/config.ts`, configData);
        fs.writeFileSync(`${dir}/models/${upperCaseTableName}Model.ts`, data);
    } catch(e) {
        console.error('创建文件出错了', e)
        vscode.window.showErrorMessage("创建文件出错了" + e.message);
    }  
}
function addPage(dir, inputValue) {
    if(!inputValue) {
        return vscode.window.showErrorMessage(`文件创建失败, 输入值为空`);
    }
    console.log('输入值', inputValue)
    let [_pageName, dbName, tableName, apiName] = inputValue?.split(' ')
 
    const upperCaseTableName = toHump(tableName)
    let str = getModelText(dbName, tableName, upperCaseTableName)
    if(!!apiName) {
        const apiData = new Uint8Array(Buffer.from(getApiText(inputValue)))
        mkdirsSync(`${dir}/models/api/`)
        fs.writeFileSync(`${dir}/models/api/${apiName}.ts`, apiData);
        str = `import ${apiName}Api from '@/models/api/${apiName}'\n` + str
      }
    let data = new Uint8Array(Buffer.from(str))
    const dataMap = getDaoText(tableName, upperCaseTableName)
    let daoData = new Uint8Array(Buffer.from(dataMap.dao))
    let configData = new Uint8Array(Buffer.from(dataMap.config))
    const pageName = toFirstWordUpperCase(_pageName)
    let viewData = new Uint8Array(Buffer.from(getViewText(pageName)))
    let serviceData = new Uint8Array(Buffer.from(getServiceText(pageName)))
    try {
        // model层
        mkdirsSync(`${dir}/models/dao/${dbName}/${tableName}/`)
        fs.writeFileSync(`${dir}/models/dao/${dbName}/${tableName}/${upperCaseTableName}Dao.ts`, daoData);
        fs.writeFileSync(`${dir}/models/dao/${dbName}/${tableName}/config.ts`, configData);
        fs.writeFileSync(`${dir}/models/${upperCaseTableName}Model.ts`, data);

        // service层
        mkdirsSync(`${dir}/services/`)
        fs.writeFileSync(`${dir}/services/${pageName}Service.ts`, serviceData);

        // view层
        mkdirsSync(`${dir}/views/`)
        fs.writeFileSync(`${dir}/views/${pageName}.vue`, viewData);
    } catch(e) {
        console.error('创建文件出错了', e)
        vscode.window.showErrorMessage("创建文件出错了" + e.message);
    }  
}


module.exports = {   
    addPage,
    addModel,
    addAllModel,
    addDao,
    addApi,
    addPopup,
    addView,
    addService,
    mkdirsSync,
    addRoute,
}