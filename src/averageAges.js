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
  const filteredPeople = typeof century === 'number'
    ? people.filter(({ died, sex }) => Math.ceil(died / 100) === century
      && sex === 'm')
    : people.filter(({ sex }) => sex === 'm');

  const sumOfYears = filteredPeople
    .reduce((years, man) => years + man.died - man.born, 0);

  return sumOfYears / filteredPeople.length;
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
  const filteredWomens = withChildren
    ? people.filter((person) => (
        people.some(child => child.mother === person.name) 
        && person.sex === 'f';
      ))
    : people.filter((person) => person.sex === 'f');

  const sumOfYears = filteredWomens
    .reduce((years, woman) => years + woman.died - woman.born, 0);

  return sumOfYears / filteredWomens.length;
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
  const children = onlyWithSon
    ? people.filter((person) => {
      return people
        .some(mother => mother.name === person.mother) && person.sex === 'm';
    })
    : people.filter((person) =>
      people.some(mother => mother.name === person.mother));

  const sumOfYears = children.reduce((years, child) => {
    const motherOfChild = people
      .find(women => women.name === child.mother);

    return years + child.born - motherOfChild.born;
  }, 0);

  return sumOfYears / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
