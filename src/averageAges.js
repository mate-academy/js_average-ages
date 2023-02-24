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
  const men = (century !== undefined)
    ? people.filter(man => Math.ceil(man.died / 100)
    === century && man.sex === 'm')
    : people.filter(man => man.sex === 'm');

  const newMen = men.map((item) => {
    item.age = item.died - item.born;

    return item.age;
  });

  const average = newMen.reduce((total, amount) =>
    total + amount, 0) / newMen.length;
  const result = average.toFixed(2);

  return Number(result);
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
  const women = people.filter(woman => woman.sex === 'f');
  const mothers = withChildren ? women.filter(woman =>
    people.some(person => person.mother === woman.name)) : women;

  const newWomen = mothers.map((item) => {
    item.age = item.died - item.born;

    return item.age;
  });
  const average = newWomen.reduce((total, amount) =>
    total + amount) / newWomen.length;
  const result = average.toFixed(2);

  return Number(result);
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
  const motherAgeDiffs = people.reduce((acc, person) =>
    onlyWithSon && person.sex !== 'm' ? acc
      : !people.find(p => p.name === person.mother) ? acc
        : (acc.push(person.born - people.find(p =>
          p.name === person.mother).born), acc), []);

  const averageAgeDiff = motherAgeDiffs.reduce((total, ageDiff) =>
    total + ageDiff, 0) / motherAgeDiffs.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
