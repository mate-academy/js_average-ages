'use strict';

/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menInCentury = men.filter(man => Math.ceil(man.died / 100) === century);
  const menCalculated = century ? menInCentury : men;
  const menAge = menCalculated.map(man => man.died - man.born);

  return menAge.reduce((sum, n) => sum + n) / menAge.length;
}

/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const mothers = women.filter(woman => people
    .find(child => child.mother === woman.name));
  const womenCalculated = withChildren ? mothers : women;
  const womenAge = womenCalculated.map(woman => woman.died - woman.born);

  return womenAge.reduce((sum, n) => sum + n) / womenAge.length;
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => person.mother);
  const sons = people.filter(person => person.mother && person.sex === 'm');
  const childrenCalculated = onlyWithSon ? sons : children;

  const ageDifference = [];

  childrenCalculated.map(person => {
    const mother = people.find(mom => mom.name === person.mother);

    if (mother) {
      const diff = person.born - mother.born;

      ageDifference.push(diff);
    };
  });

  return ageDifference.reduce((sum, n) => sum + n) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
