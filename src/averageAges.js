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
  // replace `if ()` statement with logical operators
  // (&&, ||) or ternary operator (?:)
  // without nesting
  let men = [...people];

  men = (century === undefined)
    ? men.filter(person => person['sex'] === 'm')
    : men.filter(person => person['sex'] === 'm')
      .filter(person => Math.ceil(person['died'] / 100) === century);

  const ages = [];
  men.map((person) => {
    ages.push(getPersonAge(person));
  });

  return getAverage(ages);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function getPersonAge(person) {
  return person['died'] - person['born'];
}

function getAverage(array) {
  return array.reduce((sum, item) => sum + item, 0) / array.length;
}

function calculateWomenAverageAge(people, withChildren) {
  // write code here
  let women = [...people];
  women = withChildren
    ? women.filter(person => person['sex'] === 'f'
      && women.some(child => child['mother'] === person['name']))
    : women.filter(person => person['sex'] === 'f');

  const ages = [];
  women.map((person) => {
    ages.push(getPersonAge(person));
  });

  return getAverage(ages);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  let children = [...people];
  children = onlyWithSon
    ? children
      .filter(person => people
        .some(mother => mother['name'] === person['mother'])
        && (person['sex'] === 'm')
      )
    : children
      .filter(person => people
        .some(mother => mother['name'] === person['mother'])
      );

  children.map(
    child => {
      const momOfChild = people
        .find(mother => mother['name'] === child['mother']);
      child['momBorn'] = momOfChild['born'];
    },
  );

  const diff = [];
  children.map((person) => {
    diff.push(person['born'] - person['momBorn']);
  });

  return getAverage(diff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
