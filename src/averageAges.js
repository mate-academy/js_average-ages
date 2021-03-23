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
  let arr = [];
  const type = typeof century;

  switch (type) {
    case 'number':
      arr = people.filter((person) => {
        return (person.sex === 'm' && Math.ceil(person.died / 100) === century);
      });
      break;
    default:
      arr = people.filter((person) => {
        return (person.sex === 'm');
      });
      break;
  }

  const sum = arr.reduce((accum, men) => {
    return accum + (men.died - men.born);
  }, 0);

  return +(sum / arr.length).toFixed(2);

  // let count = 0;
  // const sum = people.reduce((accum, person) => {
  //   if (century && person.sex === 'm') {
  //     if (Math.ceil(person.died / 100) === century) {
  //       count++;

  //       return (accum + person.died - person.born);
  //     } else {
  //       return accum;
  //     }
  //   } else if (person.sex === 'm') {
  //     count++;

  //     return (accum + person.died - person.born);
  //   } else {
  //     return accum;
  //   }
  // }, 0);

  // return +(sum / count).toFixed(2);
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
  let arr = [];

  switch (withChildren) {
    case true:
      arr = people.filter((person) => {
        return (person.sex === 'f' && people.some(child => {
          return (person.name === child.mother);
        }));
      });
      break;
    default:
      arr = people.filter((person) => {
        return (person.sex === 'f');
      });
      break;
  }

  const sum = arr.reduce((accum, women) => {
    return accum + (women.died - women.born);
  }, 0);

  return +(sum / arr.length).toFixed(2);
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
  let arr = [];

  switch (onlyWithSon) {
    case true:
      arr = people.filter((person) => {
        return (person.sex === 'm' && person.mother !== null
        && people.find((item) => {
          return item.name === person.mother;
        }));
      });
      break;
    default:
      arr = people.filter((person) => {
        return (person.mother !== null && people.find((item) => {
          return item.name === person.mother;
        }));
      });
      break;
  }

  const sum = arr.reduce((accum, child) => {
    const mother = people.find((person) => {
      return person.name === child.mother;
    });

    return accum + (child.born - mother.born);
  }, 0);

  return sum / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
