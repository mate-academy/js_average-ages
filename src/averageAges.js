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
  if (century !== undefined) {
    const manArrCentury = people.filter((person) => {
      return person.sex === 'm' && (Math.ceil(person.died / 100)) === century;
    });

    const reducedMan = manArrCentury.reduce(function(person1, person2) {
      return person1 + (person2.died - person2.born);
    }, 0);

    return reducedMan / manArrCentury.length;
  }

  const manArr = people.filter((person) => {
    return person.sex === 'm';
  });

  const newarr = manArr.reduce(function(person1, person2) {
    return person1 + (person2.died - person2.born);
  }, 0);

  return newarr / manArr.length;
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
  if (withChildren === true) {
    const ArrMothers = people.filter((person, index,) => {
      return person.sex === 'f'
      && people.find(
        (child) => child.mother === person.name);
    });

    const reducedMothers
    = ArrMothers.reduce(function(person1, person2) {
      return person1 + (person2.died - person2.born);
    }, 0);

    return (reducedMothers / ArrMothers.length);
  }

  const manArr = people.filter((person) => {
    return person.sex === 'f';
  });

  const newarr = manArr.reduce(function(person1, person2) {
    return person1 + (person2.died - person2.born);
  }, 0);

  return newarr / manArr.length;
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
  if (onlyWithSon !== undefined) {
    const motherSon = people.map((child) =>
      [child, people.find(
        (mother) => mother.name === child.mother && child.sex === 'm')]);

    const filteredMotherSon = motherSon.filter((person) => {
      return !person.includes(undefined);
    });

    const agesMotherSon = filteredMotherSon.map((person) => {
      return person[0].born - person[1].born;
    });

    const sumMotherSon = agesMotherSon.reduce((a, b) => a + b, 0);

    return sumMotherSon / agesMotherSon.length;
  }

  const mapedArr = people.map((a) =>
    [a, people.find(
      (child) => child.name === a.mother)]);

  const filtered = mapedArr.filter((person) => {
    return !person.includes(undefined);
  });

  const ages = filtered.map((person) => {
    return person[0].born - person[1].born;
  });

  const sum = ages.reduce((a, b) => a + b, 0);

  return sum / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
