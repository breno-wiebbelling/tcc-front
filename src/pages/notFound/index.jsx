import React from 'react';
import Box from "@mui/material/Box";

export default () => {
  return (
    <Box
      style={{
        'backgroundColor': '#f4f4f4',
        'margin': '0',
        'padding': '0',
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center',
        'height': '100vh',
        'background': 'rgb(126,255,195)',
        'background': 'radial-gradient(circle, rgba(126,255,195,1) 0%, rgba(255,255,255,1) 0%, rgba(162,255,212,1) 100%)'
      }}
    >
      <div style={{ 'textAlign': 'center' }}>
        <h1 style={{ 'fontSize': '36px', 'color': '#333', 'marginBottom': '20px'}}>Ops! Resultado Não Encontrado</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>Não conseguimos encontrar o resultado que você estava procurando.</p>
        <a href="https://restmup.site" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold', "&:hover": { textDecoration: 'underline' } }}>Voltar para a página inicial</a>
      </div>
    </Box>
  );
}