import { createContext, useContext, useState, useEffect } from 'react'
import { loadAllAgents } from '../agents/registry'

const AgentsContext = createContext(null)

/**
 * Provider that lazy-loads all agent definitions once and
 * makes them available to the entire component tree.
 */
export function AgentsProvider({ children }) {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [loadVersion, setLoadVersion] = useState(0)

  const reloadAgents = () => {
    setLoading(true)
    setError(null)
    setLoadVersion((v) => v + 1)
  }

  useEffect(() => {
    if (!shouldLoad) return;

    let isMounted = true

    loadAllAgents()
      .then((loaded) => {
        if (isMounted) {
          setAgents(loaded)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load agents:', err)
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [shouldLoad, loadVersion])

  return (
    <AgentsContext.Provider value={{ agents, loading, error, setShouldLoad, reloadAgents }}>
      {children}
    </AgentsContext.Provider>
  )
}

/**
 * Hook to access the lazily-loaded agents list.
 * @returns {{ agents: Array, loading: boolean, error: Error | null }}
 */
export function useAgents() {
  const context = useContext(AgentsContext)
  if (context === null) {
    throw new Error('useAgents must be used within an AgentsProvider')
  }

  useEffect(() => {
    context.setShouldLoad(true)
  }, [context.setShouldLoad])

  return {
    agents: context.agents,
    loading: context.loading,
    error: context.error,
    reloadAgents: context.reloadAgents,
  }
}
