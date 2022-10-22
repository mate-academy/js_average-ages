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
  const mens = people.filter((person) => (person.sex === 'm'));
  let newpeople = mens;

  if (century) {
    newpeople = mens.filter(
      (person) => Math.ceil(person.died / 100) === century
    );
  }

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
  let womArr = people.filter((person) => (person.sex === 'f'));

  if (withChildren) {
    womArr = people.filter(
      woman => people.some(child => woman.name === child.mother));
  }

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
  let kids = people.filter(
    baby => people.find(moma => moma.name === baby.mother));

  if (onlyWithSon) {
    kids = kids.filter((person) => (person.sex === 'm'));
  }

  const sumAge = kids.reduce((acc, kid) => {
    const mother = people.find(mom => mom.name === kid.mother);

    const diff = kid.born - mother.born;

    return acc + diff;
  }, 0);

  return sumAge / (kids.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
