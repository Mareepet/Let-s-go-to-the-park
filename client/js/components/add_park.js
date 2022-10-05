function renderAddPark() {
  document.querySelector('#page').innerHTML = `
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
          <label for="">Address: </label>
          <input type="text" name="address">
        </fieldset>
          <label for="">Entry Fees: </label>
          <input type="text" name="parkfees">
        </fieldset>
          <label for="">Parking: </label>
          <input type="text" name="parklot">
        </fieldset>
        </fieldset>
          <label for="">Toilets: </label>
          <input type="text" name="toilet">
        </fieldset>
        </fieldset>
          <label for="">Playground: </label>
          <input type="text" name="playground">
        </fieldset>
        </fieldset>
          <label for="">Barbeque: </label>
          <input type="text" name="bbq">
        </fieldset>
        </fieldset>
          <label for="">Foodcourt: </label>
          <input type="text" name="foodcourt">
        </fieldset>
        </fieldset>
          <label for="">Trails: </label>
          <input type="text" name="trail">
        </fieldset>
        </fieldset>
          <label for="">Petfriendly: </label>
          <input type="text" name="petfriendly">
        </fieldset>
        <fieldset>
          <label for="">Description: </label>
          <input type="text" name="description">
        </fieldset>
        <button>Add Park</button>
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
    .then(park => {
      state.parks.push(park)
      renderParkList()
    })
}