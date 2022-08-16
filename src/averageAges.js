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
  const men = century
    ? people
      .filter(person => person.sex === 'm'
        && Math.ceil(person.died / 100) === century)
    : people.filter((person) => person.sex === 'm');

  const ageM = men.map(person => person.died - person.born);
  const ageSum = ageM.reduce((sum, age) => sum + age, 0);

  return ageSum / ageM.length;

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
  const women = withChildren
    ? people.filter(woman => people.some(child => child.mother === woman.name))
    : people.filter((person) => person.sex === 'f');

  const ageW = women.map(person => person.died - person.born);
  const ageSum = ageW.reduce((sum, age) => sum + age, 0);

  return ageSum / ageW.length;
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
  const children = people.filter(child => (onlyWithSon)
    ? people.some(mother => mother.name === child.mother && child.sex === 'm')
    : people.some(mother => mother.name === child.mother));

  const years = children.map((child) => {
    const mom = people.find(mother => child.mother === mother.name);

    return child.born - mom.born;
  });

  const sum = years.reduce((prev, age) => prev + age, 0);

  return sum / children.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
