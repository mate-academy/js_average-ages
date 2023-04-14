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
  const filteredTab = people.filter(filterMan).filter(filterCentury);

  function filterMan(person) {
    return person.sex === 'm';
  }

  function filterCentury(person) {
    return (century) ? (Math.ceil(person.died / 100)) === century : people;
  }

  function sumAllAges(prev, next) {
    return prev + (next.died - next.born);
  }

  return (filteredTab.reduce(sumAllAges, 0) / filteredTab.length);
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
  const filteredTab = (withChildren)
    ? people.filter(filterMothers)
    : people.filter(filterWoman);

  function filterWoman(person) {
    return person.sex === 'f';
  };

  function filterMothers(person) {
    return people.some(el => el.mother === person.name);
  };

  function sumAllAges(prev, next) {
    return prev + (next.died - next.born);
  };

  return (filteredTab.reduce(sumAllAges, 0) / filteredTab.length);
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
  const filteredTab = (onlyWithSon)
    ? people.filter(filterMan).filter(filterChilds)
    : people.filter(filterChilds);

  function filterMan(person) {
    return person.sex === 'm';
  }

  function filterChilds(person) {
    return people.some(el => el.name === person.mother);
  };

  return filteredTab.reduce((prev, next) => {
    return prev + (next.born - people.find(el => el.name === next.mother).born);
  }, 0) / filteredTab.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
