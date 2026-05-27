import { createContext, useContext, useState, useEffect } from 'react'
import { loadAllAgents } from '../agents/registry'

const AgentsContext = createContext({
  agents: [],
  loading: true,
})

/**
 * Provider that lazy-loads all agent definitions once and
 * makes them available to the entire component tree.
 */
export function AgentsProvider({ children }) {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllAgents()
      .then((loaded) => {
        setAgents(loaded)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load agents:', err)
        setLoading(false)
      })
  }, [])

  return (
    <AgentsContext.Provider value={{ agents, loading }}>
      {children}
    </AgentsContext.Provider>
  )
}

/**
 * Hook to access the lazily-loaded agents list.
 * @returns {{ agents: Array, loading: boolean }}
 */
export function useAgents() {
  return useContext(AgentsContext)
}
