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
const male = person => person.sex === 'm';
const female = person => person.sex === 'f';

const calculateAverage = (ages) => {
  const averageAge = ages
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0) / ages.length;

  return averageAge;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(person =>
    century
      ? male(person) && Math.ceil(person.died / 100) === century
      : male(person)
  );

  return calculateAverage(men);
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
  // write code here
  const women = people.filter(person =>
    withChildren
      ? female(person) && people.some(kid => kid.mother === person.name)
      : female(person)
  );

  return calculateAverage(women);
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
  // write code here
  const kids = people.filter(kid =>
    people.some(person => kid.mother === person.name)
    && (onlyWithSon ? male(kid) : true)
  );

  const ageGap = kids.map(kid => {
    const mother = people.find(person => person.name === kid.mother);

    return kid.born - mother.born;
  });

  return ageGap.reduce((a, b) => a + b) / ageGap.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
