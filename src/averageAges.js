'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filterPerson = people.filter(person => {
    const checkCentury = century ? Math.ceil(person.died / 100) === century
      : true;

    return person.sex === 'm' && checkCentury;
  });
  const countAge = filterPerson
    .reduce((acc, person) => acc + (person.died - person.born), 0);

  return countAge / filterPerson.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(person => person.mother);
  const filterPerson = people.filter(person => {
    const findMoms = mothers.includes(person.name);

    return withChildren ? findMoms : person.sex === 'f';
  });

  const countAge = filterPerson.reduce((acc, person) =>
    acc + (person.died - person.born), 0);

  return countAge / filterPerson.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const momsAndKidsBorn = {};
  const differentAge = [];

  people
    .filter((persone) => onlyWithSon ? persone.sex === 'm' : true)
    .forEach(persone => {
      momsAndKidsBorn[persone.mother] = momsAndKidsBorn[persone.mother]
        ? [...momsAndKidsBorn[persone.mother], persone.born]
        : [persone.born];
    });

  people
    .filter((mom) => momsAndKidsBorn[mom.name])
    .forEach(mom => {
      momsAndKidsBorn[mom.name]
        .forEach(kidBorn => differentAge
          .push(kidBorn - mom.born));
    });

  const countDiffAge = differentAge.reduce((acc, age) => acc + age, 0);

  return countDiffAge / differentAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
