const state = {
  parks: [],
  // loggedInUserName: null
}

fetch('/api/parks')
  .then(res => res.json())
  .then(parks => {
    state.parks = parks
    renderParkList()
  })

fetch('/api/sessions')
.then(res => res.json())
.then(userName => {
  if (typeof userName === 'string') {
    state.loggedInUserName = userName
  }
})