function renderEditPark() {
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
    <section>
      ${renderEditParkForm()}
    </section>
  `
  }

}

function renderEditParkForm() {
  return state.park.map(park =>`
    <form onSubmit="updatePark(event)">
      <h2>Edit Park</h2>
      <fieldset>
        <label for="">Name: </label>
        <input type="text" name="name" value=${park.name}>
      </fieldset>
      <fieldset>
        <label for="">Image_url: </label>
        <input type="text" name="image" value=${park.image}>
      </fieldset>
      <fieldset>
        <label for="">Address: </label>
        <input type="text" name="address" value=${park.address}>
      </fieldset>
      <fieldset>
        <label for="">Entry Fees: </label>
        <input type="text" name="parkfees" value=${park.parkfees}>
      </fieldset>
      <fieldset>
        <label for="">Parking: </label>
        <input type="checkbox" name="parklot">
        <label for="">Toilets: </label>
        <input type="checkbox" name="toilet">
        <label for="">Playground: </label>
        <input type="checkbox" name="playground">
        <label for="">Barbeque: </label>
        <input type="checkbox" name="bbq">
        <label for="">Foodcourt: </label>
        <input type="checkbox" name="foodcourt">
        <label for="">Trails: </label>
        <input type="checkbox" name="trail">
        <label for="">Petfriendly: </label>
        <input type="checkbox" name="petfriendly">
        </fieldset>
        <fieldset>
        <label for="">Description: </label>
        <textarea rows="4" cols="150" type="textarea" name="description" value=${park.description}>
        ${park.description}
        </textarea>
        </fieldset>
        <div class="form-button-container">
        <button>Save</button>
        </div>
    </form>
  `).join('')
}

function updatePark(event) {
  event.preventDefault()
  const form = event.target
  

   const data = Object.fromEntries(new FormData(form))

  fetch(`/api/parks/${state.park[0].id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(async(park) => {
      state.parks = state.parks.filter(t => t.id != park.id)

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const result = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?countryRegion=AU&addressLine=${park.name}&key=AlaIoCddfTLHm5Ow5scWla--GdWyvDOB0a4LuXTh3rC10_8oQzKo3Lc9ai0eyAST`, requestOptions)
      .then(response => response.json())
      .then(result => result)
      
      console.log(result)
      state.parks.push({
        ...park,
        lat: result.resourceSets[0].resources[0].point.coordinates[0],
        long: result.resourceSets[0].resources[0].point.coordinates[1]
      })
      renderParkList()
    })
}