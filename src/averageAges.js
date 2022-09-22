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
  let count = 0;

  const average = people
    .filter((person) => {
      return century
        ? person.sex === 'm' && Math.ceil(person.died / 100) === century
        : person.sex === 'm';
    })
    .reduce((total, person) => {
      count++;

      return total + (person.died - person.born);
    }, 0);


  return average / count;
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
  let count = 0;
  const women = people.filter((person) => {
    return person.sex === 'f';
  });
  const womenWithChildren = [];

  for (const human of people) {
    for (const nextHuman of people) {
      if (human.name === nextHuman.mother) {
        if (!womenWithChildren.includes(human)) {
          womenWithChildren.push(human);
        }
      }
    }
  }

  const average = !withChildren
    ? women.reduce((total, person) => {
      count++;

      return total + (person.died - person.born);
    }, 0)
    : womenWithChildren.reduce((total, person) => {
      count++;

      return total + (person.died - person.born);
    }, 0);

  return average / count;
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
  const womenWithChildren = [];
  const womenWithSons = [];

  for (const human of people) {
    for (const nextHuman of people) {
      if (human.name === nextHuman.mother) {
        if (!womenWithChildren.includes(human)) {
          womenWithChildren.push(nextHuman.born - human.born);
        }

        if (nextHuman.sex === 'm') {
          if (!womenWithSons.includes(human)) {
            womenWithSons.push(nextHuman.born - human.born);
          }
        }
      }
    }
  }

  return onlyWithSon
    ? womenWithSons.reduce((partialSum, a) => partialSum + a, 0)
        / womenWithSons.length
    : womenWithChildren.reduce((partialSum, a) => partialSum + a, 0)
        / womenWithChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
