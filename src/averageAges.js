'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    person.sex === 'm' && (!century || Math.ceil(person.died
      / 100) === century));
  const totalAge = men.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  return totalAge / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    person.sex === 'f' && (!withChildren
       || people.some(child => child.mother === person.name)));
  const totalAge = women.reduce((sum, woman) => sum
   + (woman.died - woman.born), 0);

  return totalAge / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => (!onlyWithSon
     || person.sex === 'm') && people.some(woman =>
    woman.name === person.mother));
  const totalAgeDiff = children.reduce((sum, child) => {
    const mother = people.find(woman => woman.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0);

  return totalAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
