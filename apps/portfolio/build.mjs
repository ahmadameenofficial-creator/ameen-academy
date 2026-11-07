import {build} from 'esbuild';
import {mkdir,copyFile,cp} from 'node:fs/promises';
await build({entryPoints:['main.tsx'],bundle:true,outfile:'bundle.js',format:'iife',platform:'browser',target:['es2020'],minify:true,jsx:'automatic',legalComments:'eof'});
await mkdir('dist',{recursive:true});
for(const file of ['index.html','bundle.js','app.js','style.css'])await copyFile(file,'dist/'+file);
await cp('assets','dist/assets',{recursive:true});
