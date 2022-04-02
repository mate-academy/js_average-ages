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

function calcAverageAge(peopleArray) {
  const ages = peopleArray.map(person => person.died - person.born);
  const sumAge = ages.reduce((prev, age) => prev + age, 0);

  return sumAge / peopleArray.length;
};

function calculateMenAverageAge(people, century) {
  const foundMen = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return calcAverageAge(foundMen);

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
  const foundWomen = withChildren
    ? people.filter(person => person.sex === 'f'
        && people.find((child) => person.name === child.mother))
    : people.filter(person => person.sex === 'f');

  return calcAverageAge(foundWomen);
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
  const dobDifferences = [];

  people.filter(child => {
    return people.find(mother => {
      return onlyWithSon
        ? mother.name === child.mother && child.sex === 'm'
          ? dobDifferences.push(child.born - mother.born)
          : false
        : mother.name === child.mother
          ? dobDifferences.push(child.born - mother.born)
          : false;
    });
  });

  const averageAge = dobDifferences.reduce((prev, date) => prev + date, 0)
   / dobDifferences.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
