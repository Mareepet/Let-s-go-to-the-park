const state = {
  parks: [],
  // loggedInUserName: null
}

function renderGetMap()
    {
        var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
          credentials: 'AlaIoCddfTLHm5Ow5scWla--GdWyvDOB0a4LuXTh3rC10_8oQzKo3Lc9ai0eyAST',
          center: new Microsoft.Maps.Location(51.50632, -0.12714),
          mapTypeId: Microsoft.Maps.MapTypeId.aerial,
          zoom: 10
        });
        
        //Add your post map load code here.
    }

fetch('/api/parks')
  .then(res => res.json())
  .then(parks => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    Promise.all(parks.map(async (park) => {
      const result = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?countryRegion=AU&addressLine=${park.name}&key=AlaIoCddfTLHm5Ow5scWla--GdWyvDOB0a4LuXTh3rC10_8oQzKo3Lc9ai0eyAST`, requestOptions)
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

    renderParkList()
  })

  

fetch('/api/sessions')
.then(res => res.json())
.then(userName => {
  if (typeof userName === 'string') {
    state.loggedInUserName = userName
  }
})