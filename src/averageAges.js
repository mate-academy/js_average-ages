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
  const men =  people.filter(human => century ? isMen(human.sex)
    && isManBornInCentury(human.died, century) : isMen(human.sex))

  return men.reduce((acc, curr) =>  acc + (curr.died - curr.born), 0) / men.length;
}

function isRightSex(sex) {
  const recipientSex = sex
  return (check) => sex === check
 }

 const isMen = isRightSex('m')

function isManBornInCentury(deathDate, century) {
  return Math.ceil(deathDate / 100) === century 
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
  const women = people.filter(human => withChildren
    ? isWomen(human.sex)
    && people.some(child=> child.mother === human.name)
    : isWomen(human.sex))

  return women.reduce(
    (acc, curr) => acc + (curr.died - curr.born), 0) / women.length
}


const isWomen = isRightSex('f')

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
  const children = people.filter(human => onlyWithSon
    ? human.mother && isMen(human.sex)
    : human.mother);

  const mothers = people.filter(
    human => people.some(
      child => child.mother === human.name));

  const childMother = children
    .filter(child => mothers.some(mother=> child.mother === mother.name));

  const averageAge = childMother.reduce(
    (sum, curr) =>
    sum + (curr.born - people
      .find(mother => curr.mother === mother.name).born), 0) / childMother.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
