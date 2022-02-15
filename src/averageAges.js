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
  const men = people.filter(
    man => man.sex === 'm'
      && ((century > 0)
        ? Math.ceil(man.died / 100) === century
        : true
      ));
  const age = men.map(
    yearsLife => yearsLife.died - yearsLife.born);

  const done = age.reduce(
    (sum, value) => sum + value);

  return done / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average
 * age of women in array. If withChildren is
 * specified then function calculates
 *  average age only for women with children
 *
 * Hint: To check if a woman has
 * children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(
    (person) =>
      person.sex === 'f'
      && (withChildren
        ? people.some(
          (child) => child.mother === person.name)
        : true)
  );
  const age = women.map(
    (woman) => woman.died - woman.born);
  const average = age.reduce(
    (sum, value) => sum + value);

  return average / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an
 * average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If onlyWithSon is specified
 * then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenWithChild = people.filter(
    (woman) =>
      woman.sex === 'f' && people.some(
        (child) => child.mother === woman.name)
  );
  const children = people.filter(
    (child) =>
      womenWithChild.some(
        (mother) => child.mother === mother.name)
      && (onlyWithSon ? child.sex === 'm' : true)
  );
  const done = children.reduce(
    (sum, child) =>
      sum
      + (child.born
        - womenWithChild.find(
          (woman) => woman.name === child.mother).born),
    0) / children.length;

  return done;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
