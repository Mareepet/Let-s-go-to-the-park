CREATE DATABASE parks_db;

\c parks_db;



CREATE TABLE parks(
id SERIAL PRIMARY KEY,
name TEXT,
image TEXT,
address VARCHAR,
parkfees VARCHAR,
parklot BOOLEAN,
toilet BOOLEAN,
playground BOOLEAN,
bbq BOOLEAN,
foodcourt BOOLEAN,
trail BOOLEAN,
petfriendly BOOLEAN,
description TEXT
);

INSERT INTO parks(name, image, address, parkfees, parklot, toilet, playground, bbq, foodcourt, trail, petfriendly, description)
VALUES
  ('Morialta Conservation Park', 'https://assets.atdw-online.com.au/images/86e8352f55038fd45e35c92bda590fb3.jpeg?fit=crop&w=1000&h=700&sharp=10', 'Reade Gully, Woodforde SA 5072', 'free', true, true, true, true, true, true, true, 'For more than 100 years, Morialta Conservation Park has been a well-loved recreational escape, offering plenty to see and do for everyone. Morialta Conservation Park is a fantastic place to visit all year round. Visit during winter to see the waterfalls flowing at their strongest, and in spring to see the wildflowers at their brightest. If relaxation is more your thing, enjoy a stroll along First Falls walk to the main waterfall, or have a picnic and enjoy a fun-filled day interacting with nature around the Mukanthi Playspace. You may even spot a koala or kookaburra in the large gum trees'),
  ('Deep Creek National Park', 'hhttps://cdn.environment.sa.gov.au/img/eyJidWNrZXQiOiJlbnZzYS1idWNrZXQiLCJrZXkiOiJwYXJrcy9pbWFnZXMvcGFya3MvZGVlcC1jcmVlay1jb25zZXJ2YXRpb24tcGFyay9kZWVwLWNyZWVrLWJsb3dob2xlLWhlcm8uanBnIiwiZWRpdHMiOnsid2VicCI6eyJxdWFsaXR5Ijo2MX0sInJlc2l6ZSI6eyJ3aWR0aCI6MzIwMCwiaGVpZ2h0IjoxMTcyLCJmaXQiOiJjb3ZlciJ9LCJzaGFycGVuIjp0cnVlfX0=', 'Reade Gully, Woodforde SA 5072', '$ 12.50 per vehicle', true, true, false, false, false, true, false, 'Deep Creek National Park is the largest portion of remaining natural vegetation on the Fleurieu Peninsula and is home to an array of native wildlife such as western grey kangaroos, short beaked echidnas and 100 species of birds that can be heard and seen while walking in the park. Whales can be seen cruising the coast during their annual migration which takes place from June to October.'),
  ('Botanic Grove Reserve','https://ehq-production-australia.imgix.net/e54ec45d6f337c81f286cc0a823c6d46b1e76301/original/1601855313/BR_project_image.PNG_f66e4c91d4121506173a515d206a7a42?auto=compress%2Cformat&w=1080','37 Botanic Grove,Campbelltown SA 5074', 'free' true, true,true, true, true, true, true,'Large open grass area with a basket ball court,great place for pets & kids'),
  ('Pitman Park','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQkZJiC92Zz3IWN7iiolfnvuIhC7EUtpe1g&usqp=CAU',' Moore St, Windsor Gardens SA 5087', 'free', true, true, true, true, true, true, true,'Gets a big 5/5 Star, however so does the full length of Linear Park Athelstone all the way to Henley Beach, a totally underated walking and bike trail with ammenities, playgrounds and barbecues scattered along 31+ kilometres of Nature.'),
  ('Kuitpo Forest', 'https://www.walkingsa.org.au/wp-content/uploads/2015/08/Onkeeta-Trail-Kuitpo-Forest-6-1024x768.jpg', '94 Black Nursery Rd, Kuitpo SA 5201', '$15 per vehicle' true, true, false, true, false, true, true, 'Hundreds of thousands of visitors come to camp and enjoy hut-style accommodation, bushwalk, horse ride, mountain bike and take part in a host of organised community events each year.'),
 ('Happy Valley Reservoir Reserve', 'https://ehq-production-australia.imgix.net/8e99a9b5c3a7d7b7f21e4de60a1590a0047dc1a0/original/1599183789/blob_ce715769a8a5148e31a6cdf2fa1f676b?auto=compress%2Cformat&w=1080', '91 Chandlers Hill Rd, O Halloran Hill SA 5158', 'free', true, true, true, true, false, true, false, 'The reserve offers walking trails, a grassy  picnic area with shelters and BBQs, and easy access to the water for fishing. You can bring your kayak or canoe and discover hidden bays and shorelines from the water.');


 CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_digest TEXT
);

