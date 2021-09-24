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
const avgAges = (arr) => {
  const totalAges = arr.reduce((sum, man) => sum + (man.died - man.born), 0);

  return totalAges / arr.length;
};

function womenWithChildren(arr) {
  return arr.filter((person) => arr.some((man) => man.mother === person.name));
}

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => person.sex === 'm');
  const menDiedInCentery = men.filter(
    (man) => Math.ceil(man.died / 100) === century
  );

  return (century && avgAges(menDiedInCentery)) || avgAges(men);
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
  const women = people.filter((person) => person.sex === 'f');

  return (withChildren && avgAges(womenWithChildren(people))) || avgAges(women);
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
  const moms = womenWithChildren(people);
  const diffs = [];

  onlyWithSon
    ? moms.forEach((mom) =>
      people.find((person) => {
        if (person.mother === mom.name && person.sex === 'm') {
          diffs.push(person.born - mom.born);
        }
      })
    )
    : moms.forEach((mom) =>
      people.find((person) => {
        if (person.mother === mom.name) {
          diffs.push(person.born - mom.born);
        }
      })
    );

  const totalDiff = diffs.reduce((sum, dif) => sum + dif, 0);

  return totalDiff / diffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
