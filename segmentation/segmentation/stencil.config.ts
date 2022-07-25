import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'segmentation',
  sourceMap: true,
  globalStyle: "./src/styles/main.css",
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: 'styles/theme.css',
          dest: 'assets/theme.css',
          warn: true,
        }

      ]
    },
  ],
};


//{
      //   injectGlobalPaths:
      //     ["./src/styles/global.scss", "*"]
      // }