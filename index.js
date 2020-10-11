const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

// morgan expects a format string, so we need to stringify object, otherwise
// toString() will be called implicitly and we'll get "[object Object]"
morgan.token('data', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
];

app.get('/', (request, response) => {
  response.send('<h1>Phonebook part3</h1>');
});

app.get('/info', (request, response) => {
  const time = new Date().toLocaleString();
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${time}</p>
  `);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(p => p.id == id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter(p => p.id != id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const newID = Math.floor(Math.random() * 1e6);

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

  if (persons.findIndex(p => p.name === body.name) != -1) {
    return response.status(400).json({
      error: 'contact already exists'
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: newID
  };
  
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});