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
  const male = century
    ? people.filter(el => el.sex === 'm'
      && Math.ceil(el.died / 100) === century)
    : people.filter(el => el.sex === 'm');

  const maleAges = male.map(el => el.died - el.born);

  const average = maleAges.reduce((acc, el) => acc + el) / maleAges.length;

  return average;
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
  // write code here
  const motherNames = people.filter(el => el.mother).map(el => el.mother);
  const women = withChildren
    ? people.filter(el => el.sex === 'f' && motherNames.includes(el.name))
    : people.filter(el => el.sex === 'f');

  const womenAge = women.map(el => el.died - el.born);

  const average = womenAge.reduce((acc, el) => acc + el) / womenAge.length;

  return average;
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
  // write code here
  const child = onlyWithSon
    ? people.filter(person => people.find(
      mother => person.mother === mother.name
    ) && person.sex === 'm')

    : people.filter(person => people.find(
      mother => person.mother === mother.name
    ));

  const difference = child.map(
    ch => ch.born - people.find(mother => ch.mother === mother.name).born
  );

  const averege = difference.reduce((acc, el) => acc + el) / difference.length;

  return averege;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
