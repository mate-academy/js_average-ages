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
  let men = people.filter((man) => {
    return man.sex === 'm';
  });

  if (century) {
    men = men.filter(man => {
      return Math.ceil(man.died / 100) === century;
    });
  }

  return calcAvarageAge(men);

  // console.log(people, century);
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let women = people.filter((woman) => {
    return woman.sex === 'f';
  });

  if (withChildren) {
    women = women.filter(woman => {
      return people.find(person => person.mother === woman.name);
    });
  }

  return calcAvarageAge(women);
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
  const children = people.filter(child => {
    return people.some(mother => {
      if (onlyWithSon) {
        return child.sex === 'm' && child.mother === mother.name;
      } else {
        return child.mother === mother.name;
      }
    });
  });
  const ageDifference = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  return ageDifference.reduce((a, b) => a + b) / ageDifference.length;
}

function calcAvarageAge(humans) {
  const age = humans.map(person => {
    return person.died - person.born;
  });
  const sum = age.reduce((prev, curr) => prev + curr, 0);

  return sum / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
