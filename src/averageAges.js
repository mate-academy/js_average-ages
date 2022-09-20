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
  let men;

  century ? (men = people.filter(person => {
    return person.sex === 'm' && century === Math.ceil(person.died / 100);
  })) : (men = people.filter(person => {
    return person.sex === 'm';
  }));

  const menAges = men.map(oneMan => oneMan.died - oneMan.born);

  const totalAverageAge = menAges.reduce((sum, currentAge) => {
    return sum + currentAge;
  }, 0);

  const averageAge = totalAverageAge / menAges.length;

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
  const women = withChildren
    ? (people.filter(({ name }) => {
      return people.some(child => child.mother === name);
    })) : (people.filter(person => {
      return (person.sex === 'f');
    }));

  const womenAges = women.map(oneWoman => oneWoman.died - oneWoman.born);

  const totalAverageAge = womenAges.reduce((sum, currentAge) => {
    return sum + currentAge;
  }, 0);

  const averageAge = totalAverageAge / womenAges.length;

  return averageAge;
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
  const kids = onlyWithSon
    ? (people.filter(child => {
      return child.sex === 'm'
      && people.some(mom => child.mother === mom.name);
    })) : (people.filter((child) => {
      return people.some(mom => mom.name === child.mother);
    }));

  return kids.reduce((sum, child) => {
    const mother = people.find(mom => {
      return child.mother === mom.name;
    });

    return sum + child.born - mother.born;
  }, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
