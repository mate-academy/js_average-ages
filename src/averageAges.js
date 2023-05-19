'use strict';

const calculateAverageAge = (persons) => (
  persons.reduce((sumAges, person) => (
    sumAges + person.died - person.born
  ), 0) / persons.length);

function calculateMenAverageAge(people, century) {
  const men = people.filter(man => man.sex === 'm');
  const diedInCentury = person => Math.ceil(person.died / 100) === century;

  return !century
    ? calculateAverageAge(men)
    : calculateAverageAge(men.filter(diedInCentury));
};

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(woman => woman.sex === 'f');
  const mothers = people.filter(mother => (
    people.some(child => child.mother === mother.name)
  ));

  return !withChildren
    ? calculateAverageAge(women)
    : calculateAverageAge(mothers);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => (
    people.some(lady => child.mother === lady.name)
  ));
  const sons = children.filter(child => child.sex === 'm');

  const findAgeDiff = childrenArr => childrenArr.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  }
  );

  return !onlyWithSon
    ? findAgeDiff(children).reduce((acc, diff) => acc + diff) / children.length
    : findAgeDiff(sons).reduce((acc, diff) => acc + diff) / sons.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
