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
  let onlyMan;

  !century
    ? onlyMan = people.filter(function(person) {
      return person.sex === 'm';
    })
    : onlyMan = people.filter(function(person) {
      return (Math.ceil(person.died / 100) === century) && person.sex === 'm';
    });

  const arrayOfAges = onlyMan.map(function(man) {
    return (man.died - man.born);
  });

  return arrayOfAges.reduce(function(a, b) {
    return a + b;
  }) / arrayOfAges.length;
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
  let onlyWomen;

  !withChildren
    ? onlyWomen = people.filter(function(person) {
      return person.sex === 'f';
    })
    : onlyWomen = people.filter(function(person) {
      const arrayOfChildren = people.map(function(child) {
        return child.mother;
      });

      return arrayOfChildren.includes(person.name) && person.sex === 'f';
    });

  const arrayOfAges = onlyWomen.map(function(woman) {
    return woman.died - woman.born;
  });

  return arrayOfAges.reduce(function(a, b) {
    return a + b;
  }) / arrayOfAges.length;
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
  let arrayOfChildren;

  !onlyWithSon
    ? arrayOfChildren = people.filter(function(person) {
      return person.mother !== null;
    })
    : arrayOfChildren = people.filter(function(person) {
      return person.mother !== null && person.sex === 'm';
    });

  const arrayOfMothers = people.filter(function(person) {
    const children = people.map(function(child) {
      return child.mother;
    });

    return children.includes(person.name) && person.sex === 'f';
  });
  const result = arrayOfChildren.map(function(element) {
    const mother = arrayOfMothers.find(function(mom) {
      return element.mother === mom.name;
    });

    if (mother !== undefined) {
      return element.born - mother.born;
    }
  }).filter(function(value) {
    return value !== undefined;
  });

  return result.reduce(function(a, b) {
    return a + b;
  }) / result.length;
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
