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
  const arrayOfMen = people.filter(person => person.sex === 'm');
  const lifeYears = (!century)
    ? arrayOfMen.map(men => men.died - men.born)
    : arrayOfMen.filter(person => Math.ceil(person.died / 100) === century)
      .map(men => men.died - men.born);

  return lifeYears.reduce((sum, age) => sum + age, 0) / lifeYears.length;
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
  const nameMothers = people.map(person => person.mother);
  const arrayOfMothers = women.filter(w => nameMothers.includes(w.name));
  const lifeYears = (!withChildren)
    ? women.map(w => w.died - w.born)
    : arrayOfMothers.map(w => w.died - w.born);

  return lifeYears.reduce((sum, age) => sum + age, 0) / lifeYears.length;
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
  const onlyKidMom = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(mother => mother.name === person.mother)
    : people.some(mother => mother.name === person.mother)
  );

  const diffKidMom = onlyKidMom.map(child => child.born
      - people.find(mother => mother.name === child.mother).born);

  return diffKidMom.reduce((x, y) => x + y) / diffKidMom.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
