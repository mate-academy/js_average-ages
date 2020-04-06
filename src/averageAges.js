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
  let men = people.filter((person) => person.sex === 'm');

  men = (century)
    ? men.filter(wasBorn => Math.ceil(wasBorn.died / 100) === century)
    : men;

  return averageMenAge(men) / men.length;

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
  let women = people.filter((woman) => woman.sex === 'f');

  if (withChildren) {
    let isMother = women.filter(woman => {
      const mothersName = woman.name;

      for (const key of people) {
        if (mothersName === key.mother) {
          return true
        }
      }
    });

    return averageWomenAge(isMother) / isMother.length;
  }

  return averageWomenAge(women) / women.length;
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
  const diffAgesMother = [];
  const diffAgesWithSons = [];

  people.forEach(person => people.find(mother => {
    const diffAge = person.born - mother.born;

    if (person.mother === mother.name) {
      diffAgesMother.push(diffAge)
    }

    if (person.mother === mother.name && person.sex === 'm') {
      diffAgesWithSons.push(diffAge)
    }
  }));

  if (onlyWithSon) {
    return averageAgeDigit(diffAgesWithSons) / diffAgesWithSons.length;
  } else {
    return averageAgeDigit(diffAgesMother) / diffAgesMother.length;
  }
}

const averageAgeDigit = (digit) => {
  return digit.reduce((sum, num) => sum + num, 0)
}

const averageMenAge = (person) => {
  return person.reduce((sum, men) => sum + (men.died - men.born), 0);
}

const averageWomenAge = (person) => {
  return person.reduce((sum, women) => sum + (women.died - women.born), 0)
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
};
