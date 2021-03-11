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
  const male = people.filter(
    x => century
      ? x.sex === 'm' && Math.ceil(x.died / 100) === century
      : x.sex === 'm'
  );
  const maleSum = male.reduce((total, person) =>
    total + person.died - person.born, 0);
  const maleAvg = maleSum / male.length;

  return maleAvg;
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
        people[i].children = true;
      }
    }
  }

  const female = people.filter(
    x => withChildren
      ? x.sex === 'f' && x.children
      : x.sex === 'f'
  );

  const femaleSum = female.reduce((total, person) =>
    total + person.died - person.born, 0);
  const femaleAvg = femaleSum / female.length;

  return femaleAvg;
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
  const arr = [];
  let arrReduced = 0;
  let arrAvg = 0;

  if (!onlyWithSon) {
    for (let i = 0; i < people.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (people[i].name === people[j].mother) {
          arr.push(people[j].born - people[i].born);
        }
      }
    }

    arrReduced += arr.reduce((a, b) => a + b, 0);
    arrAvg += arrReduced / arr.length;

    return arrAvg;
  }

  for (let i = 0; i < people.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (people[i].name === people[j].mother && people[j].sex === 'm') {
        arr.push(people[j].born - people[i].born);
      }
    }
  }

  arrReduced += arr.reduce((a, b) => a + b, 0);
  arrAvg += arrReduced / arr.length;

  return arrAvg;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
