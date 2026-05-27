import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useAgents } from '../lib/useAgents'
import AgentRunner from '../components/AgentRunner'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function AgentPage() {
  const { id } = useParams()
  const { agents, loading, error, reloadAgents } = useAgents()
  const agent = agents.find((a) => a.id === id)
  useDocumentTitle(agent?.name ?? 'Agent')

  useEffect(() => {
    if (!agent) return

    const existing = JSON.parse(
      localStorage.getItem('recentAgents') || '[]'
    )

    const updated = [
      agent.id,
      ...existing.filter((item) => item !== agent.id),
    ].slice(0, 5)

    localStorage.setItem(
      'recentAgents',
      JSON.stringify(updated)
    )
  }, [agent])

  if (loading) {
    return (
      <div
        className="flex items-center justify-center py-20"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"
          aria-hidden="true"
        />
        <span className="sr-only">Loading agent</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Failed to load agent</h2>
        <p className="text-gray-500 dark:text-text-muted max-w-md mb-6">
          There was an error loading the agent definitions. Please check your connection and try again.
        </p>
        <button
          onClick={reloadAgents}
          className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!agent) {
    return <Navigate to="/" replace />
  }

  // Use key to force remount when switching agents
  return <AgentRunner key={agent.id} agent={agent} />
}
