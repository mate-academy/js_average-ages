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
function countSummOfAges(people) {
  return people.reduce((accum, { died, born }) => {
    const age = died - born;

    return accum + age;
  }, 0);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const manArr = people
    .filter(({ died, sex }) => {
      const isCenturyCorrect = century
        ? Math.ceil(died / 100) === century
        : true;

      return sex === 'm' && isCenturyCorrect;
    });

  const sumOfAges = countSummOfAges(manArr);

  return sumOfAges / manArr.length;
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
  const isWoman = people.filter(({ name, sex }) => {
    const hasChildren = withChildren
      ? people.some(({ mother }) => mother === name)
      : true;

    return sex === 'f' && hasChildren;
  });

  const sumOfAges = countSummOfAges(isWoman);

  return sumOfAges / isWoman.length;
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
  const onlyWomen = people.filter(({ sex }) => sex === 'f');
  const children = people.filter(({ mother, sex }) => {
    const checkMother = onlyWomen.some(women => mother === women.name);
    const son = sex === 'm';

    return onlyWithSon ? checkMother && son : checkMother;
  }
  );

  const averageAges = children.reduce((acc, { born, mother }) => {
    const isMother = onlyWomen.find((women) => mother === women.name);

    return mother ? acc + (born - isMother.born) : 0;
  }, 0);

  return averageAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
