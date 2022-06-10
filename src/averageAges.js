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

function createArrAges(arr) {
  return arr.map((person) => (person.died - person.born));
}

function average(ages) {
  return ages.reduce((sum, n) => (sum + n), 0) / ages.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) =>
    (
      person.sex === 'm'
      && (
        century
          ? Math.ceil(person.died / 100) === century
          : true
      )
    )
  );

  // const ages = men.map((man) => (man.died - man.born));
  const ages = createArrAges(men);

  return average(ages);
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
  const women
  = withChildren
    ? people.filter(person => people.some((per) => per.mother === person.name))
    : people.filter((person) => (person.sex === 'f'));

  const ages = createArrAges(women);

  return average(ages);
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
  const children = people.filter(
    (person) => people.some((per) => per.name.includes(person.mother))
  );

  const sons = children.filter(person => person.sex === 'm');

  const ages
  = (onlyWithSon
    ? sons
    : children).map((person) =>
    (person.born
      - (people.find((per) => per.name === person.mother).born)
    )
  );

  return average(ages);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
