
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
  const men = people.filter(elem => {
    if (century) {
      return (elem.sex === 'm' && Math.ceil(elem.died / 100) === century);
    }

    return elem.sex === 'm';
  });

  const summAge = men.reduce((prev, current, index) => {
    return prev + current.died - current.born;
  }, 0);

  return +(summAge / men.length).toFixed(2);
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
  const women = people.filter(elem => {
    if (withChildren) {
      return people.find(child => {
        return elem.name === child.mother;
      });
    }

    return elem.sex === 'f';
  });

  const summAge = women.reduce((prev, current) => {
    return prev + current.died - current.born;
  }, 0);

  return +(summAge / women.length).toFixed(2);
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
  const mothers = people.filter(elem => {
    return people.find(child => {
      return elem.name === child.mother;
    });
  });

  const childs = people.filter(elem => {
    return people.find(child => {
      if (onlyWithSon) {
        return elem.mother === child.name && elem.sex === 'm';
      }

      return elem.mother === child.name;
    });
  });

  const summDifAges = mothers.reduce((prevMother, currentMother) => {
    const motherChilds = childs.filter(child => {
      return currentMother.name === child.mother;
    });

    const differenceAge = motherChilds.reduce((prev, currentChild) => {
      return prev + currentChild.born - currentMother.born;
    }, 0);

    return differenceAge + prevMother;
  }, 0);

  return +(summDifAges / childs.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
