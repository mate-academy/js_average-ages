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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter((person) => person.sex === 'm');
  let lifeOfAges;

  switch (typeof century) {
    case 'number':
      lifeOfAges = men.map((man) => {
        return Math.ceil(man.died / 100) === century
          ? man.died - man.born
          : false;
      });

      lifeOfAges = lifeOfAges.filter((age) => age !== false);
      break;

    case 'undefined':
      lifeOfAges = men.map((man) => man.died - man.born);
      break;
  }

  const averageAges
    = lifeOfAges.reduce((sumOfAges, ages) => sumOfAges + ages)
    / lifeOfAges.length;

  return averageAges;
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
  // write code here
  const female = people.filter((person) => person.sex === 'f');
  const women = withChildren
    ? female.filter((person) =>
      people.find((somebody) => somebody.mother === person.name)
    )
    : female;

  const ages = women.map((woman) => woman.died - woman.born);

  return ages.reduce((sumOfAges, age) => sumOfAges + age) / ages.length;
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
  // write code here
  let children = people.filter(
    (child) =>
      child.mother && people.find((person) => person.name === child.mother)
  );

  children = onlyWithSon
    ? children.filter((child) => child.sex === 'm')
    : children;

  return (
    children.reduce(
      (prev, curr) =>
        prev
        + curr.born
        - people.find((person) => person.name === curr.mother).born,
      0
    ) / children.length
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
