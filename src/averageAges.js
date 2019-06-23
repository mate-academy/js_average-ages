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

function averageAge(arrayOfYears) { // АККУМУЛИРУЕМ и ДЕЛИМ НА ДЛИНУ
  return arrayOfYears.reduce((sum, man) => sum + man) / arrayOfYears.length;
}

function calculateMenAverageAge(people, century) {
  const filtered = people
    .filter(man => man.sex === 'm')
    .filter(man => {
      if (century) {
        return century === Math.ceil(man.died / 100);
      } else {
        return man;
      }
    })
    .map(man => man.died - man.born);

  return averageAge(filtered);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filtered = people
    .filter(woman => woman.sex === 'f')
    .filter(woman => {
      if (withChildren) {
        // обращаемся к основному массиву, чтобы пройтись по детям
        return people.some(child => woman.name === child.mother);
      } else {
        return woman;
      }
    })
    .map(woman => woman.died - woman.born);

  return averageAge(filtered);
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
  // большая завязка на детей
  const filtered = people
    .filter(child => (onlyWithSon ? child.sex === 'm' : child))
    .filter(child => {
      // заметим, что не все мамы детей есть в массиве,
      // поэтому мы начинаем перебирать существующих мам,
      // у которых есть дети, из базового массива
      return people.some(woman => child.mother === woman.name);
      // если у чайлда есть мамка
    })
    .map(child => {
      const motherBorn = people.find(woman => child.mother === woman.name).born;
      return child.born - motherBorn;
    });

  return averageAge(filtered);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
