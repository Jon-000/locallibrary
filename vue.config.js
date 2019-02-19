// vue.config.js
module.exports = {
  // options...
  runtimeCompiler: true,

  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8081/", 
        ws: true, // 是否启用websockets
        changOrigin: true, 
        // pathRequiresRewrite: {
        // }
      }
    }
  }

}