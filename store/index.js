  
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state, inc) {
    state.counter += inc
  },
  replace(state, newState) {
    for (const attr in newState) {
      state[attr] = newState[attr]
    }
  }
}

export const actions = {
  async nuxtServerInit(store, context) {
    console.log('nuxtServerInit, client=', process.client, 'serveur=', process.server, 'env=', context.env)
    await new Promise(function(resolve, reject) {
      setTimeout(() => {
        initStore(store, context)
        resolve()
      }, 1000)
    })
  }
}

function initStore(store, context) {
  const cookies = context.app.$cookies
  const session = cookies.get('session')
  if (!session) {
    console.log("nuxtServerInit, initialisation d'une nouvelle session")
    store.commit('increment', 77)
  } else {
    console.log("nuxtServerInit, reprise d'une session existante")
    store.commit('replace', session.store)
  }
  cookies.set('session', { store: store.state }, { path: context.base, maxAge: context.env.maxAge })
  console.log('initStore terminé, store=', store.state)
}