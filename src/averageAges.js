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
  const menAges = men.reduce((acc, { born, died }) => acc + (died - born), 0);

  if (century) {
    const bornCentury = men
      .filter(person => Math.ceil(person.died / 100) === century);
    const averageMenLiveCentury = bornCentury
      .reduce((acc, { born, died }) => acc + (died - born), 0);

    return averageMenLiveCentury / bornCentury.length;
  }

  return (menAges / men.length);
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
  const women = people.filter(person => person.sex === 'f');
  const averageWomenLive = women
    .reduce((acc, { born, died }) => acc + (died - born), 0);

  const realMothers = people.filter(
    person => people.some(x => x.mother === person.name));
  const averageWomenLiveWithChildren = realMothers
    .reduce((acc, { born, died }) => acc + (died - born), 0);

  if (withChildren) {
    return averageWomenLiveWithChildren / realMothers.length;
  } else {
    return (averageWomenLive / women.length);
  }
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
  const mothers = people.filter(
    person => people.some(x => x.mother === person.name)
  );

  if (onlyWithSon) {
    const sons = people.filter(
      person => people.some(child => child.name === person.mother)
        && person.sex === 'm'
    );

    const sonsMother = mothers.reduce(
      (accumulator, mom) => {
        let prev = accumulator;

        sons.forEach(child => {
          if (child.mother === mom.name) {
            prev += child.born - mom.born;
          }
        });

        return prev;
      }, 0);

    return sonsMother / sons.length;
  }

  const children = people.filter(
    person => people.some(child => child.name === person.mother)
  );

  const becameMother = mothers.reduce(
    (accumulator, mom) => {
      let prev = accumulator;

      children.forEach(child => {
        if (child.mother === mom.name) {
          prev += child.born - mom.born;
        }
      });

      return prev;
    }, 0);

  return becameMother / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
