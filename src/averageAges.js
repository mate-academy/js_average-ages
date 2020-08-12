'use strict';

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');
  const menAge = men.map(person => person.died - person.born);
  const manMiddleAge = menAge.reduce((age, currentAge) =>
    age + currentAge) / menAge.length;

  return manMiddleAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.filter(person =>
    people.find(children => children.mother === person.name));
  const everyoneWoman = people.filter(person => person.sex === 'f');
  const infoWomen = withChildren ? mothers : everyoneWoman;
  const ageWoman = infoWomen.map(women => women.died - women.born)
    .reduce((sumAge, currentAge) => sumAge + currentAge);

  return ageWoman / infoWomen.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(mother =>
    people.find(children => children.mother === mother.name));

  const childrenToMother = people.filter(child =>
    mothers.find(mother => onlyWithSon
      ? child.mother === mother.name && child.sex === 'm'
      : child.mother === mother.name
    ));

  const ageDiff = childrenToMother
    .map(human => human.born - people
      .find(woman => woman.name === human.mother).born)
    .reduce((sum, age) => sum + age, 0) / childrenToMother.length;

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
