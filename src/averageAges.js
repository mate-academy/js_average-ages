'use strict';

const calculateAverageAge = (people) => {
  const averageAge = people.reduce((age, person) => (
    age + person.died - person.born
  ), 0) / people.length;

  return averageAge;
};

function calculateMenAverageAge(people, century) {
  const filteredMan = people.filter(person =>
    person.sex === 'm'
    && (!century || century === Math.ceil(person.died / 100)));

  return calculateAverageAge(filteredMan);
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(person =>
    person.sex === 'f'
    && (!withChildren || people.some(man => man.mother === person.name)));

  return calculateAverageAge(filteredWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => (
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  ));

  const calculateAge = children.map(person =>
    (person.born - people.find(mother => mother.name === person.mother).born));

  const averageAge = calculateAge.reduce((sum, age) =>
    sum + age) / calculateAge.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
