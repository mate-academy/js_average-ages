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
const getSex = (people, sex) =>
  people.filter(person => person.sex === sex);

const getAverageAge = people => people.reduce((sum, person) => (
  sum + person.died - person.born), 0) / people.length;

function calculateMenAverageAge(people, century) {
  let men = getSex(people, 'm');

  const menFromCentury = men.filter(
    person => Math.ceil(person.died / 100) === century);

  men = !century ? men : menFromCentury;

  return getAverageAge(men);
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
  let getwomen = getSex(people, 'f');

  const womenWithchild = getwomen.filter(
    mother => people.some(child => child.mother === mother.name));

  getwomen = !withChildren ? getwomen : womenWithchild;

  return getAverageAge(getwomen);
  // write code here
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
  let children = people.filter(
    kid => people.some(mother => mother.name === kid.mother));

  const son = getSex(children, 'm');

  children = !onlyWithSon ? children : son;

  const agesDiff = children.map(
    kid => kid.born - people.find(person => person.name === kid.mother).born);

  const averageAgeDiff = agesDiff.reduce((a, b) => a + b, 0) / children.length;

  return averageAgeDiff;
  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
