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

const sexMale = 'm';
const sexFemale = 'f';

function calculateAge(array) {
  return array.reduce((acc, person) => {
    const age = person.died - person.born;

    return acc + age;
  }, 0) / array.length;
}

function calculateMenAverageAge(people, century) {
  const filterMen = century
    ? people.filter(person => person.sex === sexMale
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === sexMale);

  const totalAge = calculateAge(filterMen);

  return totalAge;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const womenWithChild = people.filter(person =>
    person.sex === sexFemale && people.some(perso =>
      perso.mother === person.name)
  );
  const women = people.filter(person => person.sex === sexFemale);

  return withChildren
    ? calculateAge(womenWithChild)
    : calculateAge(women);
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
  const childrenWithMothers = people.filter(child => {
    return onlyWithSon
      ? people.find(woman =>
        child.sex === sexMale && child.mother === woman.name)
      : people.find(woman => child.mother === woman.name);
  });

  const ageDiffBetween = childrenWithMothers.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const sumAgeDiffBetween = ageDiffBetween.reduce((sum, ageDiff) =>
    sum + ageDiff, 0);
  const averageAgeDifference = sumAgeDiffBetween / ageDiffBetween.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
