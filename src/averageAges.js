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
  function menFilter(el) {
    return el.sex === 'm';
  }

  function deathFilter(el) {
    const deathCentury = Math.ceil(el.died / 100);

    return century ? deathCentury === century : el.died !== century;
  }

  const men = people.filter(menFilter).filter(deathFilter);

  function callback(acc, curV) {
    return acc + (curV.died - curV.born);
  }

  return (men.reduce(callback, 0) / men.length);
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
  function womenFilter(el) {
    return el.sex === 'f';
  }

  function motherFilter(el) {
    function isMother(element) {
      return el.name === element.mother;
    }

    return withChildren ? people.find(isMother) : true;
  }

  const women = people.filter(womenFilter).filter(motherFilter);

  function callback(acc, curV) {
    return acc + (curV.died - curV.born);
  }

  return (women.reduce(callback, 0) / women.length);
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
  function motherFilter(el) {
    function isMother(element) {
      return onlyWithSon
        ? el.name === element.mother && element.sex === 'm'
        : el.name === element.mother;
    }

    return people.find(isMother);
  }

  const mothers = people.filter(motherFilter);
  let totalChildNumber = 0;

  function callback(acc, curV) {
    function isChild(element) {
      return onlyWithSon
        ? curV.name === element.mother && element.sex === 'm'
        : curV.name === element.mother;
    }

    const childs = people.filter(isChild);

    const diferences = childs.map(el => el.born - curV.born);

    totalChildNumber += diferences.length;

    return acc + diferences.reduce((ac, el) => el + ac, 0);
  }

  return +(mothers.reduce(callback, 0) / totalChildNumber).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
