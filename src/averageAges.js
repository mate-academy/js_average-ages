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
  let menList = [];

  if (arguments.length > 1) {
    menList = people.filter(person => {
      if (Math.ceil(person.died / 100) === century) {
        return person.sex === 'm';
      }
    });
  } else {
    menList = people.filter(person => person.sex === 'm');
  }

  const menAgesList = menList.map(person => {
    return person.died - person.born;
  });
  const sumOfAges = menAgesList.reduce((prev, person) => {
    return prev + person;
  });

  return sumOfAges / menAgesList.length;
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
  let womenList = [];

  if (arguments.length > 1) {
    womenList = people.filter(mother => {
      return people.find(child => mother.name === child.mother);
    });
  } else {
    womenList = people.filter(person => person.sex === 'f');
  }

  const womenAgesList = womenList.map(person => person.died - person.born);
  const sumOfAges = womenAgesList.reduce((prev, person) => {
    const step = prev + person;

    return step;
  });

  return sumOfAges / womenAgesList.length;
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
  let childrenList = [];

  if (arguments.length > 1) {
    childrenList = people.filter(child => child.sex === 'm'
    && people.find(mother => mother.name === child.mother));
  } else {
    childrenList = people.filter(child => people.find(mother => {
      return mother.name === child.mother;
    }));
  }

  const ageDiffList = childrenList.map(child => {
    const motherOfChild = people.find(mother => mother.name === child.mother);

    return child.born - motherOfChild.born;
  });

  const ageDiffSum = ageDiffList.reduce((prev, ageDiff) => {
    const step = prev + ageDiff;

    return step;
  });

  return ageDiffSum / ageDiffList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
