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