'use strict';

const PRECISION_OF_ROUNDING = 2;
const ROUNDING_NUM = 10 ** PRECISION_OF_ROUNDING;

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
  const men = people.filter((man) => man.sex === 'm');

  const menInCentury = century === undefined
    ? men
    : men.filter((man) => Math.ceil(man.died / 100) === century);

  const menAges = menInCentury.map((man) => man.died - man.born);
  const totalAge = menAges.reduce((sum, man) => sum + man, 0);
  const averageAge = totalAge / menAges.length;
  const ageRounded = Math.round(averageAge * ROUNDING_NUM) / ROUNDING_NUM;

  return ageRounded;
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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChild = withChildren === true && withChildren !== undefined
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;

  const womenAges = womenWithChild.map((woman) => woman.died - woman.born);
  const totalAge = womenAges.reduce((sum, woman) => sum + woman, 0);
  const averageAge = totalAge / womenAges.length;
  const ageRounded = Math.round(averageAge * ROUNDING_NUM) / ROUNDING_NUM;

  return ageRounded;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const ppl = people.map(person => person.name);
  const children = onlyWithSon === true && onlyWithSon !== undefined
    ? people.filter(person => person.sex === 'm' && ppl.includes(person.mother))
    : people.filter(person => ppl.includes(person.mother));

  const mothersNames = children.map(child => child.mother);
  const mothers = people.filter(person => mothersNames.includes(person.name));

  const childMotherDiffAge = children.map((child) => {
    const motherOfChild = mothers.find(mother => mother.name === child.mother);

    return (motherOfChild ? child.born - motherOfChild.born : child.born);
  });

  const totalAge = childMotherDiffAge.reduce((sum, child) => sum + child, 0);
  const averageAge = totalAge / children.length;
  const ageRounded = Math.round(averageAge * ROUNDING_NUM) / ROUNDING_NUM;

  return ageRounded;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
