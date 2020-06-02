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
  const mans = century
    ? people.filter(person => {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    })
    : people.filter(person => person.sex === 'm');

  return mans.reduce((age, person) => {
    return age + (person.died - person.born);
  }, 0) / mans.length;
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
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = withChildren
    ? people.filter(person => {
      return people.find(child => child.mother === person.name) !== undefined;
    })
    : people.filter(person => person.sex === 'f');

  return women.reduce((age, person) => {
    return age + (person.died - person.born);
  }, 0) / women.length;
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
  const women = onlyWithSon
    ? people.filter(person => {
      return people.find(child => {
        return child.mother === person.name && child.sex === 'm';
      }) !== undefined;
    })
    : people.filter(person => {
      return people.find(child => child.mother === person.name) !== undefined;
    });

  const children = onlyWithSon
    ? people.filter(child => {
      return women.find(mother => {
        return child.mother === mother.name && child.sex === 'm';
      });
    })
    : people.filter(child => {
      return women.find(mother => child.mother === mother.name);
    });

  return women.reduce((age, person) => {
    let diff = 0;

    children.forEach(child => {
      diff += child.mother === person.name
        ? child.born - person.born
        : 0;

      return child.mother === person.name;
    });

    return diff + age;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

// const people = require('./people');

// console.log(calculateMenAverageAge(people));
// console.log(calculateWomenAverageAge(people));
// console.log(calculateAverageAgeDiff(people));
