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
const DIVIDER_FOR_CENTURY = 100;
const MALE_GENDER = 'm';
const FEMALE_GENDER = 'f';

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredMen = people.filter(({ died, sex }) =>
    (!century || Math.ceil(died / DIVIDER_FOR_CENTURY) === century)
      && sex === MALE_GENDER
  );

  const sumOfMenAges = filteredMen.reduce(sumOfAgesFunction, 0);

  return sumOfMenAges / filteredMen.length;
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
  const filteredWomen = people.filter(person =>
    (!withChildren || people.some(p => p.mother === person.name))
    && person.sex === FEMALE_GENDER
  );

  const sumOfAges = filteredWomen.reduce(sumOfAgesFunction, 0);

  return sumOfAges / filteredWomen.length;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  // }, []);
  const children = people.filter(child => {
    return people.find(woman =>
      child.mother === woman.name && (!onlyWithSon || child.sex === MALE_GENDER)
    );
  });

  const diff = children.reduce((acc, child) => {
    const mother = people.find(person => person.name === child.mother);

    return acc + (child.born - mother.born);
  }, 0);

  return diff / children.length;
}

function sumOfAgesFunction(acc, { died, born }) {
  const age = died - born;

  return acc + age;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
