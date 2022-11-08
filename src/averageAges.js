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
function average(array) {
  return array.reduce((accumulator, item) =>
    accumulator + (item.died - item.born), 0) / array.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(man => {
      return Math.ceil(man.died / 100) === century;
    });
  }

  return average(men);
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

  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women
      .filter(woman => people
        .find(person => person.mother === woman.name));
  }

  return average(women);
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
  const ageDif = people.filter(person => onlyWithSon
    ? person.sex === 'm' : true)
    .map(person => {
      const mom = people.find(mother => mother.name === person.mother);

      return mom ? person.born - mom.born : '';
    })
    .filter(dif => dif);

  const sum = ageDif.reduce((accum, item) => accum + item, 0);

  return sum / ageDif.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
