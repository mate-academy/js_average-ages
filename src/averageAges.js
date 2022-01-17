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
  const sumOfAges = people.reduce(
    (total, person) =>
      person.sex === 'm' && (arguments.length === 1
      || century === Math.ceil(person.died / 100))
        ? total + (person.died - person.born) : total, 0);

  const quantity = people.reduce(
    (total, person) =>
      person.sex === 'm' && (arguments.length === 1
      || century === Math.ceil(person.died / 100))
        ? total + 1 : total, 0);

  return Math.round(sumOfAges / quantity * 100) / 100;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
function calculateWomenAverageAge(people, withChildren = false) {
  const onlyWomen = people.filter(person => person.sex === 'f');
  let count = 0;
  const totalAgeForAllWomen = onlyWomen.reduce(function(totalAges, person) {
    count++;

    return totalAges + person.died - person.born;
  }, 0);
  const averageAgeforAllWomen = Math.round(totalAgeForAllWomen
    / count * 100) / 100;

  count = 0;

  const WomenWithChildren = onlyWomen.filter(woman => {
    const womanHasChild = people.some(child => child.mother === woman.name);

    count++;

    return womanHasChild;
  });

  count = 0;

  const totalAgeForWomenWithChildren = WomenWithChildren.reduce(
    function(totalAges, person) {
      count++;

      return totalAges + person.died - person.born;
    }, 0);

  const averageAgeForWomenWithChildren = Math.round(totalAgeForWomenWithChildren
    / count * 100) / 100;

  return withChildren === true ? averageAgeForWomenWithChildren
    : averageAgeforAllWomen;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let differenceAgeWomenAndChild = 0;
  let count = 0;
  const onlyWomen = people.filter(person => person.sex === 'f');

  onlyWomen.filter(woman => {
    const womanHasChild = people.filter(child => child.mother === woman.name);

    differenceAgeWomenAndChild += womanHasChild.reduce(
      function(totalAges, child) {
        count++;

        return totalAges + child.born - woman.born;
      }, 0);
  });

  let differenceAgeWomenAndSon = 0;
  let counter = 0;

  onlyWomen.filter(woman => {
    const checkIfBoy = people.filter(child => (child.mother === woman.name)
    && (child.sex === 'm'));

    differenceAgeWomenAndSon += checkIfBoy.reduce(
      function(totalAges, child) {
        counter++;

        return totalAges + child.born - woman.born;
      }, 0);
  });

  const AvarageAgeforWomanWithChild = Math.round(differenceAgeWomenAndChild
    / count * 100) / 100;
  const AvarageAgeforWomanWithSon = Math.round(differenceAgeWomenAndSon
    / counter * 100) / 100;

  return onlyWithSon === true ? AvarageAgeforWomanWithSon
    : AvarageAgeforWomanWithChild;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
