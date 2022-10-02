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
  const men = people.filter(person => person.sex === 'm');

  const menToCalculate = century
    ? men.filter(man => century === Math.ceil(man.died / 100))
    : men;

  const menTotalAge = sumTotalAge(menToCalculate);

  return calculateAverageAge(menTotalAge);

  // learn how to use array methods like
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
  const women = people.filter(person => (person.sex === 'f'));
  const womenToCalculate = withChildren
    ? women.filter(lady =>
      (people.some(person => lady.name === person.mother)))
    : women;

  const womenTotalAge = sumTotalAge(womenToCalculate);

  return calculateAverageAge(womenTotalAge);
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
  const allChildren = people.filter(child =>
    (people.some(mother => (mother.name === child.mother))));

  const sonsOnly = allChildren.filter(son =>
    (son.sex === 'm' && onlyWithSon));

  const findDifference = array =>
    (array.map(child =>
      (people.reduce((sum, mother) =>
        ((mother.name === child.mother)
          ? sum + (child.born - mother.born)
          : sum), 0))));

  const ageAfterBirth = findDifference(allChildren);
  const ageAfterBirthOfSon = findDifference(sonsOnly);

  return calculateAverageAge(ageAfterBirthOfSon)
  || calculateAverageAge(ageAfterBirth);
}

const sumTotalAge = array => (array.map(person =>
  (person.died - person.born)));

const calculateAverageAge = array => (array.reduce((sum, age) =>
  (sum + age), 0)) / array.length;

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
