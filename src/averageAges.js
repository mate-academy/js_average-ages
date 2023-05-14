'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menLifespans = men
    .filter(person => !century || Math.ceil(person.died / 100) === century)
    .map(person => person.died - person.born);
  const averageMenLifespan = calculateAverageLifespan(menLifespans);

  return averageMenLifespan;
}

function calculateAverageLifespan(lifespans) {
  const totalLifespan = lifespans.reduce((sum, lifespan) => sum + lifespan, 0);
  const averageLifespan = totalLifespan / lifespans.length;

  return averageLifespan;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');

  const womenLifespans = women.reduce((totalWomenLifespan, woman) =>
    (withChildren ? people.some(person => person.mother === woman.name) : true)
      ? (totalWomenLifespan.push(woman.died - woman.born), totalWomenLifespan)
      : totalWomenLifespan,
  []);

  const averageWomenLifespan = calculateAverageLifespan(womenLifespans);

  return averageWomenLifespan;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenWithMother = [];

  people.filter(person => person.mother && (!onlyWithSon
    || (onlyWithSon && person.sex === 'm'))).forEach(person => {
    const mother = people.find(m => m.name === person.mother && m.sex === 'f');

    mother && childrenWithMother.push({
      child: person, mother,
    });
  });

  const ageDifferences = childrenWithMother.map(
    ({ child, mother }) => child.born - mother.born);

  return ageDifferences.length > 0
    ? ageDifferences.reduce(
      (sum, diff) => sum + diff, 0) / ageDifferences.length : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
