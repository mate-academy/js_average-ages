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
    ? people.filter(
      person => person.sex === 'm' && Math.ceil(person.died / 100) === century
    )
    : people.filter(person => person.sex === 'm');

  const sum = men.reduce((total, man) => total + (man.died - man.born), 0);

  return sum / men.length;
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
  const womenWithChildren = people.filter(person => {
    for (const p of people) {
      if (p.mother === person.name) {
        return person;
      };
    }
  });

  const women = withChildren
    ? people.filter(person =>
      person.sex === 'f' && womenWithChildren.some(woman =>
        woman.name === person.name))
    : people.filter(person => person.sex === 'f');

  const sum = women.reduce((total, woman) =>
    total + (woman.died - woman.born), 0);

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
  const arrOfDiff = [];
  const men = people.filter(person => person.sex === 'm');

  if (onlyWithSon) {
    people.forEach(person => {
      for (const p of men) {
        if (p.mother === person.name) {
          arrOfDiff.push(p.born - person.born);
        }
      }
    });
  } else {
    people.forEach(person => {
      for (const p of people) {
        if (p.mother === person.name) {
          arrOfDiff.push(p.born - person.born);
        }
      }
    });
  }

  const sum = arrOfDiff.reduce((total, item) => {
    return total + item;
  }, 0);

  return sum / arrOfDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
