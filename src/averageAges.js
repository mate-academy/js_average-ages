'use strict';

function calculateMenAverageAge(people, century) {
  let man = [];

  (!century)
    ? man = people.filter((x) => x.sex === 'm')
    : man = people.filter((x) => x.sex === 'm'
      && (Math.ceil(x.died / 100) === century));

  return man
    .map(person => person.died - person.born)
    .reduce((sum, item) => sum + item, 0) / man.length;
}

function calculateWomenAverageAge(people, withChildren) {
  let woman = [];

  (!withChildren)
    ? woman = people.filter((x) => x.sex === 'f')
    : woman = people.filter((x) => x.sex === 'f'
    && people.findIndex((y) => y.mother === x.name) !== -1);

  return woman
    .map(person => person.died - person.born)
    .reduce((sum, item) => sum + item, 0) / woman.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const arrMam = people.filter(person =>
    onlyWithSon
      ? people.some(child => person.mother === child.name && person.sex === 'm')
      : people.some(child => person.mother === child.name)
  );

  const mamAge = arrMam.map(child => {
    const mam = people.find(mother => mother.name === child.mother);

    return child.born - mam.born;
  });

  return mamAge.reduce((sum, item) => sum + item, 0) / mamAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
