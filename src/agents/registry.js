// ============================================================
// I LOVE AGENTS — Agent Registry (Lazy-loaded)
// ============================================================
//
// To contribute an agent: create a new file in ./definitions/
// with `export default { ...agentConfig }`, and it will be
// auto-collected here. See CONTRIBUTING.md for full guidelines.
//
// Agent definitions are lazy-loaded via Vite's import.meta.glob
// with `eager: false` to reduce the initial JS bundle size.
// Each definition file becomes a separate chunk loaded on demand.
// ============================================================

const modules = import.meta.glob('./definitions/*.js', { eager: false });

/**
 * Load all agent definitions and return the array.
 * Results are cached after the first call.
 * @returns {Promise<Array>} Array of agent definition objects.
 */
let cachedAgents = null;
let cachedAgentsPromise = null;

export async function loadAllAgents() {
  if (cachedAgents) return cachedAgents;
  
  if (!cachedAgentsPromise) {
    cachedAgentsPromise = Promise.all(
      Object.values(modules).map((loader) => loader())
    ).then((entries) => {
      cachedAgents = entries.map((mod) => mod.default);
      return cachedAgents;
    }).catch((err) => {
      cachedAgentsPromise = null; // Reset on error so subsequent calls can retry
      throw err;
    });
  }

  return cachedAgentsPromise;
}
