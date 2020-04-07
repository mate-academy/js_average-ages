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
  // eslint-disable-next-line max-len
  // replace `if ()` statement with logical operators (&&, ||) or ternary operator (?:)
  // without nesting
  const menArray = people.filter(obj => obj.sex === 'm');
  const menAge = [];

  if (century === undefined) {
    menArray.forEach(item => {
      menAge.push(item.died - item.born);
    });

    return menAge.reduce((a, b) => a + b) / menAge.length;
  } else {
    const manArrayCentury = menArray
      .filter(obj => Math.ceil(obj.died / 100) === century);

    manArrayCentury.forEach(item => {
      menAge.push(item.died - item.born);
    });

    return menAge.reduce((a, b) => a + b) / menAge.length;
  }
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
  const womenArray = people.filter(obj => obj.sex === 'f');
  const womenAge = [];

  if (withChildren === undefined) {
    womenArray.forEach(item => {
      womenAge.push(item.died - item.born);
    });

    return womenAge.reduce((a, b) => a + b) / womenAge.length;
  } else {
    const womenWithChildren = womenArray.filter(obj => {
      for (const person of people) {
        if (obj.name === person.mother) {
          return obj;
        }
      }
    });

    womenWithChildren.forEach(item => {
      womenAge.push(item.died - item.born);
    });

    return womenAge.reduce((a, b) => a + b) / womenAge.length;
  }
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
  const womenArray = people.filter(obj => obj.sex === 'f');
  const middleAge = [];
  const womenWithChildren = womenArray.filter(obj => {
    for (const person of people) {
      if (obj.name === person.mother) {
        return obj;
      }
    }
  });

  if (onlyWithSon === undefined) {
    womenWithChildren.map(mother => {
      for (const child of people) {
        if (mother.name === child.mother) {
          middleAge.push(child.born - mother.born);
        }
      }
    });

    return middleAge.reduce((a, b) => a + b) / middleAge.length;
  } else {
    womenWithChildren.map(mother => {
      for (const child of people) {
        if (mother.name === child.mother && child.sex === 'm') {
          middleAge.push(child.born - mother.born);
        }
      }
    });

    return middleAge.reduce((a, b) => a + b) / middleAge.length;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
