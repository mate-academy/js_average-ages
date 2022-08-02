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
  // create array with only men or if century identificated take
  // only men borned in this century
  const menList = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');
  // quantity of choosed men
  const menQuantity = menList.length;
  // with reduce calculate man ages
  const menAvarageAge = menList.reduce((sumOfAges, man) => (
    sumOfAges + (man.died - man.born)
  ), 0) / menQuantity;

  return +menAvarageAge.toFixed(2);
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
// create array with only women or if withChildfen looking for
// women with children
  const womenList = people.filter(person => withChildren
    ? person.sex === 'f'
    && people.some(anyPeople => anyPeople.mother === person.name)
    : person.sex === 'f');
  // quantity of choosed womens
  const womenQuantity = womenList.length;
  // with reduce calculate woman ages
  const womenAvarageAge = womenList.reduce((sumOfAges, woman) => (
    sumOfAges + (woman.died - woman.born)
  ), 0) / womenQuantity;

  return +womenAvarageAge.toFixed(2);
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
// take in array people who has mother
  const children = people.filter(person => person.mother !== null);
  // creating array with using map ( )
  const ageDiff = children.map((child) => {
    // search with find method mother of a child and also if child is a son
    const mother = people.find(person => onlyWithSon
      ? person.name === child.mother && child.sex === 'm'
      : person.name === child.mother);

    // if mother found return in array mother's age when child was born
    // else return in array false and then delete from array all false elements
    return mother ? child.born - mother.born : false;
  }).filter(child => child !== false);
  // with reduce calculate average age
  const averageAgeDiff = ageDiff.reduce((sumOfAges, currentAge) => (
    sumOfAges + currentAge
  ), 0) / ageDiff.length;

  return +averageAgeDiff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
