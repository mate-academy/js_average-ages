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
  const MenCollection = people.filter(person => person.sex === 'm'
    && (typeof (century) === 'number'
      ? (Math.ceil(person.died / 100)) === century
      : true));

  return Math.round(MenCollection.reduce((previous, current) =>
    previous + (current.died - current.born), 0)
    / MenCollection.length * 100) / 100;
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
  const Womans = people.filter(person => person.sex === 'f');
  const getMothers = () => Womans.filter(woman =>
    people.find(children => woman.name === children.mother));

  const WomansColection = withChildren ? getMothers() : Womans;

  return Math.round(WomansColection.reduce((previous, current) =>
    previous + (current.died - current.born), 0)
    / WomansColection.length * 100) / 100;
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
