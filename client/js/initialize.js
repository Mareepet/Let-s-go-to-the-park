const state = {
  parks: [],
  // loggedInUserName: null
}

function GetMap()
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
    state.parks = parks
    renderParkList()
  })

fetch('/api/sessions')
.then(res => res.json())
.then(userName => {
  if (typeof userName === 'string') {
    state.loggedInUserName = userName
  }
})