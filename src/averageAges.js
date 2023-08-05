'use strict';

const totalAge = (array) => {
  return array.reduce(
    (acc, per) => acc + (per.died - per.born), 0);
};

const conditionCheck = (firstCondition, secondCondition) => {
  return firstCondition === secondCondition;
};

function calculateMenAverageAge(people, century) {
  const newPeople = century ? people.filter(
    person => conditionCheck(person.sex, 'm')
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => conditionCheck(person.sex, 'm'));

  return totalAge(newPeople) / newPeople.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const woman = withChildren
    ? people.filter(person => conditionCheck(person.sex, 'f')
    && people.some(mother => conditionCheck(person.name, mother.mother)))
    : people.filter(person => conditionCheck(person.sex, 'f'));

  return totalAge(woman) / woman.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(person =>
      people.some(child => conditionCheck(child.name, person.mother))
    && conditionCheck(person.sex, 'm'))
    : people.filter(person =>
      people.some(child => conditionCheck(child.name, person.mother)));

  let motherAge = 0;

  children.forEach(person => {
    const mothers = people.find(
      mother => conditionCheck(mother.name, person.mother));

    if (mothers) {
      motherAge += person.born - mothers.born;
    }
  });

  return motherAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
