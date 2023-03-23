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
  const men = century !== undefined
    ? people.filter((man) => {
      const personIsMan = man.sex === 'm';
      const diedInCurrentCentury = Math.ceil(man.died / 100) === century;

      return personIsMan && diedInCurrentCentury;
    })
    : people.filter((man) => {
      const personIsMan = man.sex === 'm';

      return personIsMan;
    });

  const averageAges = men.reduce((sum, man) => (
    sum + man.died - man.born
  ), 0) / men.length;

  return averageAges;
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
    ? people.filter((woman) => {
      const womanHasChild = people
        .some((child) => child.mother === woman.name);

      return womanHasChild;
    })
    : people.filter((woman) => {
      const personIsWoman = woman.sex === 'f';

      return personIsWoman;
    });

  const averageAges = women.reduce((sum, woman) => (
    sum + woman.died - woman.born
  ), 0) / women.length;

  return averageAges;
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
  const children = onlyWithSon
    ? people.filter((child) => {
      const motherExistsInArray = people
        .some((woman) => woman.name === child.mother);
      const childIsSon = child.sex === 'm';

      return childIsSon && motherExistsInArray;
    })
    : people.filter((child) => {
      const motherExistsInArray = people
        .some((woman) => woman.name === child.mother);

      return motherExistsInArray;
    });

  const averageAges = children.reduce((sum, child) => {
    const mother = people.find(woman => woman.name === child.mother);

    return sum + child.born - mother.born;
  }, 0) / children.length;

  return averageAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
