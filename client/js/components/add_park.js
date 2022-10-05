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