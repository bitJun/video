import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from "path";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import autoprefixer from "autoprefixer";
import postCssPxToRem from "postcss-pxtorem";

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
          ],
        }),
        postCssPxToRem({
          rootValue: 75, // 设计稿宽度除以 10，  开头大写的Px 不转换 => height: 100Px, 内联样式不转换，需要 / 75 转成 rem
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: [".van"], // 过滤掉van-开头的class，不进行rem转换
          exclude: "/node_modules", // 忽略包文件转换rem
        })
      ]
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3009,
    proxy: {
      "/api": {
        // target: "http://211.90.241.209:8074",
        // target: "http://192.168.3.42:8064",
        // target: "http://211.90.243.252:8074",
        target: "https://oatest.hzgjbbg.cn:8061/proxy",
        // target: 'https://oa.hzgjbbg.cn/proxy',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    },
  },
  build: {
    chunkSizeWarningLimit: 1500
  },
  // define: {
  //   'process.env': {}
  // }
})