module.exports = {
    content: [
      './src/**/*.{vue,js,ts,jsx,tsx}', // Asegúrate de incluir tus archivos
    ],
    theme: {
      extend: {
        gridTemplateColumns: {
          // Agrega las clases personalizadas
          16: 'repeat(16, minmax(0, 1fr))',
          24: 'repeat(24, minmax(0, 1fr))',
        },
      },
    },
    plugins: [],
  };