'use strict';

function getAverageAge(people) {
  return people.reduce((sum, person) => (
    sum + person.died - person.born
  ), 0) / people.length;
}

function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getPersonHasChild(woman, people) {
  return people.some(person => person.mother === woman.name);
}

function calculateAgeDiffrens(people, womenHaveChildrens) {
  const ageDiff = people.map(person => {
    const personMother = womenHaveChildrens.find(woman =>
      person.mother === woman.name
    );

    const presentInList = !personMother;

    return (presentInList) ? false : person.born - personMother.born;
  }).filter(mother => mother);

  return ageDiff.reduce((sum, a) => (sum + a)) / ageDiff.length;
}

function calculateMenAverageAge(people, century) {
  const choosenMen = (century)
    ? people.filter(person =>
      century === Math.ceil(person.died / 100) && person.sex === 'm'
    )
    : getPeopleBySex(people, 'm');

  return getAverageAge(choosenMen);
}

function calculateWomenAverageAge(people, withChildren) {
  const choosenWomen = (withChildren)
    ? people.filter(person =>
      getPersonHasChild(person, people) && person.sex === 'f'
    )
    : getPeopleBySex(people, 'f');

  return getAverageAge(choosenWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = getPeopleBySex(people, 'f');
  const men = getPeopleBySex(people, 'm');

  const womenWithChildren = (onlyWithSon)
    ? women.filter(woman => getPersonHasChild(woman, men))
    : women.filter(woman => getPersonHasChild(woman, people));

  const ageDiff = (onlyWithSon)
    ? calculateAgeDiffrens(men, womenWithChildren)
    : calculateAgeDiffrens(people, womenWithChildren);

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
