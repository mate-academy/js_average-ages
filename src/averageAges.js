'use strict';

const getBySex = (sex, people) => {
  return people.filter(person => person.sex === sex);
};

const calculateAverageAge = (people) => {
  const averageAge = people.reduce((age, person) =>
    age + person.died - person.born, 0) / people.length;

  return averageAge;
};

function calculateMenAverageAge(people, century) {
  let men = getBySex('m', people);

  men = !century
    ? men
    : men.filter(person => Math.ceil(person.died / 100) === century);

  return calculateAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  let women = getBySex('f', people);

  women = !withChildren
    ? women
    : women.filter(person => people.some(child =>
      child.mother === person.name));

  return calculateAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = !onlyWithSon
    ? people.filter(child => people.some(mum => mum.name === child.mother))
    : people.filter(child =>
      people.some(person =>
        person.name === child.mother) && child.sex === 'm');

  const diffAges = children.map(child => {
    const mother = people.find(mum => mum.name === child.mother);

    return child.born - mother.born;
  });

  const averageAgeDiff = diffAges.reduce((sum, item) =>
    sum + item, 0) / diffAges.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
