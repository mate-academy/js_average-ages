
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

function calculateAverageAge(persons) {
  const summAge = persons.reduce((prev, current) => {
    return prev + current.died - current.born;
  }, 0);

  return summAge / persons.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(man => {
    if (century) {
      return (man.sex === 'm' && Math.ceil(man.died / 100) === century);
    }

    return man.sex === 'm';
  });

  return calculateAverageAge(men);
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

  return calculateAverageAge(women);
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
  const mothers = people.filter(mother => {
    return people.find(child => {
      return mother.name === child.mother;
    });
  });

  const children = people.filter(child => {
    return people.find(mother => {
      if (onlyWithSon) {
        return child.mother === mother.name && child.sex === 'm';
      }

      return child.mother === mother.name;
    });
  });

  const summDifAges = mothers.reduce((prevMother, currentMother) => {
    const motherChilds = children.filter(child => {
      return currentMother.name === child.mother;
    });

    const differenceAge = motherChilds.reduce((prev, currentChild) => {
      return prev + currentChild.born - currentMother.born;
    }, 0);

    return differenceAge + prevMother;
  }, 0);

  return summDifAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
