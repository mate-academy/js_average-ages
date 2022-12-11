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
  const allMenAge = people.filter(person => {
    const isMan = person.sex === 'm';

    return century
      ? (Math.ceil(person.died / 100) === century) && isMan
      : isMan;
  });

  return getAverage(getAges(allMenAge));
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
  const allWomenAge = people
    .filter(person => {
      const isWoman = person.sex === 'f';

      return withChildren
        ? people.find(women => person.name === women.mother) && isWoman
        : isWoman;
    });

  return getAverage(getAges(allWomenAge));
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
  const allWomenAge = people
    .filter(person => {
      const womanWithChild = people.some(women => women.name === person.mother);

      return onlyWithSon
        ? womanWithChild && person.sex === 'm' : womanWithChild;
    });

  const ageDif = allWomenAge.map(child => child.born - people.find(mother =>
    mother.name === child.mother).born);

  return getAverage(ageDif);
}

const getAverage = (people) => {
  return people.reduce((acc, age) => acc + age, 0) / people.length;
};
const getAges = (people) => {
  return people.map(person => person.died - person.born);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
