function renderParkList() {
  document.querySelector('#page').innerHTML = `
    <section class='park-list'>
      ${renderParks()}
    </section>
  `
}

function renderParks() {
  return state.parks.map(park => `
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
      <p>${park.foodcourt}</p>
      <p>${park.trail}</p>
      <p>${park.petfriendly}</p>
      <p>${park.description}</p>
      <button onClick="deletePark(event)">delete</button>
    </section>
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