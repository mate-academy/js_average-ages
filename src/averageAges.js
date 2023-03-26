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
  const males = century
    ? people.filter(
      (male) => male.sex === 'm' && century === Math.ceil(male.died / 100)
    )
    : people.filter((male) => male.sex === 'm');

  const totalAge = males.reduce(
    (sumAge, maleItem) => sumAge + (maleItem.died - maleItem.born), 0
  );

  return totalAge / males.length;
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
  const females = withChildren
    ? people.filter(
      (female) => female.sex === 'f'
      && people.some((child) => child.mother === female.name)
    )
    : people.filter((female) => female.sex === 'f');

  const totalAge = females.reduce(
    (sumAge, femaleItem) => sumAge + (femaleItem.died - femaleItem.born), 0
  );

  return totalAge / females.length;
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
  const childrenArray = onlyWithSon
    ? people.filter(person => (
      person.sex === 'm' && people.some(mother => mother.name === person.mother)
    ))
    : people.filter(person => (
      people.some(mother => mother.name === person.mother)
    ));

  const totalAgeDiff = childrenArray.reduce((sumAge, child) => {
    const motherItem = people.find(person => person.name === child.mother);
    const ageDifference = child.born - motherItem.born;

    return sumAge + ageDifference;
  }, 0);

  return totalAgeDiff / childrenArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
