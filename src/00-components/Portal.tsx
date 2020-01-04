import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

// https://github.com/bmcmahen/sancho/blob/master/src/Portal.tsx

let container: Element | null = null

const Portal: React.FC = ({ children }) => {
  const [target] = useState<HTMLDivElement | null>(() => {
    if (typeof document === 'undefined') {
      return null
    }

    if (!container) {
      container = document.createElement('div')
      document.body.appendChild(container)
    }

    const div = document.createElement('div')
    container.appendChild(div)

    return div
  })

  useEffect(() => {
    return () => {
      if (target) {
        container!.removeChild(target)
      }
    }
  }, [target])

  return target ? ReactDOM.createPortal(children, target) : null
}

export default Portal
