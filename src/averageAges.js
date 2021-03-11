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
  let centuryList = [];

  century !== undefined
    ? centuryList = people.filter(x => Math.ceil(x.died / 100) === century)
    : centuryList = people;

  const menList = centuryList.filter(x => x.sex === 'm');

  return menList.reduce((sum, a) => sum + (a.died - a.born), 0)
    / menList.length;
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
  for (let i = 0; i < people.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (people[i].name === people[j].mother) {
        people[i].hadChidren = 'y';
      }
    }
  }

  let peopleWhitChildred = [];

  withChildren !== undefined
    ? peopleWhitChildred = people.filter(x => x.hadChidren === 'y')
    : peopleWhitChildred = people;

  const womenWithChidlren = peopleWhitChildred.filter(x => x.sex === 'f');

  return womenWithChidlren.reduce((sum, x) => sum + (x.died - x.born), 0)
    / womenWithChidlren.length;
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
  for (let i = 0; i < people.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (people[i].name === people[j].mother) {
        people[j].isChidren = 'y';
        people[j].mother = people[i];
      }
    }
  }

  const childrenList = people.filter(x => x.isChidren === 'y');
  const hadSon = childrenList.filter(x => x.sex === 'm');

  let result;

  onlyWithSon === true
    ? result = hadSon.reduce((sum, x) => sum + (x.born - x.mother.born), 0)
    / hadSon.length
    : result = childrenList.reduce((sum, x) => sum
    + (x.born - x.mother.born), 0)
    / childrenList.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
