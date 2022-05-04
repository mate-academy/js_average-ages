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
  // const men = people.filter((a) => a.sex === 'm');
  const men = century
    ? people.filter((man) => {
      const centuryDied = Math.ceil(man.died / 100);

      return man.sex === 'm' && centuryDied === century;
    })
    : people.filter((person) => {
      return person.sex === 'm';
    });

  const sumOfAges = men.reduce((count, man) => {
    const year = man.died - man.born;

    return count + year;
  }, 0);

  return sumOfAges / men.length;
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
      const haveChildren = people.some(person => person.mother === woman.name);

      return woman.sex === 'f' && haveChildren;
    })

    : people.filter((person) => {
      return person.sex === 'f';
    });

  const sumOfAges = women.reduce((count, man) => {
    const year = man.died - man.born;

    return count + year;
  }, 0);

  return sumOfAges / women.length;
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
    ? people.filter(person => {
      const haveMother = people.some((mother) => mother.name === person.mother);
      const isSon = person.sex === 'm';

      return haveMother && isSon;
    })
    : people.filter(person => {
      const haveMother = people.some((mother) => mother.name === person.mother);

      return haveMother;
    });

  const sumOfDifference = children.reduce((sum, child) => {
    const mother = people.find((person) => person.name === child.mother);

    const difference = child.born - mother.born;

    return sum + difference;
  }, 0);

  return sumOfDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
