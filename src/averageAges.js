'use strict';

const getCentury = (person) => Math.ceil(person.died / 100);
const getAges = (person) => person.died - person.born;
const ageAverage = (ages) => {
  return (ages.reduce((ageSum, age) => ageSum + age)) / ages.length;
};
const hasChild = (person, people) => {
  return people.some(child => person.name === child.mother);
};
const haveMother = (child, people) => {
  return people.some(mother => mother.name === child.mother);
};

function calculateMenAverageAge(people, century) {
  const ages = people.filter(person => person.sex === 'm')
    .filter(person => !century || getCentury(person) === century)
    .map(person => getAges(person));

  return ageAverage(ages);
}

function calculateWomenAverageAge(people, withChildren) {
  const ages = people
    .filter(person => person.sex === 'f')
    .filter(person => withChildren ? hasChild(person, people) : true)
    .map(person => getAges(person));

  return ageAverage(ages);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childWithMother = people
    .filter(child => haveMother(child, people))
    .filter(child => onlyWithSon ? child.sex === 'm' : true)
    .map(child => child.born - people
      .filter(mother => mother.name === child.mother)
      .map(mother => mother.born));

  return ageAverage(childWithMother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
