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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(person => {
    const isMan = person.sex === 'm';

    return century
      ? isMan && Math.ceil(person.died / 100) === century
      : isMan;
  });
  const menAgesArray = men.map(person => person.died - person.born);
  const menAvgAge = findAverageAge(menAgesArray);

  return menAvgAge;
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
  const women = people.filter(person => {
    const isWoman = person.sex === 'f';

    return withChildren
      ? isWoman && people.find(woman => woman.mother === person.name)
      : isWoman;
  });
  const womensAgesArray = women.map(person => person.died - person.born);
  const womenAvgAge = findAverageAge(womensAgesArray);

  return womenAvgAge;
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
  const kids = people.filter(kid => {
    const condition = people.find(mother => mother.name === kid.mother);

    return onlyWithSon
      ? condition
        && kid.sex === 'm'
      : condition;
  });
  const averageAgeDifferences = kids.map(
    kid => kid.born - people.find(mother => mother.name === kid.mother).born
  );

  return findAverageAge(averageAgeDifferences);
}

const findAverageAge = persons => {
  const personsAgeSum = persons.reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0);
  const personsAvgAge = personsAgeSum / persons.length;

  return personsAvgAge;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
