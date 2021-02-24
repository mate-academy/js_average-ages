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
  const manCentury = (person) => person.sex === 'm'
    && Math.ceil(person.died / 100) === century;
  const isMan = (person) => person.sex === 'm';

  const filteredMen = people.filter(century ? manCentury : isMan);

  const agesInCentury = filteredMen.reduce((accumulator, man) =>
    accumulator + (man.died - man.born), 0) / filteredMen.length;

  return agesInCentury;
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
  const isMom = (person) => person.sex === 'f'
    && people.some(child => child.mother === person.name);
  const isWomen = (person) => person.sex === 'f';

  const filteredWomen = people.filter(withChildren ? isMom : isWomen);

  const ages = filteredWomen.reduce((accumulator, women) =>
    accumulator + (women.died - women.born), 0) / filteredWomen.length;

  return ages;
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
  const isSonMom = (child) =>
    people.some(mother => child.mother === mother.name) && child.sex === 'm';
  const isChildMom = (child) =>
    people.some(mother => child.mother === mother.name);

  const children = people.filter(onlyWithSon ? isSonMom : isChildMom);

  const ageDifference = children.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born
  );

  const averageAge = ageDifference.reduce((child, mother) =>
    (child + mother), 0) / ageDifference.length;

  return averageAge;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
