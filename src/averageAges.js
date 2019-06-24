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
function findPersonAverageAge(arr) {
  return arr.reduce((personAverageAge, item, i, array) => {
    let avgAge = personAverageAge;
    avgAge += (item.died - item.born) / array.length;

    return avgAge;
  }, 0);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with logical operators (&&, ||)
  // or ternary operator (?:)
  // without nesting

  const menArr = people.filter((item) => {
    return item.sex === 'm';
  });

  if (century) {
    const menFromCentury = menArr.filter((item) => {
      return Math.ceil(item.died / 100) === century;
    });

    return findPersonAverageAge(menFromCentury);
  }

  return findPersonAverageAge(menArr);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const womenArr = people.filter((item) => {
    return item.sex === 'f';
  });

  if (withChildren) {
    const mothers = people.filter((item) => {
      return (people.some((i) => {
        return i.mother === item.name;
      }));
    });

    return findPersonAverageAge(mothers);
  }

  return findPersonAverageAge(womenArr);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  // write code here
  const mothers = people.filter((item) => {
    return (people.some((i) => {
      return i.mother === item.name;
    }));
  });

  let mother = [];
  const ageDiff = people.reduce((res, i) => {
    mother = (mothers.find((item) => {
      return (i.mother === item.name);
    }));

    if (onlyWithSon) {
      mother = (mothers.find((item) => {
        return (i.mother === item.name) && i.sex === 'm';
      }));
    }

    if (mother) {
      res.push(i.born - mother.born);
    }

    return res;
  }, []);

  const result = ageDiff.reduce((averageAgeDiff, item) => {
    let avgAgeDiff = averageAgeDiff;
    avgAgeDiff += item;

    return avgAgeDiff;
  });

  return result / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
