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
const MEN = 'm';
const WOMEN = 'f';

function calculateMenAverageAge(people, century) {
  const currentPeople = people.filter((man) => man.sex === MEN
  && (century === undefined || Math.ceil(man.died / 100) === century));
  const peopleAge = currentPeople.map((man) => man.died - man.born);

  return calculateAverage(peopleAge);
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
  const mothers = withChildren !== undefined
    ? people.filter(person => people.some(p => p.mother === person.name)
    && person.sex === WOMEN)
    : people.filter(person => person.sex === WOMEN);

  const womensAge = mothers.map(women => women.died - women.born);

  return calculateAverage(womensAge);
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
  const mothers = onlyWithSon !== undefined
    ? people.filter(person => people.some(p => person.mother === p.name)
    && person.sex === MEN)
    : people.filter(person => people.some(p => person.mother === p.name));

  const mothersAndChildDiff = mothers.map(child => {
    const mother = people.find(person => person.name === child.mother);

    if (mother) {
      return child.born - mother.born;
    }
  });

  return calculateAverage(mothersAndChildDiff);
}

function calculateAverage(array) {
  const sum = array.reduce((acc, current) => acc + current);

  return sum / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
