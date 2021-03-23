// @ts-nocheck
/*
 * @Description: 
 */
const path = require("path");
const vscode = require('vscode');

Object.defineProperty(exports, "__esModule", {
    value: true
});

const {
 addPage,
 addModel,
 addAllModel,
 addDao,
 addApi,
 addPopup,
 addView,
 addService,
 addRoute,
 mkdirsSync,
} = require('./create.js')

const createService = function (e) {
    const dir = path.normalize(e.fsPath);
    if(!/src$/i.test(dir)){
        return vscode.window.showErrorMessage("当前选中目录不是src目录，请选择src目录进行操作!!!");
    }
    const result = vscode.window.showInputBox({
        prompt: "请输入service文件名称",
        value: "",
        placeHolder: "格式：首字母大写，如DeliveryOrder、HoldOrder",
    });
    result.then(inputValue => {
        addService(dir, inputValue)            
    });
}

const createView = function (e) {
    const dir = path.normalize(e.fsPath);
    if(!/src$/i.test(dir)){
        return vscode.window.showErrorMessage("当前选中目录不是src目录，请选择src目录进行操作!!!");
    }
       
    const result = vscode.window.showInputBox({
        prompt: "请输入view名称(注：页面创建成功后插件将自动添加路由)，格式：驼峰命名，如productSetting、ProductSetting",
        value: "",
        placeHolder: "格式：驼峰命名，如productSetting、ProductSetting",
    });
    result.then(inputValue => {
        addView(dir, inputValue)            
    });
   
}

const createPopup = function (e) {
    const dir = path.normalize(e.fsPath);
    if(!/src$/i.test(dir)){
        return vscode.window.showErrorMessage("当前选中目录不是src目录，请选择src目录进行操作!!!");
    }
    const result = vscode.window.showInputBox({
        prompt: "请输入弹窗名称，格式：驼峰命名，如productSetting、ProductSetting",
        value: "",
        placeHolder: "格式：驼峰命名，如productSetting、ProductSetting",
    });
    result.then(inputValue => {
        addPopup(dir, inputValue)            
    });
}

const createApi = function (e) {
    const dir = path.normalize(e.fsPath);
    if(!/src$/i.test(dir)){
        return vscode.window.showErrorMessage("当前选中目录不是src目录，请选择src目录进行操作!!!");
    }
    const result = vscode.window.showInputBox({
        prompt: "请输入api名称，首字母大写, 如: order returnOrder ",
        value: "",
        placeHolder: "格式：首字母大写, 如: returnOrder",
    });
    result.then(inputValue => {
        addApi(dir, inputValue)     
    });
}

const createDao = function (e) {
    const dir = path.normalize(e.fsPath);
    if(!/src$/i.test(dir)){
        return vscode.window.showErrorMessage("当前选中目录不是src目录，请选择src目录进行操作!!!");
    }
    const result = vscode.window.showInputBox({
        prompt: "请依次输入 数据库名称和表名称, 库名和表名使用空格分隔，如order return_order表示order库return_order表",
        value: "",
        placeHolder: "格式：小写字母或数字，多个单词用下划线分隔, 如: order_count",
    });
    result.then(inputValue => {
        addDao(dir, inputValue)
       
    });
}

const createModel = function (e) {
    const dir = path.normalize(e.fsPath);
    if(!/src$/i.test(dir)){
        return vscode.window.showErrorMessage("当前选中目录不是src目录，请选择src目录进行操作!!!");
    }
    const result = vscode.window.showInputBox({
        prompt: "请依次输入 数据库名称和表名称, 库名和表名使用空格分隔，如order return_order表示order库return_order表",
        value: "",
        placeHolder: "格式：[数据库名称] [表名称] [api名称]",
    });
    result.then(inputValue => {
        addModel(dir, inputValue)            
    });
}

const createAllModel = function (e) {
    const dir = path.normalize(e.fsPath);
    if(!/src$/i.test(dir)){
        return vscode.window.showErrorMessage("当前选中目录不是src目录，请选择src目录进行操作!!!");
    }
    const result = vscode.window.showInputBox({
        prompt: "请依次输入 数据库名称,表名称,api文件名称, 使用空格分隔，如order return_order order表示order库 return_order表 order对应api",
        value: "",
        placeHolder: "提示（格式：[数据库名称] [表名称] [api名称]）",
    });
    result.then(inputValue => {
        addAllModel(dir, inputValue)            
    });
}


const createPage = function (e){
    const dir = path.normalize(e.fsPath);
    if(!/src$/i.test(dir)){
        return vscode.window.showErrorMessage("当前选中目录不是src目录，请选择src目录进行操作!!!");
    }
    const result = vscode.window.showInputBox({
        prompt: "请依次输入 页面名称，数据库名称, 表名称, api文件名称, 使用空格分隔，如home order return_order order表示Home.vue页面 order库 return_order表 order对应api",
        value: "",
        placeHolder: "提示（格式：[页面名称] [数据库名称] [表名称] [api名称]）",
    });
    result.then(inputValue => {
        addPage(dir, inputValue)            
    });
}


const createRoute = function(e) {
    const dir = path.normalize(e.fsPath);
    if(!/src$/i.test(dir)){
        return vscode.window.showErrorMessage("当前选中目录不是src目录，请选择src目录进行操作!!!");
    }
    const result = vscode.window.showInputBox({
        prompt: "请输入路由名称",
        value: "",
        placeHolder: "格式：驼峰命名，如productSetting、ProductSetting",
    });
    result.then(inputValue => {
        addRoute(dir, inputValue)            
    });
}



module.exports = function (context) {
    
    console.log('context ', context)
    context.subscriptions.push(vscode.commands.registerCommand('pos-file.createApi', (e) => {
        createApi(e)
    }));

    context.subscriptions.push(vscode.commands.registerCommand('pos-file.createDao', (e) => {
        createDao(e)
    }));

    context.subscriptions.push(vscode.commands.registerCommand('pos-file.createModel', (e) => {
        createModel(e)
    }));

    context.subscriptions.push(vscode.commands.registerCommand('pos-file.createAllModel', (e) => {
        createAllModel(e)
    }));
    

    context.subscriptions.push(vscode.commands.registerCommand('pos-file.createService', (e) => {
        createService(e)
    }));

    context.subscriptions.push(vscode.commands.registerCommand('pos-file.createView', (e) => {
        createView(e)
    }));

    context.subscriptions.push(vscode.commands.registerCommand('pos-file.createPage', (e) => {
        createPage(e)
    }));

    
    context.subscriptions.push(vscode.commands.registerCommand('pos-file.createPopup', (e) => {
        createPopup(e)
    }));

    
    context.subscriptions.push(vscode.commands.registerCommand('pos-file.createRoute', (e) => {
        createRoute(e)
    }));
}