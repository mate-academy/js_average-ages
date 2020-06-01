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
  let men = people.filter(person => person.sex === 'm');

  men = (century)
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;
  return calcPersonsAverageAge(men);


}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(person => person.sex === 'f');
  const arrAllMother = people.map(person => person.mother);

  women = (withChildren)
    ? women.filter(person => arrAllMother.includes(person.name))
    : women;

  return calcPersonsAverageAge(women);
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
  let arrChildren = people.filter(child => people.some(mum => mum.name === child.mother));
  const arrOnlySon = people.filter(child => child.sex === 'm' && people.some(mum => mum.name === child.mother));

  arrChildren = (onlyWithSon) ? arrOnlySon : arrChildren;

  const ageDiff = arrChildren.map(child => {
    const mum = people.find(mum => mum.name === child.mother);

    return child.born - mum.born;
  });
  
  const averageAgeDiff = ageDiff.reduce((sum, age) => sum + age, 0) / arrChildren.length;

  return roundValue(averageAgeDiff);
}

function calcPersonsAverageAge(arr) {
  const result = arr.reduce((prev, person) => prev + (person.died - person.born), 0) / arr.length;

  return roundValue(result);
}

function roundValue(value) {
  return Math.round(value * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
