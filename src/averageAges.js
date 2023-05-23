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
  const men = (arguments.length > 1)
    ? people.filter(obj =>
      ((Math.ceil(obj.died / 100) === century)) && (obj.sex === 'm'))
    : people.filter(obj => obj.sex === 'm');
  const age = men.map(obj => obj.died - obj.born);
  const sum = age.reduce((a, b) => a + b, 0);

  return sum / men.length;

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
  // write code here
  let women = people.filter(obj => obj.sex === 'f');

  if (arguments.length > 1) {
    women = women.filter((obj) => {
      return people.some((elem) => elem.mother === obj.name);
    });
  };

  const age = women.map(obj => obj.died - obj.born);
  const sum = age.reduce((a, b) => a + b, 0);

  return sum / women.length;
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
  const result = [];
  let sum = 0;

  if (arguments.length > 1) {
    people.forEach((elem) => {
      for (const elem2 of people) {
        if ((elem.name === elem2.mother) && (elem2.sex === 'm')) {
          result.push({
            mother: elem,
            kid: elem2,
          });
        }
      }
    });
  } else {
    people.forEach((elem) => {
      for (const elem2 of people) {
        if (elem.name === elem2.mother) {
          result.push({
            mother: elem,
            kid: elem2,
          });
        }
      }
    });
  }

  for (let i = 0; i < result.length; i++) {
    sum += result[i].kid.born - result[i].mother.born;
  };

  return sum / result.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
