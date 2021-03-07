import React, { useState, Component } from 'react'
import RocketCore from './RocketCore'

// Se hace uso del memoization. Si la función es idempotente, a la misma entrada
// siempre va a producir la misma salida y en consecuencia no es necesario re-renderizarla
// cada vez que se la llama. React.memo guarda el input previo y lo compara con el actual.
// Si es igual, no se re-renderiza por que el resultado también va a ser igual al previo.
export const FunctionalRocket = React.memo(() => {
  const [initialLaunchTime] = useState(Date.now())

  return <RocketCore initialLaunchTime={initialLaunchTime} />
})

export class ClassRocket extends Component {
  constructor() {
    super()

    this.state = {
      initialLaunchTime: Date.now(),
    }
  }

  // En este caso, shouldComponentUpdate previene la re-renderización del componente
  // al retornar un false si las props siguientes y las actuales son iguales.
  // En un componente del tipo Component (como es este caso) siempre retorna true
  // por ende si se quiere controlar el re-renderizado es necesario llamar a esta función.
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps === this.props) return false
  }

  render() {
    const { initialLaunchTime } = this.state

    return <RocketCore initialLaunchTime={initialLaunchTime} />
  }
}
