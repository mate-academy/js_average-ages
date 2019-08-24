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
  let countMen = 0;

  return people.reduce((acum, person) => {
    century === undefined
      ? person.sex === 'm'
      && countMen++
      : person.sex === 'm'
      && century === Math.ceil(person.died / 100)
      && countMen++;

    const withoutCentury = person.sex === 'm'
      ? acum + (person.died - person.born)
      : acum;
    const withCentury = person.sex === 'm'
    && century === Math.ceil(person.died / 100)
      ? acum + (person.died - person.born)
      : acum;

    return century === undefined ? withoutCentury : withCentury;
  }, 0) / countMen;
}
/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let countWomen = 0;

  return people.reduce((acum, person) => {
    withChildren === undefined
      ? person.sex === 'f'
      && countWomen++
      : person.sex === 'f'
      && people.some(child => person.name === child.mother)
      && countWomen++;

    const happyMom = person.sex === 'f'
      ? acum + (person.died - person.born)
      : acum;
    const unHappyMom = person.sex === 'f'
    && withChildren === true
    && people.some(child => person.name === child.mother)
      ? acum + (person.died - person.born)
      : acum;

    return withChildren === undefined ? happyMom : unHappyMom;
  }, 0) / countWomen;
}
/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  let countFamily = 0;

  return people.reduce((acum, child) => {
    onlyWithSon === undefined
      ? people.some(mom => child.mother === mom.name)
        && countFamily++
      : people.some(mom => child.mother === mom.name)
        && child.sex === 'm'
        && countFamily++;

    const multiplateMother = people
      .some(mother => mother.name === child.mother) !== false
      ? acum + child.born - people
        .find(mother => mother.name === child.mother).born
      : acum;

    const withSonMother = people
      .some(mother => mother.name === child.mother) !== false
      && child.sex === 'm'
      ? acum + child.born - people
        .find(mother => mother.name === child.mother).born
      : acum;

    return onlyWithSon === undefined ? multiplateMother : withSonMother;
  }, 0) / countFamily;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
