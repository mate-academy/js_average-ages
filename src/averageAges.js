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

function filterSex(array, sex) {
  return array.filter(person => person.sex === sex);
};

function calcAvarage(number, divider) {
  return Number((number / divider).toFixed(2));
}

function calculateMenAverageAge(people, century) {
  let mens = filterSex(people, 'm');

  if (century) {
    mens = mens.filter(
      person => Math.ceil(person.died / 100) === century
    );
  }

  const totalAge = mens.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return calcAvarage(totalAge, mens.length);
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
  let womens = filterSex(people, 'f');

  if (withChildren) {
    womens = womens.filter(
      person => people.some(human => human.mother === person.name)
    );
  }

  const totalAge = womens.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return calcAvarage(totalAge, womens.length);
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
  const childs = (!onlyWithSon) ? people : filterSex(people, 'm');

  let countPeople = 0;

  const ages = childs.reduce(
    (sum, person) => {
      const motherName = people.find(human => person.mother === human.name);
      let iterSum = sum;

      if (motherName !== undefined) {
        countPeople++;
        iterSum += person.born - motherName.born;
      }

      return iterSum;
    }, 0
  );

  return calcAvarage(ages, countPeople);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
