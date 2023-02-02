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
  const diedPeople = people.filter(e => {
    const deathCentury = Math.ceil(e.died / 100);

    // All men are included if second argument was not passed
    if (century === deathCentury || century === undefined) {
      return e.sex === 'm';
    }
  });

  const ageSum = diedPeople.reduce((acc, item) => {
    return acc + (item.died - item.born);
  }, 0);

  return Number((ageSum / diedPeople.length).toFixed(2));
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
  // All women who are mothers
  const mothersList = people.map(e => {
    return e.mother;
  });

  // If withChildren check if woman is a mother
  // Otherwise return all women
  const women = people.filter(e => {
    return withChildren ? mothersList.includes(e.name) : e.sex === 'f';
  });

  const ageSum = women.reduce((acc, item) => {
    return acc + (item.died - item.born);
  }, 0);

  return Number((ageSum / women.length).toFixed(2));
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
  let amountFamilies = 0;

  const sumDiffs = people.reduce((acc, child) => {
    let indexMother = 0;
    let ageDiff = 0;

    // To get index of woman which is mother of someone
    if (onlyWithSon) {
      indexMother = people.findIndex(mother => {
        return mother.name === child.mother && child.sex === 'm';
      });
    } else {
      indexMother = people.findIndex(mother => mother.name === child.mother);
    }

    // If woman is mother then calculate difference in age
    if (indexMother !== -1) {
      amountFamilies++;
      ageDiff += child.born - people[indexMother].born;
    };

    return acc + ageDiff;
  }, 0);

  return Number((sumDiffs / amountFamilies).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
