# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Si suben la app a Vercel y encuentran un problema al crear una nueva nota, pueden probar a solucionarlo agregando imageUrls: [] en el archivo store/journal/thunks.js en la función "startNewNote":

const newNote = {
title: "",
body: "",
imageUrls: [],
date: new Date().getTime()
};
