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
  people.forEach(function(person) {
    person.age = person.died - person.born;
  });

  let men = [];

  people.forEach(function(person) {
    if (person.sex === 'm') {
      men.push(person);
    };
  });

  if (arguments.length === 2) {
    men = men.filter(person => (
      Math.ceil(person.died / 100) === century));
  }

  const ageSum = men.reduce((sum, current) => (
    sum + current.age
  ), 0);

  return ageSum / men.length;
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
  people.forEach(function(person) {
    person.age = person.died - person.born;
  });

  let women = [];

  people.forEach(function(person) {
    if (person.sex === 'f') {
      women.push(person);
    };
  });

  if (withChildren) {
    const someoneMothers = [];

    people.forEach(function(person) {
      someoneMothers.push(person.mother);
    });

    const mothersInArr = [];

    people.forEach(function(person) {
      if (someoneMothers.includes(person.name)) {
        mothersInArr.push(person);
      }
    });
    women = mothersInArr;
  }

  const ageSum = women.reduce((sum, current) => {
    return sum + current.age;
  }, 0);

  return ageSum / women.length;
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
  people.forEach(function(person) {
    person.age = person.died - person.born;
  });

  people.forEach(function(person) {
    const parentName = person.name;

    person.child = people.filter(child => child.mother === parentName);
  });

  const ageDiff = [];

  people.forEach(function(person) {
    let children = [...person.child];

    if (onlyWithSon) {
      children = children.filter(child => child.sex !== 'f');
    }

    const parentBornYear = person.born;

    children.forEach(function(child) {
      ageDiff.push(child.born - parentBornYear);
    });
  });

  const ageSum = ageDiff.reduce((sum, current) => {
    return sum + current;
  }, 0);

  return ageSum / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
