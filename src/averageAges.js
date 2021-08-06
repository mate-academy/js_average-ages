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
  const men = century
    ? people.filter((human) =>
      human.sex === 'm' && (Math.ceil(human.died / 100) === century)
    )
    : people.filter(human => human.sex === 'm');

  const sumOfAges = men.reduce(
    (sum, man) => sum + (man.died - man.born), 0
  );

  return sumOfAges / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = withChildren
    ? people.filter((human) =>
      human.sex === 'f' && people.some(child => child.mother === human.name)
    )
    : people.filter(human => human.sex === 'f');

  const sumOfAges = women.reduce(
    (sum, woman) => sum + (woman.died - woman.born), 0
  );

  return sumOfAges / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const kids = onlyWithSon
    ? people.filter(
      ({ sex, mother }) => sex === 'm'
      && people.some(({ name }) => name === mother)
    )
    : people.filter(
      ({ mother }) => people.some(({ name }) => name === mother)
    );

  kids.map(child => {
    const mother = people.find(
      ({ name }) => name === child.mother
    );

    child.motherAgeInBirth = child.born - mother.born;

    return child;
  });

  const sumOfAges = kids.reduce(
    (sum, { motherAgeInBirth }) => sum + motherAgeInBirth, 0
  );

  return sumOfAges / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
