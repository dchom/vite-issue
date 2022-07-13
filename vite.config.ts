import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import {
  themePreprocessorPlugin,
  themePreprocessorHmrPlugin
} from '@zougt/vite-plugin-theme-preprocessor'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import viteCompression from 'vite-plugin-compression'
import WindiCSS from 'vite-plugin-windicss'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // optimizeDeps: {
  //   include: [
  //     "vue",
  //     "dayjs",
  //     "pinia",
  //     "axios",
  //     "quill",
  //     "echarts",
  //     "vue-router",
  //     "vue3-count-to",
  //     "@ant-design/icons-vue",
  //     "ant-design-vue/es/locale/zh_CN"
  //   ]
  // },
  plugins: [
    // 预打包
    PkgConfig(),
    OptimizationPersist(),
    vue(),
    WindiCSS(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'types/auto-import.d.ts'
    }),
    Components({
      resolvers: [
        AntDesignVueResolver()
      ],
      dts: true
    }),
    // createStyleImportPlugin({
    //   resolves: [AndDesignVueResolve()]
    // }),
    themePreprocessorPlugin({
      less: {
        multipleScopeVars: [
          {
            scopeName: 'theme-default',
            path: resolve('src/assets/style/theme/default.less')
          },
          {
            scopeName: 'theme-dark',
            path: resolve('src/assets/style/theme/dark.less')
          }
        ],
        includeStyleWithColors: []
      }
    }),
    themePreprocessorHmrPlugin(),
    viteCompression()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    assetsDir: './static',
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      output: {
        comments: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes(resolve(__dirname, '/src/store/index.ts'))) {
            return 'vendor'
          }
        }
      }
    }
  }
})
