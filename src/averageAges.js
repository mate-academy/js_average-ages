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
  const manCount = people.filter(function(person) {
    if (!century) {
      return person.sex === 'm';
    }

    return person.sex === 'm' && Math.ceil(person.died / 100) === century;
  });

  const ages = manCount.map(function(person) {
    return person.died - person.born;
  });

  const totalAges = ages.reduce(function(startValue, manAges) {
    return (startValue + manAges);
  }, 0);

  return totalAges / manCount.length;
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
  const females = people.filter(function(person) {
    if (withChildren) {
      return person.sex === 'f' && people.some(function(child) {
        return child.mother === person.name;
      });
    }

    return person.sex === 'f';
  });

  const ages = females.map(person => person.died - person.born);
  const totalAges = ages.reduce(function(startValue, womanAges) {
    return startValue + womanAges;
  }, 0);

  return totalAges / females.length;
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
  const children = people.filter(function(person) {
    if (onlyWithSon) {
      return people.some(function(woman) {
        return person.mother === woman.name && person.sex === 'm';
      });
    };

    return people.some(function(woman) {
      return person.mother === woman.name;
    });
  });

  const ages = children.map(function(kid) {
    return kid.born - motherAge(people, kid.mother);
  });

  return ages.reduce((acc, age) => acc + age) / children.length;
}

function motherAge(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  return mother.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
