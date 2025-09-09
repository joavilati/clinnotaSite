#!/usr/bin/env sh

# Build do projeto
npm run build

# Navegue para o diretório de build
cd build

# Inicie um novo repositório git
git init
git add -A
git commit -m 'deploy'

# Se você estiver fazendo deploy para https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -