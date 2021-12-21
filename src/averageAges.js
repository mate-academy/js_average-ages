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
    .reduce((years, men) => years + men.died - men.born, 0);

  return sumOfYears / filteredPeople.length;
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
  const listOfMothers = people.reduce((mothers, pupil) => {
    const newListOfMothers = pupil.mother
      ? [...mothers, pupil.mother]
      : [...mothers];

    return newListOfMothers;
  }, []);

  const filteredWomens = withChildren
    ? people.filter((pupil) => {
      return listOfMothers.some(elem => elem === pupil.name)
        && pupil.sex === 'f';
    })
    : people.filter((pupil) => pupil.sex === 'f');

  const sumOfYears = filteredWomens
    .reduce((years, woman) => years + woman.died - woman.born, 0);

  return sumOfYears / filteredWomens.length;
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
  const allMothersNames = people.reduce((mothers, pupil) => {
    const newListOfMothers = pupil.mother
      ? [...mothers, pupil.mother]
      : [...mothers];

    return newListOfMothers;
  }, []);

  const womensWithChild = people.filter((pupil) => {
    return allMothersNames.some(elem => elem === pupil.name)
        && pupil.sex === 'f';
  });

  const listOfChildren = onlyWithSon
    ? people.reduce((children, pupil) => {
      const newListOfChildren = womensWithChild
        .some(mother => mother.name === pupil.mother) && pupil.sex === 'm'
        ? [...children, { ...pupil }]
        : [...children];

      return newListOfChildren;
    }, [])
    : people.reduce((children, pupil) => {
      const newListOfChildren = womensWithChild
        .some(mother => mother.name === pupil.mother)
        ? [...children, { ...pupil }]
        : [...children];

      return newListOfChildren;
    }, []);

  const sumOfYears = listOfChildren.reduce((years, child) => {
    const motherOfChild = womensWithChild
      .find(women => women.name === child.mother);

    return years + child.born - motherOfChild.born;
  }, [0]);

  return sumOfYears / listOfChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
