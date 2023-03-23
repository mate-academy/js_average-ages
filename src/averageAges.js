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
  const manArr = people
    .filter((person) => {
      const check = century
        ? ((Math.ceil(person.died / 100)) === century)
        : true;

      return person.sex === 'm' && check;
    });

  const sumOfAges = manArr.reduce((accum, person) => {
    const age = person.died - person.born;

    return accum + age;
  }, 0);

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
  const womanArr = people.filter((person) => {
    const check = withChildren
      ? people.some(children => children.mother === person.name)
      : true;

    return person.sex === 'f' && check;
  });

  const sumOfAges = womanArr.reduce((accum, person) => {
    const age = person.died - person.born;

    return accum + age;
  }, 0);

  return sumOfAges / womanArr.length;
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
  const onlyWomen = people.filter(person => person.sex === 'f');
  const children = people.filter(child => {
    const checkMother = onlyWomen.some(women => child.mother === women.name);
    const son = child.sex === 'm';

    return onlyWithSon ? checkMother && son : checkMother;
  }
  );

  const averageAges = children.reduce((acc, child) => {
    const mother = onlyWomen.find((women) => child.mother === women.name);

    return mother ? acc + (child.born - mother.born) : 0;
  }, 0);

  return averageAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
