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
function calculateAverageAge(people) {
  return (
    people
      .map((person) => person.died - person.born)
      .reduce((acc, curr) => acc + curr, 0) / people.length
  );
}

function calculateMenAverageAge(people, century) {
  if (!century) {
    const men = people.filter((person) => person.sex === 'm');

    return calculateAverageAge(men);
  } else {
    const men = people.filter(
      (person) => person.sex === 'm' && Math.ceil(person.died / 100) === century
    );

    return calculateAverageAge(men);
  }

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  if (!withChildren) {
    const women = people.filter((person) => person.sex === 'f');

    return calculateAverageAge(women);
  } else {
    const women = [];

    for (let i = 0; i < people.length; i++) {
      for (let y = 0; y < people.length; y++) {
        if (people[i].name === people[y].mother) {
          women.push(people[i]);
        }
      }
    }

    return calculateAverageAge(
      women.filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
    );
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
  const mothersAges = [];

  if (!onlyWithSon) {
    for (let i = 0; i < people.length; i++) {
      for (let y = 0; y < people.length; y++) {
        if (people[i].name === people[y].mother) {
          mothersAges.push(people[y].born - people[i].born);
        }
      }
    }
  } else {
    for (let i = 0; i < people.length; i++) {
      for (let y = 0; y < people.length; y++) {
        if (people[i].name === people[y].mother && people[y].sex === 'm') {
          mothersAges.push(people[y].born - people[i].born);
        }
      }
    }
  }

  return (mothersAges
    .reduce((acc, curr) => acc + curr, 0))
     / mothersAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
