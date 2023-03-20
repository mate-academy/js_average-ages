'use strict';

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(el => el.sex === 'm'
      && Math.ceil(el.died / 100) === century)
    : people.filter(el => el.sex === 'm');

  const menSumAge = men.reduce((acc, el) => acc + el.died - el.born, 0);

  return Number((menSumAge / men.length).toFixed(2));
}

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(el => el.sex === 'f'
      && people.some(potentialKiddo => potentialKiddo.mother === el.name))
    : people.filter(el => el.sex === 'f');

  const womenSumAge = women.reduce((acc, el) => acc + el.died - el.born, 0);

  return Number((womenSumAge / women.length).toFixed(2));
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const kiddos = onlyWithSon
    ? people.filter(el =>
      people.some(potentialMother => potentialMother.name === el.mother
        && el.sex === 'm'
      ))
    : people.filter(el =>
      people.some(potentialMother => potentialMother.name === el.mother)
    );

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
