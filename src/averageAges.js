'use strict';

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(el => {
      const isMan = el.sex === 'm';
      const fitCentury = Math.ceil(el.died / 100) === century;

      return isMan && fitCentury;
    })
    : people.filter(el => el.sex === 'm');

  const menSumAge = men.reduce((acc, el) => acc + el.died - el.born, 0);

  return Number((menSumAge / men.length).toFixed(2));
}

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(el => {
      const isWoman = el.sex === 'f';
      const hasChild = people.some(potentKid => potentKid.mother === el.name);

      return isWoman && hasChild;
    })
    : people.filter(el => el.sex === 'f');

  const womenSumAge = women.reduce((acc, el) => acc + el.died - el.born, 0);

  return Number((womenSumAge / women.length).toFixed(2));
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const kiddos = onlyWithSon
    ? people.filter(el => {
      const isChild = people.some(potentMom => potentMom.name === el.mother);
      const isMan = el.sex === 'm';

      return isChild && isMan;
    })
    : people.filter(el => (
      people.some(potentialMother => potentialMother.name === el.mother)
    ));

  const kidsMomsAgeDifference = kiddos.reduce((acc, el) => {
    const mother = people.find(woman => woman.name === el.mother);
    const ageDifference = el.born - mother.born;

    return acc + ageDifference;
  }, 0);

  return Number((kidsMomsAgeDifference / kiddos.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
