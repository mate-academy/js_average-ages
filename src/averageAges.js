'use strict';

function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter(man => man.sex === 'm'
    && (!century || Math.ceil(man.died / 100) === century)
  );

  return filteredMen.reduce((acc, manAge) => (
    acc + manAge.died - manAge.born
  ), 0) / filteredMen.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(woman => woman.sex === 'f'
    && (!withChildren || people.some(person => person.mother === woman.name))
  );

  return filteredWomen.reduce((acc, womanAge) => (
    acc + womanAge.died - womanAge.born
  ), 0) / filteredWomen.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => people.find(mother =>
    child.mother === mother.name) && (!onlyWithSon || child.sex === 'm')
  );

  const ageDifference = children.reduce((acc, child) => {
    const mothers = people.find(mother => mother.name === child.mother);

    return acc + child.born - mothers.born;
  }, 0);

  return ageDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
