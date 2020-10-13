require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person');

// morgan expects a format string, so we need to stringify object, otherwise
// toString() will be called implicitly and we'll get "[object Object]"
morgan.token('data', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.get('/', (request, response) => {
  response.send('<h1>Phonebook part3</h1>');
});

// app.get('/info', (request, response) => {
//   const time = new Date().toLocaleString();
//   response.send(`
//     <p>Phonebook has info for ${persons.length} people</p>
//     <p>${time}</p>
//   `);
// });

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person);
  }).catch(e => {
    response.status(400).json({
      error: 'invalid id'
    })
  })
});

// app.delete('/api/persons/:id', (request, response) => {
//   const id = request.params.id;
//   persons = persons.filter(p => p.id != id);
//   response.status(204).end();
// });

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    });
  }

  // if (persons.findIndex(p => p.name === body.name) != -1) {
  //   return response.status(400).json({
  //     error: 'contact already exists'
  //   });
  // }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });
  
  newPerson.save().then(savedPerson => {
    console.log("added to the DB:", savedPerson);
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});