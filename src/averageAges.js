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
  const men = people.filter(
    person => person.sex === 'm'
      && (!century || century === Math.ceil(person.died / 100))
  );

  const menAge = men.map(person => person.died - person.born);

  const sumMenAge = menAge.reduce((prev, next) => prev + next, 0);

  return sumMenAge / menAge.length;
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
  const mothersName = people.map(person => person.mother);

  const women = people.filter(
    person => person.sex === 'f'
      && (!withChildren || mothersName.includes(person.name))
  );

  const womenAge = women.map(person => person.died - person.born);

  const sumWomenAge = womenAge.reduce((prev, next) => prev + next, 0);

  return sumWomenAge / womenAge.length;
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
  const difference = [];

  const children = people.filter(person =>
    person.mother
    && (!onlyWithSon || person.sex === 'm'));

  const mothers = people.filter(
    person => person.sex === 'f'
      && children.find(child => child.mother === person.name)
  );

  mothers.forEach(mother => {
    return children.find(child => {
      if (child.mother === mother.name) {
        difference.push(child.born - mother.born);
      }
    });
  });

  return difference.reduce((prev, next) => (
    prev + next
  ), 0) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
