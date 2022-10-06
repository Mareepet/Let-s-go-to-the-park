async function renderParkList() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  Promise.all(state.parks.map(async (park) => {
    const result = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?countryRegion=AU&addressLine=${park.name}&key=AlaIoCddfTLHm5Ow5scWla--GdWyvDOB0a4LuXTh3rC10_8oQzKo3Lc9ai0eyAST`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    return {
      ...park,
      lat: result.resourceSets[0].resources[0].point.coordinates[0],
      long: result.resourceSets[0].resources[0].point.coordinates[1]
    }
  })).then(park => {
    state.parks = park
  })
  console.log(state.parks)
  if(state.loggedInUserName) {

    document.querySelector('#page').innerHTML = `
    <nav class="header-nav">
      <ul>
        <li onClick="renderParkList()">Home</li>
        <li onClick="renderAddPark()">Add Parks</li>
        <li onClick="renderParkList()">View Parks</li>
        <li onClick="renderLogout()">Logout</li>
      </ul>
    </nav>
    <section class='park-list'>
      ${renderParks("test")}
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




function renderParks() {
  
  return state.parks.map(park => `
    <section class='park' data-id='${park.id}'>
      <header>
        <h2>${park.name}</h2>
      </header>
      <img src=${park.image}></img>
      <div class="feature-address-container-outer">
        <div class="feature-address-container">
          <div>
            <p>${park.address}</p>
            <p>${park.parkfees}</p>
          </div>
          <div class="feature-container">
            ${park.toilet ? (
              '<span class="material-symbols-outlined add">wc</span>'
            ) : '<div></div>'}
            ${park.playground ? (
              '<span class="material-symbols-outlined add">rocket</span>'
            ) : '<div></div>'}
            ${park.bbq ? (
              '<span class="material-symbols-outlined add">outdoor_grill</span>'
            ) : '<div></div>'}
            ${park.parklot ? (
              '<span class="material-symbols-outlined add">local_parking</span>'
            ) : '<div></div>'}
            ${park.foodcourt ? (
              '<span class="material-symbols-outlined add">restaurant</span>'
            ) : '<div></div>'}
            ${park.trail ? (
              '<span class="material-symbols-outlined add">hiking</span>'
            ) : '<div></div>'}
            ${park.petfriendly ? (
              '<span class="material-symbols-outlined add">pets</span>'
            ) : '<div></div>'}
          </div>
        </div>
      </div>
      
      <p>${park.description}</p>
      <div class="map-container">
        <iframe width="500" height="400" frameborder="0" src="https://www.bing.com/maps/embed?h=400&w=500&cp=${park.lat}~${park.long}&lvl=17&typ=d&sty=r&src=SHELL&FORM=MBEDV8" scrolling="no">
        </iframe>

        <div style="white-space: nowrap; text-align: center; width: 500px; padding: 6px 0; width: 100%;">
          <a id="largeMapLink" target="_blank" href="https://www.bing.com/maps?cp=${park.lat}~${park.long}&amp;sty=r&amp;lvl=17&amp;FORM=MBEDLD">View Larger Map</a> &nbsp; | &nbsp;
          <a id="dirMapLink" target="_blank" href="https://www.bing.com/maps/directions?cp=${park.lat}~${park.long}&amp;sty=r&amp;lvl=17&amp;rtp=~pos.-34.90117931908466_138.69062508591605____&amp;FORM=MBEDLD">Get Directions</a>
        </div>
     
      </div>
</div>
      
      
      <div class="button-container">
        <button onClick="editPark(event)">edit</button>
        <button onClick="deletePark(event)">delete</button>
      </div>
      <br>
      <div id="myMap"></div>
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

function editPark(event) {
  const deleteBtn = event.target
  const parkDOM = deleteBtn.closest('.park')
  const parkId = parkDOM.dataset.id

  state.park = state.parks.filter(t => t.id == parkId)
  renderEditPark()
}
