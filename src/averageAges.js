'use strict';

function calculateMenAverageAge(people, century) {
  const man = people.filter(function(item) {
    return century !== undefined
      ? century === Math.ceil(item.died / 100)
      && item.sex === 'm'
      : item.sex === 'm';
  });

  const manAge = man.reduce(function(sumAge, item) {
    return sumAge + (item.died - item.born);
  }, 0);

  const manAverageAge = manAge / man.length;

  return manAverageAge;
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
  const women = people.filter(function(item) {
    return withChildren !== undefined
      ? people.some(function(child) {
        return child.mother === item.name;
      })
      : item.sex === 'f';
  });

  const womenAge = women.reduce(function(sumAge, item) {
    return sumAge + (item.died - item.born);
  }, 0);

  const womenAverageAge = womenAge / women.length;

  return womenAverageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const ageDifference = [];

  people.some(function(itemMother) {
    onlyWithSon !== undefined
      ? people.some(function(itemSon) {
        itemSon.mother === itemMother.name
        && itemSon.sex === 'm'
        && ageDifference.push(itemSon.born - itemMother.born);
      })
      : people.some(function(itemChild) {
        itemChild.mother === itemMother.name
        && ageDifference.push(itemChild.born - itemMother.born);
      });
  });

  const sumAgeDifference = ageDifference.reduce(function(sumAge, item) {
    return sumAge + item;
  }, 0);

  const averageAgeDiff = sumAgeDifference / ageDifference.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
