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

const sortBySex = (arr, sex) => {
  return arr.filter(person => person.sex === sex);
};

const calculateAverageAge = (arr) => {
  return Math.round(arr.reduce((previous, current) =>
    previous + (current.died - current.born), 0)
    / arr.length * 100) / 100;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let Men = sortBySex(people, 'm');

  Men = century
    ? Men.filter(person => (Math.ceil(person.died / 100)) === century)
    : Men;

  return calculateAverageAge(Men);
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
  let Woman = sortBySex(people, 'f');

  Woman = withChildren
    ? Woman.filter(woman =>
      people.find(children => woman.name === children.mother))
    : Woman;

  return calculateAverageAge(Woman);
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
  const childrens = people.filter(children =>
    people.find(person => children.mother === person.name)
    && (onlyWithSon ? children.sex === 'm' : true));

  return Math.round(childrens.reduce((previous, current) =>
    previous + (current.born - people.find(person =>
      person.name === current.mother).born), 0)
    / childrens.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
