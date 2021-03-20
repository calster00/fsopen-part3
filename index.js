require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

// morgan expects a format string, so we need to stringify object, otherwise
// toString() will be called implicitly and we'll get "[object Object]"
morgan.token("data", (req) => JSON.stringify(req.body));

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/", (request, response) => {
  response.send("<h1>Phonebook part3</h1>");
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const time = new Date().toLocaleString();
    response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${time}</p>
    `);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(next);
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(next);
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  const person = {
    name,
    number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch(next);
});

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;

  Person.findOne({ name }).then((existingPerson) => {
    if (existingPerson) {
      return response.status(409).send({ error: "Contact already exists" });
    } else {
      const newPerson = new Person({
        name,
        number,
      });

      newPerson
        .save()
        .then((savedPerson) => {
          console.log("added to the DB:", savedPerson);
          response.json(savedPerson);
        })
        .catch(next);
    }
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
