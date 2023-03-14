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

function getAverageAge(male) {
  const totalAges = male.reduce((sum, human) =>
    sum + (human.died - human.born), 0);

  return male.length > 0 ? totalAges / male.length : 0;
}

function createPeopleFilter(people, sex) {
  return people.filter((person) => person.sex === sex);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = createPeopleFilter(people, 'm');

  const menInCentury = century
    ? men.filter(person =>
      Math.ceil(person.died / 100) === century)
    : men;

  return getAverageAge(menInCentury);
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
  const women = createPeopleFilter(people, 'f');

  const mothers = withChildren
    ? women.filter(woman =>
      people.some(person => person.mother === woman.name))
    : women;

  return getAverageAge(mothers);
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
  const children = people.filter((human) => {
    const mother = people.some((woman) =>
      woman.name === human.mother);

    return mother && (!onlyWithSon || human.sex === 'm');
  });

  const difference = children.map((child) => {
    const motherObj = people.find((mom) => mom.name === child.mother);

    return child.born - motherObj.born;
  });

  const totalDiff = difference.reduce((diff, diffNext) => diff + diffNext, 0);

  return totalDiff / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
