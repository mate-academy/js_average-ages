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
  const men = people.filter(person => person.sex === 'm');

  const averageMen = +(men.reduce((prev, { died, born }) => (
    prev + (died - born)
  ), 0)
    / men.length).toFixed(2);

  const menFromCentury = men.filter(person =>
    Math.ceil(person.died / 100) === century);

  const averageMenFromCentury = (menFromCentury.reduce((prev, man) => (
    prev + (man.died - man.born)
  ), 0)
  )
    / menFromCentury.length
      .toFixed(2);

  return century ? averageMenFromCentury : averageMen;
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
  const women = people.filter(person => person.sex === 'f');
  const womenAverage = +(women.reduce((prev, { died, born }) => (
    prev + (died - born)
  ), 0)
    / women.length).toFixed(2);

  const womenWithChildren = people.filter(person =>
    person.sex === 'f' && people.find(human => (
      human.mother === person.name
    )));

  const womenWithChildAverage = +(womenWithChildren.reduce(
    (
      prev,
      { died,
        born }
    ) => (
      prev + (died - born)
    ), 0)
    / womenWithChildren.length).toFixed(2);

  return withChildren ? womenWithChildAverage : womenAverage;
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
  const personsWithMother = onlyWithSon
    ? people.filter(person =>
      person.sex === 'm'
      && people.find(mother => person.mother === mother.name))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const diffOfAges = personsWithMother.map(child => {
    const mother = people.find(mom => mom.name === child.mother);

    return child.born - mother.born;
  });

  return +(diffOfAges.reduce((prev, item) => (
    prev + item
  )) / diffOfAges.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
