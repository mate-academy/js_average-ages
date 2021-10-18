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
function calculateMenAverageAge(people, century = 0) {
  let age = 0;
  const arrMen = people.filter(el => el.sex === 'm');

  if (century === 0) {
    const arrAge = arrMen.map(d => d.died - d.born);

    age = arrAge.reduce((sum, el) => sum + el) / arrAge.length;

    return (Math.round(age * 100) / 100);
  }

  // eslint-disable-next-line max-len
  const arrMenCenturi = arrMen.filter(el => Math.ceil(el.died / 100) === century);

  const arrAgecenturi = arrMenCenturi.map(d => d.died - d.born);

  age = arrAgecenturi.reduce((sum, el) => sum + el) / arrAgecenturi.length;

  return (Math.round(age * 100) / 100);
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
function calculateWomenAverageAge(people, withChildren = 0) {
  let age = 0;
  const arrWomen = people.filter(el => el.sex === 'f');

  if (withChildren === 0) {
    const arrAge = arrWomen.map(d => d.died - d.born);

    age = arrAge.reduce((sum, el) => sum + el) / arrAge.length;

    return (Math.round(age * 100) / 100);
  }

  if (withChildren === true) {
    // eslint-disable-next-line max-len
    const nevarr = people.filter(el => people.some(elem => elem.mother === el.name));

    const arrAge = nevarr.map(d => d.died - d.born);

    age = arrAge.reduce((sum, el) => sum + el) / arrAge.length;

    return (Math.round(age * 100) / 100);
  }
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
function calculateAverageAgeDiff(people, onlyWithSon = 0) {
  // eslint-disable-next-line max-len
  const arrMother = people.filter(el => people.some(elem => elem.mother === el.name));
  const arrAge = [];
  let age = 0;

  if (onlyWithSon === 0) {
    // eslint-disable-next-line max-len
    const arrChildr = people.filter(el => people.some(elem => elem.name === el.mother));

    for (const keyChild of arrChildr) {
      for (const keyMother of arrMother) {
        if (keyChild.mother === keyMother.name) {
          arrAge.push(keyChild.born - keyMother.born);
        };
      }
    }

    age = arrAge.reduce((sum, el) => sum + el) / arrAge.length;

    return (Math.round(age * 100) / 100);
  }

  if (onlyWithSon) {
    // eslint-disable-next-line max-len
    const arrChildr = people.filter(el => people.some(elem => elem.name === el.mother) && el.sex === 'm');

    for (const keyChild of arrChildr) {
      for (const keyMother of arrMother) {
        if (keyChild.mother === keyMother.name) {
          arrAge.push(keyChild.born - keyMother.born);
        };
      }
    }
    age = arrAge.reduce((sum, el) => sum + el) / arrAge.length;

    return (Math.round(age * 100) / 100);
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
