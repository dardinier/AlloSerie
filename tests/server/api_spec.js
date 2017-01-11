const frisby = require('frisby');

const URL = 'http://localhost:'+process.env.SERVER_PORT+'/notes';

getEmpty = frisby.create('GET all notes')
    .get(URL+'/')
    .expectStatus(204)
    .after(function() {
        frisby.create('POST a note')
            .post(URL+'/', {
                title: "My Note",
                content: "Lorem ipsum dolor sit amet"
            }, {json: true})
            .expectStatus(201)
            .expectJSONTypes({
                id: String
            })
            .afterJSON(function(note) {
                frisby.create('Get a note')
                    .get(URL+'/'+note.id)
                    .expectStatus(200)
                    .expectJSONTypes({
                        id: String,
                        title: String,
                        content: String,
                        date: Number
                    })
                    .expectJSON({
                        title: "My Note",
                        content: "Lorem ipsum dolor sit amet",
                        date: Math.floor(Date.now() / 1000),
                        id: note.id
                    })
                    .afterJSON(function(note) {
                        frisby.create('Delete a note')
                            .delete(URL+'/'+note.id)
                            .expectStatus(204)
                            .toss();
                    })
                    .toss();
                frisby.create('Get a unknow note')
                    .get(URL+'/aaaa')
                    .expectStatus(404)
                    .toss();
            }).toss();
    }).toss();
