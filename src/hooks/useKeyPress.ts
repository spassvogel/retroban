import { DependencyList, useEffect } from 'react';
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
const useKeyPress = (key: string, action: (e: KeyboardEvent) => void, deps?: DependencyList) => {
  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      if (e.key === key) {
        action(e)
      }
    }
    window.addEventListener('keydown', handleKeyup)
    return () => window.removeEventListener('keydown', handleKeyup)
  }, deps)
}

export default useKeyPress