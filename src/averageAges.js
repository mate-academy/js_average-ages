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

  const allMale = people.filter(person => {
    if (century === undefined) {
      return person.sex === 'm';
    } else {
      return person.sex === 'm'
        && (Math.floor(person.born / 100)
        && Math.floor(person.died / 100)) === century - 1;
    }
  });

  const age = allMale.map(person => {
    return person.died - person.born;
  });

  const sumAge = age.reduce((item, value) => item + value, 0);

  const averageAge = sumAge / age.length;

  return averageAge;
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

  const allFamale = people.filter(item => {
    if (withChildren === undefined) {
      return item.sex === 'f';
    } else {
      return item.sex === 'f' && people.some(children => {
        return children.mother === item.name;
      });
    }
  });

  const ageFamale = allFamale.map(item => {
    return item.died - item.born;
  });

  const sumAgeF = ageFamale.reduce((item, value) => item + value, 0);

  const averageAgeF = sumAgeF / ageFamale.length;

  return averageAgeF;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  let withMother = people.map((child) => {
    const mother = people.find((person) => person.name === child.mother);
    const motherBorn = mother ? mother.born : null;

    return {
      ...child,
      motherInfo: motherBorn,
    };
  });

  if (onlyWithSon) {
    withMother = withMother.filter((man) => {
      return man.sex === 'm';
    });
  }

  withMother = withMother.filter((bithday) => {
    return bithday.motherInfo;
  });

  const everyAverageAge = withMother.reduce((previousAge, currentAge) => {
    return previousAge + (currentAge.born - currentAge.motherInfo);
  }, 0) / withMother.length;

  return everyAverageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
