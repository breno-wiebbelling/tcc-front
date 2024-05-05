import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { LoadingProvider } from './context/loadingContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <LoadingProvider>
        <App />
    </LoadingProvider>
)