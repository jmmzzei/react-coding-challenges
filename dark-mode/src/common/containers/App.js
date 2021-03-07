import React, { useState } from 'react'
export const ModeContext = React.createContext('')

export default function App({ children }) {
  const [mode, setMode] = useState('')
  const toggleMode = () => {
    setMode(mode == 'dark-mode' ? '' : 'dark-mode')
  }
  // Se agregó la función toggleMode al valor del Provider para evitar tener que definirla
  // en cada componente que tenga que cambiar el contexto.
  const contextValue = { mode, toggleMode }

  return (
    // Se hace uso de la API Context para evitar tener que pasar por props el modo dark
    // a cada uno de los componentes que quieran hacer uso de él.
    // De esta manera la aplicación escala mejor.
    <ModeContext.Provider value={contextValue}>
      {/* Se agregó el wrapper acá para que los estilos también impacten en */}
      {/* futuras nuevas rutas */}
      <div className={mode}>{children}</div>
    </ModeContext.Provider>
  )
}
