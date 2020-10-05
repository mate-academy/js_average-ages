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
  const ages = [];
  const menList = people.filter(({ sex, died }) => sex === 'm');

  if (century) {
    const averAgeOfMansArray = menList
      .filter(({ died }) => Math.ceil(died / 100) === century);

    averAgeOfMansArray.forEach(({ born, died }) => ages.push(died - born));
  } else {
    menList.forEach(({ born, died }) => ages.push(died - born));
  }

  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women;

  if (withChildren !== undefined) {
    // eslint-disable-next-line max-len
    women = people.filter(person => person.sex === 'f' && people.some(human => human.mother === person.name));
  } else {
    women = people.filter(person => person.sex === 'f');
  }

  const totalAge = women.reduce((sum, cur) => sum + (cur.died - cur.born), 0);

  return totalAge / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => !onlyWithSon
    ? people.find(mother => person.mother === mother.name)
    : people.find(mother => person.mother === mother.name && person.sex === 'm')
  );

  const totalAgesDifferences = children.map(person => person.born
    - people.find(mother => person.mother === mother.name).born);
    // eslint-disable-next-line max-len
  const totalAgesDifferencesSum = totalAgesDifferences.reduce((a, b) => a + b, 0);

  return totalAgesDifferencesSum / totalAgesDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
