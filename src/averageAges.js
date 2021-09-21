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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century);
  };

  const menYear = men.map(man => {
    return man.died - man.born;
  });
  const middleYears
  = +((menYear.reduce((a, b) => a + b)) / menYear.length).toFixed(2);

  return middleYears;
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
  const womanYear = women.map(man => {
    return man.died - man.born;
  });
  const middleYears
  = +((womanYear.reduce((a, b) => a + b)) / womanYear.length).toFixed(2);

  if (withChildren) {
    const motherWith = women.filter(woman => people.find(person => {
      if (person.mother) {
        if ((woman.name === (person.mother))) {
          return true;
        }

        return false;
      }
    }));

    const womanYearWith = motherWith.map(man => {
      return man.died - man.born;
    });
    const middleYearsWith
    = +((womanYearWith.reduce((a, b) => a + b))
    / womanYearWith.length).toFixed(2);

    return middleYearsWith;
  }

  return middleYears;
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
  const women = people.filter(person => person.sex === 'f');
  const mothers = women.filter(woman => people.find(person => {
    if (person.mother && woman.name === person.mother) {
      return true;
    }
  }));

  let childrens = people.filter(person => mothers.find(mother => {
    if (mother.name && person.mother === mother.name) {
      return true;
    }
  }));

  if (onlyWithSon) {
    childrens = people.filter(person => mothers.find(mother => {
      if (mother.name && person.mother === mother.name && person.sex === 'm') {
        return true;
      }
    }));
  }

  const difference = childrens.map(children => mothers.map(mother => {
    if (children.mother === mother.name) {
      return children.born - mother.born;
    }

    return 0;
  }));
  const result = +(difference
    .map(item => (item.reduce((a, b) => a + b, 0)))
    .reduce((a, b) => a + b, 0) / childrens.length)
    .toFixed(2);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
