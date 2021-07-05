'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    const deathCentury = Math.ceil(person.died / 100);
    const isMan = person.sex === 'm';

    return century ? isMan && century === deathCentury : isMan;
  });

  return men.map(man => man.died - man.born)
    .reduce((age, nextAge) => age + nextAge) / men.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => {
    const isMother = people.some(child => child.mother === person.name);
    const isFemale = person.sex === 'f';

    return withChildren ? isMother && isFemale : isFemale;
  });

  return women.map(woman => woman.died - woman.born)
    .reduce((age, nextAge) => age + nextAge) / women.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => {
    const child = people
      .find(potentialChild => potentialChild.name === person.mother);

    return onlyWithSon ? child && person.sex === 'm' : child;
  });

  return children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  }).reduce((age, nextAge) => age + nextAge) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
