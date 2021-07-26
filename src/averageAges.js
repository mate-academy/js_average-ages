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
  const filterMan = people.filter((item) => item.sex === 'm');
  const filterCentury = filterMan.filter(
    (item) => Math.ceil(item.died / 100) === century
  );
  const manAge = filterMan.map((item) => item.died - item.born);
  const manAgeCentury = filterCentury.map((item) => item.died - item.born);
  const sumAges = (
    manAge.reduce((prev, item) => prev + item, 0) / manAge.length
  ).toFixed(2);
  const sumAgesCentury = (
    manAgeCentury.reduce((prev, item) => prev + item, 0) / manAgeCentury.length
  ).toFixed(2);
  const res = century === undefined ? sumAges : sumAgesCentury;

  return Number(res);
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

function calculateWomenAverageAge(people, withChildren) {
  const filterWomen = people.filter((item) => item.sex === 'f');

  const womenWithChild = withChildren
    ? people.filter((item) =>
      people.find((element) => element.mother === item.name)
    )
    : filterWomen;

  const womenAge = womenWithChild.map((item) => item.died - item.born);
  const sumAges = (
    womenAge.reduce((prev, item) => prev + item, 0) / womenAge.length
  ).toFixed(2);

  return Number(sumAges);
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
  const age = [];
  const filterMan = people.filter((item) => item.sex === 'm');
  const womenWithChild = onlyWithSon ? filterMan.filter((item) =>
    people.find((element) => element.mother === item.mother)
  ) : people;

  womenWithChild.map((item) =>
    people.filter((element) => element.name === item.mother
      && age.push(item.born - element.born))
  );

  const sumAges = (
    age.reduce((prev, item) => prev + item, 0) / age.length
  ).toFixed(2);

  return Number(sumAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
