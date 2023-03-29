'use strict';

function calculateAverageAge(people, filterFunction) {
  const filteredPeople = filterFunction
    ? people.filter(filterFunction)
    : people;

  const total = filteredPeople.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0);

  const result = total / filteredPeople.length;

  return result;
}

function calculateMenAverageAge(people, century) {
  const filterFunction = (person) => person.sex === 'm';

  if (century) {
    const centuryFilterFunction = (year) =>
      Math.ceil(year.died / 100) === century;

    return calculateAverageAge(people, (a) =>
      filterFunction(a) && centuryFilterFunction(a));
  }

  return calculateAverageAge(people, filterFunction);
};

function calculateWomenAverageAge(people, withChildren) {
  const filterFunction = (person) => person.sex === 'f';

  if (withChildren) {
    const childrenFilterFunction = (human) =>
      people.some((motherPerson) => motherPerson.mother === human.name);

    return calculateAverageAge(people, (a) =>
      filterFunction(a) && childrenFilterFunction(a));
  }

  return calculateAverageAge(people, filterFunction);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const ageDiffs = filteredPeople.map(person => {
    const mother = people.find(motherPerson =>
      motherPerson.name === person.mother);

    if (!mother) {
      return null;
    };

    return person.born - mother.born;
  }).filter(ageDifference => ageDifference !== null);

  if (ageDiffs.length === 0) {
    return null;
  };

  const sum = ageDiffs.reduce((acc, curr) => acc + curr, 0);
  const result = sum / ageDiffs.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
