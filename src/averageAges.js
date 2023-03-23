'use strict';

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => {
      const isMan = person.sex === 'm';
      const fitCentury = Math.ceil(person.died / 100) === century;

      return isMan && fitCentury;
    })
    : people.filter(person => person.sex === 'm');

  const menSumAge = men.reduce((acc, man) => acc + man.died - man.born, 0);

  return Number((menSumAge / men.length).toFixed(2));
}

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(person => {
      const isWoman = person.sex === 'f';
      const hasChild = people.some(kid => kid.mother === person.name);

      return isWoman && hasChild;
    })
    : people.filter(person => person.sex === 'f');

  const womenSumAge = women.reduce((acc, wom) => acc + wom.died - wom.born, 0);

  return Number((womenSumAge / women.length).toFixed(2));
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const kiddos = onlyWithSon
    ? people.filter(pers => {
      const isChild = people.some(potentMom => potentMom.name === pers.mother);
      const isMan = pers.sex === 'm';

      return isChild && isMan;
    })
    : people.filter(pers => (
      people.some(potentialMother => potentialMother.name === pers.mother)
    ));

  const getAgeDifference = kiddos.reduce((acc, kid) => {
    const mother = people.find(woman => woman.name === kid.mother);
    const ageDifference = kid.born - mother.born;

    return acc + ageDifference;
  }, 0);

  return Number((getAgeDifference / kiddos.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
