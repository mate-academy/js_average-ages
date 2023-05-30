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
  const filteredMen = people.filter(person =>
    (century
      ? Math.ceil(person.died / 100) === century
      : true
    )
    && person.sex.toLowerCase() === 'm');

  const mensAges = filteredMen.map(man => man.died - man.born);

  return averageAges(mensAges);
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
  const filteredWomen = people.filter(person =>
    (withChildren
      ? people.find(children => children.mother === person.name)
      : true
    )
    && person.sex.toLowerCase() === 'f');

  const womenAges = filteredWomen.map(woman => woman.died - woman.born);

  return averageAges(womenAges);
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
  const filteredChildren = people.filter(person =>
    (onlyWithSon
      ? person.sex.toLowerCase() === 'm'
      : true
    )
    && people.find(mom => mom.name === person.mother));

  const diffAges = filteredChildren.map(child => {
    const filterMother = people.find(person => person.name === child.mother);

    return child.born - filterMother.born;
  });

  return averageAges(diffAges);
}

function averageAges(ages) {
  const sumAges = ages.reduce((sum, age) => sum + age, 0);

  return sumAges / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
