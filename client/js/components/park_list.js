function renderParkList() {
  if(state.loggedInUserName) {

    document.querySelector('#page').innerHTML = `
    <ul>
      <li class="material-symbols-outlined add"onClick="renderAddPark()">add</li>
      <li class="material-symbols-outlined edit-park"onClick="renderParkList()">edit</li>
      <li class="material-symbols-outlined logout"onClick="renderLogout()">logout</li>
    </ul>
    <div id="myMap"></div>
    <section class='park-list'>
      ${renderParks()}
    </section>
  `
  renderGetMap()
  } else {
    document.querySelector('#page').innerHTML = `
      <h2>Welcome to our page! Please sign up or login to check the best parks in South Australia</h2>
      <div class="main-page">
        <img src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80">
      </div>
    `
  }

}
// renderGetMap()
function renderParks() {
  // renderGetMap()
  return state.parks.map(park => `
  <div>
    <section class='park' data-id='${park.id}'>
      <header>
        <h2>${park.name}</h2>
      </header>
      <img src=${park.image}></img>
      <p>${park.address}</p>
      <p>${park.description}</p>
      <p>${park.parkfees}</p>
      <p>${park.toilet}</p>
      <p>${park.playground}</p>
      <p>${park.bbq}</p>
      <p>${park.parklot}</p>
      <p>${park.foodcourt}</p>
      <p>${park.trail}</p>
      <p>${park.petfriendly}</p>
      <button onClick="editPark(event)">edit</button>
      <button onClick="deletePark(event)">delete</button>
      <br>
      <div id="myMap">map is here</div>
    </section>
    </div>
  `).join('')
  
}
function deletePark(event) {
  const deleteBtn = event.target
  const parkDOM = deleteBtn.closest('.park')
  const parkId = parkDOM.dataset.id

  fetch(`/api/parks/${parkId}`, {
    method: 'DELETE'
    
  })
    .then(() => {
      state.parks = state.parks.filter(t => t.id != parkId)
      renderParkList()
    })
}

function editPark(event) {
  const deleteBtn = event.target
  const parkDOM = deleteBtn.closest('.park')
  const parkId = parkDOM.dataset.id

  state.park = state.parks.filter(t => t.id == parkId)
  renderEditPark()
}
