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
  const men = people.filter((person) => (person.sex === 'm'));
  let newpeople;

  century
    ? newpeople = men.filter(
      (person) => Math.ceil(person.died / 100) === century
    )
    : newpeople = men;

  const age = newpeople.map((persons) => persons.died - persons.born);

  return (age.reduce((sum, x) => (sum + x), 0)) / age.length;
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
  let womArr;

  withChildren
    ? womArr = people.filter(
      woman => people.some(child => woman.name === child.mother))
    : womArr = people.filter((person) => (person.sex === 'f'));

  const age = womArr.map((persons) => persons.died - persons.born);

  return (age.reduce((sum, x) => (sum + x), 0)) / age.length;
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
  const kids = people.filter(
    child => people.find(mom => mom.name === child.mother));
  let kidsnew;

  onlyWithSon
    ? kidsnew = kids.filter((person) => (person.sex === 'm'))
    : kidsnew = kids;

  const sumAge = kidsnew.reduce((previousValue, kid) => {
    const mother = people.find(mom => mom.name === kid.mother);

    const ageDifference = kid.born - mother.born;

    return previousValue + ageDifference;
  }, 0);

  return sumAge / (kidsnew.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
