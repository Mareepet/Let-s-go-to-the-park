function renderAddPark() {
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
    <section class='create-park'>
      ${renderAddParkForm()}
    </section>
  `
  }
}

function renderAddParkForm() {
  
  // window.onload = GetMap()
  return `
    <section class='create-park'>
      <form onSubmit="createPark(event)">
        <h2>Add Park</h2>
        
        <fieldset>
          <label for="">Name: </label>
          <input type="text" name="name">
        </fieldset>
        <fieldset>
          <label for="">Image_url: </label>
          <input type="text" name="image">
        </fieldset>
        <fieldset>
          <label for="">Address: </label>
          <input type="text" name="address">
        </fieldset>
        <fieldset>
          <label for="">Entry Fees: </label>
          <input type="text" name="parkfees">
        </fieldset>
        <fieldset>
          <label for="">Parking: </label>
          <input id="checkbox1" for="checkbox1" type="checkbox" name="parklot">
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
          <input type="text" name="description">
          </fieldset>
          <div class="form-button-container">
          <button>Save</button>
          </div>
      </form>
    </section>
  `
}

function createPark(event) {
  event.preventDefault()
  const form = event.target

   const data = Object.fromEntries(new FormData(form))

  fetch('/api/parks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(async (park) => {
      
      renderParkList()
      
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const result = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?countryRegion=AU&addressLine=${park.name}&key=AlaIoCddfTLHm5Ow5scWla--GdWyvDOB0a4LuXTh3rC10_8oQzKo3Lc9ai0eyAST`, requestOptions)
      .then(response => response.json())
      .then(result => result)
      
      state.parks.push({
        ...park,
        lat: result.resourceSets[0].resources[0].point.coordinates[0],
        long: result.resourceSets[0].resources[0].point.coordinates[1]
      })
    })
}