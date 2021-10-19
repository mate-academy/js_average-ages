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
  let averageAge = 0;

  const men = people.filter(person => person.sex === 'm');

  const menFromCentry = men.filter(person =>
    Math.ceil(person.died / 100) === century);

  const menCalculate = century ? menFromCentry : men;

  averageAge = menCalculate.map(a => a.died - a.born);

  return averageAge.reduce((a, b) => a + b) / averageAge.length;
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
  let averageAge = 0;

  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = people.filter((mother) =>
    people.find(person => person.mother === mother.name));

  const womenCalculate = withChildren ? womenWithChildren : women;

  averageAge = womenCalculate.map(a => a.died - a.born);

  return averageAge.reduce((a, b) => a + b) / averageAge.length;
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
  const children = people.filter((child) => {
    return people.some((mother) => mother.name === child.mother);
  });

  const onlyBoys = children.filter(boy => boy.sex === 'm');

  const resulAray = onlyWithSon ? onlyBoys : children;

  return resulAray.reduce((prev, child) => {
    const motherRef = people.find((mother) => mother.name === child.mother);

    return prev + child.born - motherRef.born;
  }, 0) / resulAray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
