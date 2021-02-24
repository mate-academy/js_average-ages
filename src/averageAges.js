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
const calculateAverageAge = (value) => {
  return value.reduce((acc, currennt) => {
    return acc + currennt;
  }, 0) / value.length;
};

function calculateMenAverageAge(people, century) {
  const callBackForFilter = (person) =>
    century ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';

  const filteredMan = people.filter(callBackForFilter);

  const calculateFilteredMan = filteredMan.map(man => man.died - man.born);

  return calculateAverageAge(calculateFilteredMan);
};

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
  const women = people.filter((person) => person.sex === 'f');

  const calculateWomanAge = women.map(person => person.died - person.born);

  const womanWithChildren = women.filter(person =>
    people.some((child) => person.name === child.mother))
    .map(woman => woman.died - woman.born);

  const filteredWomen = withChildren ? womanWithChildren : calculateWomanAge;

  return calculateAverageAge(filteredWomen);
}
/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlywithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlywithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlywithSon) {
  const mothers = (people.filter(person =>
    people.some(child => child.mother === person.name)));

  const children = (people.filter(child =>
    people.some(mother => mother.name === child.mother)));

  const childrenBoys = (people.filter(boy => people.some(mother =>
    (mother.name === boy.mother) && boy.sex === 'm')));

  const allChildren = mothers.reduce((accumulator, currennt) => {
    let perviousValue = accumulator;

    children.some(child => {
      child.mother === currennt.name
        ? perviousValue += child.born - currennt.born
        : perviousValue += 0;
    });

    return perviousValue;
  }, 0);

  const withSon = mothers.reduce((accumulator, currennt) => {
    let perviousValue = accumulator;

    childrenBoys.find(boy => {
      boy.mother === currennt.name && boy.sex === 'm'
        ? perviousValue += boy.born - currennt.born
        : perviousValue += 0;
    });

    return perviousValue;
  }, 0);

  return onlywithSon
    ? withSon / childrenBoys.length
    : allChildren / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
