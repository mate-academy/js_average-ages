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
  const men = people.filter(person => person.sex === 'm');
  let result = 0;

  if (!century) {
    const ageOfDeath = men.map(person => person.died - person.born);
    const sumAge = ageOfDeath.reduce((sum, curent) => sum + curent, 0);

    result = sumAge / men.length;
  } else {
    const startCenture = century - 1 + '01';
    const endCenture = century + '00';
    const centureResultArr = men.filter(pers =>
      pers.died > startCenture && pers.died < endCenture
    );
    const ageOfDeath = centureResultArr.map(pers => pers.died - pers.born);
    const sumAge = ageOfDeath.reduce((sum, curent) => sum + curent, 0);

    result = sumAge / centureResultArr.length;
  }

  return result;
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
  const women = people.filter(person => person.sex === 'f');
  let result = 0;

  if (!withChildren) {
    const ageOfDeath = women.map(person => person.died - person.born);
    const sumAge = ageOfDeath.reduce((sum, curent) => sum + curent, 0);

    result = sumAge / women.length;
  } else {
    const mothers = people.map(x => x.mother);
    const mothersWithChild = people.filter(x => mothers.includes(x.name));
    const ageOfDeath = mothersWithChild.map(person =>
      person.died - person.born
    );
    const sumAge = ageOfDeath.reduce((sum, curent) => sum + curent, 0);

    result = sumAge / mothersWithChild.length;
  }

  return result;
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
  let result = 0;
  const children = people.filter(child => people.some(mother =>
    mother.name === child.mother)
  );

  if (!onlyWithSon) {
    const sumAge = children.reduce((sum, child) => {
      const mothers = people.find(mother => mother.name === child.mother);

      return sum + (child.born - mothers.born);
    }, 0);

    result = sumAge / children.length;
  } else {
    const childrenSon = children.filter(child => child.sex === 'm');
    const sumAge = childrenSon.reduce((sum, child) => {
      const mothers = people.find(mother => mother.name === child.mother);

      return sum + (child.born - mothers.born);
    }, 0);

    result = sumAge / childrenSon.length;
  }

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
