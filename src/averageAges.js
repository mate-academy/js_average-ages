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
  const arrayOfMen = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menAverageAgeWithoutCentury = arrayOfMen.reduce(function(average, man) {
    return average + (man.died - man.born);
  }, 0) / arrayOfMen.length;

  return menAverageAgeWithoutCentury;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const arrayOfWomen = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return arrayOfWomen.reduce(function(average, woman) {
    return average + (woman.died - woman.born);
  }, 0) / arrayOfWomen.length;
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
 *
 *
 *
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrens = people.filter(person =>
    onlyWithSon
      ? people.some(item => item.name === person.mother && person.sex === 'm')
      : people.some(item => item.name === person.mother));

  const diff = childrens.map(child => {
    return child.born
      - (people.find(mother => child.mother === mother.name).born);
  }
  );

  return (diff.reduce((avarage, item) => avarage + item)) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
