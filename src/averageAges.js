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
  const children = people.filter(
    child => people.find(mother =>
      child.mother === mother.name)
        && (!onlyWithSon || child.sex === 'm')
  );

  const searchMother = name =>
    people.find(mother => name === mother.name
    );

  return children.reduce(
    (acc, child) =>
      acc + child.born - searchMother(child.mother).born, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
