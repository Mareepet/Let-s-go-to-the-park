function renderParkList() {
  if(state.loggedInUserName) {
    document.querySelector('#page').innerHTML = `
    <ul>
      <li class="material-symbols-outlined add-park"onClick="renderAddPark()">add_circle</li>
      <li class="material-symbols-outlined edit-park"onClick="renderParkList()">edit</li>
      <li class="material-symbols-outlined logout"onClick="renderLogout()">logout</li>
    </ul>
    <section class='park-list'>
      ${renderParks()}
    </section>
  `
  } else {
    document.querySelector('#page').innerHTML = `
      <p>Please sign up/login to see the best Parks in SA!</p>
    `
  }

}

function renderParks() {

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