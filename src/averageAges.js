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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  // ternary operator result-> put in men array
  // ? if century is given find all male person died in this century
  // : if century is not given, find all male person
  const men = century
    ? people.filter(person => Math.ceil(person.died / 100)
    === century && person.sex === 'm')
    : people.filter(person => person.sex === 'm');
  // sum given men age
  const totalAge = men.reduce((acc, person) => acc
   + (person.died - person.born), 0);
  // return average age if array is not empty

  return men.length > 0 ? totalAge / men.length : 0;
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
  // write code here// if specified withchildren:
  // ? put in array women, all women from ternary op. result
  // if some person has specified given women as mother,
  // given women is withchildren
  // : if not specified withchildren , we need all women
  const women = withChildren
    ? people.filter(person => person.sex === 'f' && people.some(p =>
      p.mother === person.name))
    : people.filter(person => person.sex === 'f');
    // sum total womens age
  const totalAge = women.reduce((acc, person) => acc
   + (person.died - person.born), 0);
    // if women array is not empty return average age

  return women.length > 0 ? totalAge / women.length : 0;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  // if only with son
  // ? children is array male people that have some mother
  // : if parameter not specified children is an array
  // male and female people, with some mother
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.some(mother => mother.name === person.mother))
    : people.filter(person => people
      .some(mother => mother.name === person.mother));
  // find all person they are mother for somebody from array children
  // if mother exist for child, return age difference
  // if mother not exist return 0;
  const sumOfTheAgeDifferences = children.reduce((acc, child) => {
    const mother = people.find(person => person.name === child.mother);
    const ageDifference = mother ? child.born - mother.born : 0;
    // sum age differences

    return acc + ageDifference;
  }, 0);
  // return average age difference for children

  return sumOfTheAgeDifferences / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
