import { URL, fileURLToPath } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
        'pinia',
        {
          'axios': [['default', 'axios']],
          'dayjs': [['default', 'dayjs']],
          '@vuelidate/validators': [
            'required',
            'minLength',
            'url',
            'maxLength',
            'minValue',
            'maxValue',
            'helpers',
            'email',
            'sameAs',
            'requiredIf',
            'numeric',
            'between',
          ],
          '@vuelidate/core': ['useVuelidate'],
          '@/helpers/utilities': [['default', 'utils']],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      dirs: ['src/components'],
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
