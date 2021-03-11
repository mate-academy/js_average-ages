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
  const ages = [];
  let count = 0;

  people.forEach(item => {
    const check = century
      ? item.sex === 'm'
      && century === Math.ceil(item.died / 100)
      : item.sex === 'm';

    if (check) {
      ages.push(item.died - item.born);
      count++;
    }
  });

  const averageAge = ages.reduce((acc, curr) => acc + curr) / count;

  return averageAge;
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
  const ages = [];
  const womenNames = [];
  const childsMothers = [];
  const mothersNames = [];
  let count = 0;

  people.forEach(item => {
    if (item.sex === 'f') {
      womenNames.push(item.name);
    }

    childsMothers.push(item.mother);
  });

  womenNames.forEach(item => {
    if (childsMothers.includes(item)) {
      mothersNames.push(item);
    }
  });

  people.forEach(item => {
    const check = withChildren
      ? item.sex === 'f' && mothersNames.includes(item.name)
      : item.sex === 'f';

    if (check) {
      ages.push(item.died - item.born);
      count++;
    }
  });

  const averageAge = ages.reduce((acc, curr) => acc + curr) / count;

  return averageAge;
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
  const childsMotherAndBorn = [];
  const mothersNameAndBorn = [];
  const ages = [];

  people.forEach(item => {
    const check = onlyWithSon
      ? item.sex === 'm' && item.sex !== 'f'
      : item.sex;

    if (item.sex === 'f') {
      mothersNameAndBorn.push([item.name, item.born]);
    }

    if (check) {
      childsMotherAndBorn.push([item.mother, item.born]);
    }
  });

  for (let i = 0; i < mothersNameAndBorn.length; i++) {
    for (let j = 0; j < childsMotherAndBorn.length; j++) {
      if (childsMotherAndBorn[j].includes(mothersNameAndBorn[i][0])) {
        ages.push(childsMotherAndBorn[j][1] - mothersNameAndBorn[i][1]);
      }
    }
  }

  const averageAge = ages.reduce((acc, curr) => acc + curr) / ages.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
