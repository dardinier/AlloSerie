const fs = require('fs');
const frisby = require('frisby');
const path = require('path');
const Joi = frisby.Joi;
const dal = require('../../src/server/dal');

const URL = `http://localhost:${process.env.SERVER_PORT}/api/episodes`;
const EPISODE_TYPE = "episode";
const LOGO_TYPE = "logo";
const EPISODE_DATA_DIR = path.join(process.env.DATA, EPISODE_TYPE);
const LOGO_DATA_DIR = path.join(process.env.DATA, LOGO_TYPE);

function createFakeEpisode(done) {
  Promise.all([
    dal.insert(
      {
        id: "1111-2222",
        name: "Breaking Bad",
        code: "S01E01",
        logo: "1234-5678",
        synopsis: "Résumé",
        score: 8
      },
      EPISODE_TYPE
    ),
    dal.insert(
      {
        id: "1111-3333",
        name: "Lethal Weapon",
        code: "S01E01",
        logo: "5678-1234",
        synopsis: "Résumé",
        score: 7
      },
      EPISODE_TYPE
    )
  ])
    .then(() => {
      done();
    });
}

function createFakeLogos(done) {
  Promise.all([
    dal.insert(
      {id: "1234-5678", image64: "IMAGE-64-1"},
      LOGO_TYPE
    ),
    dal.insert(
      {id: "5678-1234", image64: "IMAGE-64-2"},
      LOGO_TYPE
    )
  ])
    .then(() => {
      done();
    });
}

function deleteFakeDatas(done, dirName) {
  fs.readdir(dirName, (err, files) => {
    if (err) {
      done();
      throw err
    }
    for (const file of files) {
      if (file !== '.gitkeep') {
        fs.unlink(path.join(dirName, file), err => {
          if (err) {
            done();
            throw err
          }
        });
        done();
      }
    }
  });
}

describe('Add an episode', () => {

  beforeAll((done) => {
    createFakeEpisode(done)
  });

  afterAll((done) => {
    deleteFakeDatas(done, EPISODE_DATA_DIR);
  });

  let id;

  it('should make an HTTP request', (done) => {
    frisby.post(`${URL}/`, {
      name: "Blindspot",
      code: "S03E02",
      logo: "1234-5678",
      synopsis: "Résumé",
      score: 5
    })
      .expect('status', 201)
      .expect('jsonTypes', {
        'id': Joi.string().required(),
        'name': Joi.string().required(),
        'code': Joi.string().required(),
        'logo': Joi.string().required(),
        'synopsis': Joi.string().required(),
        'score': Joi.number().required()
      })
      .then(response => id = response.json.id)
      .done(done);
  });

  it('should have file in data', (done) => {
    fs.stat(path.join(EPISODE_DATA_DIR, `episode.${id}.json`), (err, stats) => {
      if (err || !stats.isFile()) {
        fail();
      }
      done();
    });
  });
});

describe('Get all episodes', () => {

  beforeAll((done) => {
    createFakeEpisode(done);
  });

  afterAll((done) => {
    deleteFakeDatas(done, EPISODE_DATA_DIR);
  });

  it('should make an HTTP request', (done) => {
    frisby.get(`${URL}/`)
      .expect('status', 200)
      .expect('jsonTypes', '*', {
        'id': Joi.string().required(),
        'name': Joi.string().required(),
        'code': Joi.string().required(),
        'logo': Joi.string().required(),
        'synopsis': Joi.string().required(),
        'score': Joi.number().required()
      })
      .done(done);
  });
});

describe('Get an episode', () => {

  beforeAll((done) => {
    createFakeEpisode(done);
  });

  afterAll((done) => {
    deleteFakeDatas(done, EPISODE_DATA_DIR);
  });

  it('should make an HTTP request', (done) => {
    frisby.get(`${URL}/1111-2222`)
      .expect('status', 200)
      .expect('jsonTypes', {
        'id': Joi.string().required(),
        'name': Joi.string().required(),
        'code': Joi.string().required(),
        'logo': Joi.string().required(),
        'synopsis': Joi.string().required(),
        'score': Joi.number().required()
      })
      .done(done);
  });
});

describe('Delete an episode', () => {

  beforeAll((done) => {
    createFakeEpisode(done);
  });

  afterAll((done) => {
    deleteFakeDatas(done, EPISODE_DATA_DIR);
  });

  let id = "1111-2222";

  it('should make an HTTP request', (done) => {
    frisby.del(`${URL}/${id}`)
      .expect('status', 204)
      .done(done);
  });

  it('should not have the file in data', (done) => {
    fs.stat(path.join(EPISODE_DATA_DIR, `episode.${id}.json`), (error) => {
      if (error.code !== 'ENOENT') {
        fail();
      }
      done();
    });
  });
});

describe('Update an episode', () => {

  beforeAll((done) => {
    createFakeEpisode(done);
  });

  afterAll((done) => {
    deleteFakeDatas(done, EPISODE_DATA_DIR);
  });

  it('should make an HTTP request', (done) => {
    frisby.put(`${URL}/1111-2222`, {
      name: "expectedName",
      code: "expectedCode",
      logo: "expectedLogo",
      synopsis: "expectedSynopsis",
      score: 42
    })
      .expect('status', 200)
      .expect('jsonTypes', {
        'id': Joi.string().required(),
        'name': Joi.string().required(),
        'code': Joi.string().required(),
        'logo': Joi.string().required(),
        'synopsis': Joi.string().required(),
        'score': Joi.number().required()
      })
      .then((response) => {
        expect(response.json.name).toBe("expectedName");
        expect(response.json.code).toBe("expectedCode");
        expect(response.json.logo).toBe("expectedLogo");
        expect(response.json.synopsis).toBe("expectedSynopsis");
        expect(response.json.score).toBe(42);
      })
      .done(done);
  });
});
