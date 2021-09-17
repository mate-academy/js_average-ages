'use strict';

function calculateMenAverageAge(people, century) {
  let man = [];

  (arguments.length === 1)
    ? man = people.filter((x) => x.sex === 'm').map(person =>
      person.died - person.born)
    : man = people.filter((x) => x.sex === 'm'
      && (Math.ceil(x.died / 100) === century)).map(person =>
      person.died - person.born);

  return man.reduce((sum, item) => sum + item, 0) / man.length;
}

function calculateWomenAverageAge(people, withChildren) {
  let woman = [];

  (arguments.length === 1)
    ? woman = people.filter((x) => x.sex === 'f').map(person =>
      person.died - person.born)
    : woman = people.filter((x) => x.sex === 'f'
      && people.findIndex((y) => y.mother === x.name) !== -1).map(person =>
      person.died - person.born);

  return woman.reduce((sum, item) => sum + item, 0) / woman.length;
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
