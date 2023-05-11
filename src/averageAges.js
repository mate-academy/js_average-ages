'use strict';

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
     && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const menAges = men.map(person => person.died - person.born);
  const sumOfAges = menAges.reduce((sum, age) => sum + age, 0);
  const avarageAge = sumOfAges / menAges.length;

  return avarageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const woman = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const womanAges = woman.map(person => person.died - person.born);
  const sumOfAges = womanAges.reduce((sum, age) => sum + age, 0);
  const avarageAge = sumOfAges / womanAges.length;

  return avarageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.some(mother => mother.name === child.mother)
    : people.some(mother => mother.name === child.mother));

  const avarageAgeDiff = children.reduce((sum, child) => {
    const mother = people.find(woman => woman.name === child.mother);

    return sum + ((child.born - mother.born));
  }, 0) / children.length;

  return Math.round(avarageAgeDiff * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
