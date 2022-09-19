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
function calculateMenAverageAge(people, century = 0) {
  const onlyMan = people.filter(person => person.sex === 'm');

  let sumAge = 0;
  let averageAge = 0;

  if (century !== 0) {
    let count = 0;

    for (const man of onlyMan) {
      if ((Math.ceil(man.died / 100)) === century) {
        sumAge += (man.died - man.born);
        count++;
      }
    }
    averageAge = Math.round((sumAge / count) * 100) / 100;

    return averageAge;
  }

  for (const man of onlyMan) {
    sumAge += (man.died - man.born);
  }

  averageAge = Math.round((sumAge / onlyMan.length) * 100) / 100;

  return averageAge;
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
  const onlyWoman = people.filter(person => person.sex === 'f');
  let sumAge = 0;
  let averageAge = 0;

  // // eslint-disable-next-line no-console
  // console.log(onlyWoman.length);

  if (withChildren === true) {
    let count = 0;

    for (const person of people) {
      for (const woman of onlyWoman) {
        if (person.mother === woman.name) {
          sumAge += (woman.died - woman.born);
          count++;
        }
      }
    }

    averageAge = Math.round((sumAge / count) * 100) / 100;

    return averageAge;
  }

  for (const woman of onlyWoman) {
    sumAge += (woman.died - woman.born);
  }
  averageAge = Math.round((sumAge / onlyWoman.length) * 100) / 100;

  return averageAge;
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
  const onlyWoman = people.filter(person => person.sex === 'f');
  let sumAgeWoman = 0;
  let sumAgeChild = 0;
  let count = 0;
  let averageAge = 0;

  if (onlyWithSon !== true) {
    for (const person of people) {
      for (const woman of onlyWoman) {
        if (person.mother === woman.name) {
          sumAgeChild += person.died - person.born;
          sumAgeWoman += person.born - woman.born;
          count++;
        }
      }
    }

    averageAge = (sumAgeChild - sumAgeWoman) / count;

    return Math.round(averageAge * 100) / 100;
  }

  for (const person of people) {
    if (person.sex === 'm') {
      for (const woman of onlyWoman) {
        if (person.mother === woman.name) {
          sumAgeChild += person.died - person.born;
          sumAgeWoman += person.born - woman.born;
          count++;
        }
      }
    }
  }

  averageAge = (sumAgeChild - sumAgeWoman) / count;

  return Math.round(averageAge * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
