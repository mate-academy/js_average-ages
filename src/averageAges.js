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
  let sumOfMenAges;
  let averageManAge;
  const menDiedInGivenCentury = men.filter(person => (
    Math.ceil(person.died / 100) === century
  ));

  function getAverageAge(mans) {
    sumOfMenAges = mans.reduce((acc, person) => {
      return acc + (person.died - person.born);
    }, 0);
    averageManAge = sumOfMenAges / mans.length;

    return averageManAge;
  }

  return !century ? getAverageAge(men) : getAverageAge(menDiedInGivenCentury);
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
  const womanWithChild = women.filter(person => (
    people.some(child => child.mother === person.name)
  ));
  let sumOfWomanAges;
  let averageWomanAge;

  function getAverageAge(womans) {
    sumOfWomanAges = womans.reduce((acc, person) => {
      return acc + (person.died - person.born);
    }, 0);
    averageWomanAge = sumOfWomanAges / womans.length;

    return averageWomanAge;
  }

  return !withChildren ? getAverageAge(women) : getAverageAge(womanWithChild);
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
  let averageAge;
  let diffInAgeMomsAndChildrens;
  const women = people.filter(person => person.sex === 'f');
  const sons = people.filter(child => (
    women.some(mother => mother.name === child.mother) && child.sex === 'm'
  ));
  const children = people.filter(child => (
    women.some(mother => mother.name === child.mother)
  ));

  function getAverageAgeDiff(childs) {
    diffInAgeMomsAndChildrens = childs.map(child => {
      const mother = women.filter(person => person.name === child.mother);

      return child.born - mother[0].born;
    });

    averageAge = diffInAgeMomsAndChildrens.reduce((acc, diff) =>
      (acc + diff), 0) / diffInAgeMomsAndChildrens.length;

    return averageAge;
  }

  return !onlyWithSon ? getAverageAgeDiff(children) : getAverageAgeDiff(sons);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
