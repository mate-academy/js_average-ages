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
  const filterMen = people.filter(person =>
    (century
      ? Math.ceil(person.died / 100) === century
      : true
    )
    && person.sex.toLowerCase() === 'm');

  const mensAges = filterMen.map(man => man.died - man.born);

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
  const filterWomen = people.filter(person =>
    (withChildren
      ? people.find(children => children.mother === person.name)
      : true
    )
    && person.sex.toLowerCase() === 'f');

  const womensAges = filterWomen.map(woman => woman.died - woman.born);

  return averageAges(womensAges);
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
  const filterChilds = people.filter(person =>
    (onlyWithSon
      ? person.sex.toLowerCase() === 'm'
      : true
    )
    && people.find(mom => mom.name === person.mother));

  const diffAges = filterChilds.map(child => {
    const filterMother = people.find(person => person.name === child.mother);

    return child.born - filterMother.born;
  });

  return averageAges(diffAges);
}

function averageAges(arrayAges) {
  const sumAges = arrayAges.reduce((sum, year) => sum + year, 0);

  return sumAges / arrayAges.length || 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
