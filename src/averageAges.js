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

  let count = 0;

  const sumAges = people.reduce((acc, { sex, born, died }) => {
    let curAge = 0;

    if (!century && sex === 'm') {
      count++;
      curAge = died - born;
    }

    if (century && sex === 'm' && (Math.ceil(died / 100) === century)) {
      count++;
      curAge = died - born;
    }

    return acc + curAge;
  }, 0);

  return sumAges / count;
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
  const women = people.filter(person => withChildren
    ? people.find(child => child.mother === person.name)
    && person.sex === 'f'
    : person.sex === 'f');

  const age = women.map(person =>
    person.died - person.born);

  return age.reduce((prev, acc) => acc + prev) / age.length;
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
  const arr = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const children = arr.filter(person =>
    people.some(mother => mother.name === person.mother)
  );

  const pairs = children.map(child =>
    [child, people.find(mother => mother.name === child.mother)]
  );

  const sum = pairs.reduce((diff, x) => diff + x[0].born - x[1].born, 0);
  const result = sum / pairs.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
