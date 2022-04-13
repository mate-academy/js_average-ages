'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(
    man => man.sex === 'm'
    && (!century || Math.ceil(man.died / 100) === century)
  );

  return men.reduce(
    (previus, man) => (man.died - man.born) + previus, 0) / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(woman =>
    woman.sex === 'f'
    && (!withChildren || people.find(child => child.mother === woman.name)
    )
  );

  return women.reduce(
    (previus, woman) => (woman.died - woman.born) + previus, 0) / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const validPeoples = people.filter(
    person => people.some(mother => person.mother === mother.name)
            && (!onlyWithSon || person.sex === 'm')
  );

  const diff = validPeoples.map(child => (child.born - people.find(
    mother => mother.name === child.mother).born)).reduce((a, b) => (a + b), 0);

  return diff / validPeoples.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
