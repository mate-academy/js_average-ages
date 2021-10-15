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
  const isMan = person => person.sex === 'm';
  const isManTwentyOne = person =>
    isMan(person) && Math.ceil(person.died / 100) === century;
  const totalMen = people.filter(century ? isManTwentyOne : isMan);

  const calculateMen = (sum, man) => sum + (man.died - man.born);

  return totalMen.reduce(calculateMen, 0) / totalMen.length;
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
  const isWoman = person => person.sex === 'f';
  const isWomanWithChildren = person =>
    isWoman(person) && people.some(human => human.mother === person.name);

  const women = people.filter(withChildren ? isWomanWithChildren : isWoman);
  const calculateWomen = (sum, woman) => sum + (woman.died - woman.born);

  return women.reduce(calculateWomen, 0) / women.length;
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
  const getChildren = person => people.find(mother =>
    person.mother === mother.name);

  const getSons = person => people.find(mother =>
    person.mother === mother.name && person.sex === 'm');

  const children = people.filter(onlyWithSon ? getSons : getChildren);

  return children.reduce(
    (accumulator, child) => accumulator + (child.born - people.find(
      person => person.name === child.mother).born), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
