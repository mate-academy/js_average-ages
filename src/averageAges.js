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
  let averageAge = 0;
  let total = 0;

  const menDiedInCentury = century ? people.filter(person => {
    return (person.sex === 'm' && Math.ceil(person.died / 100) === century);
  }) : people.filter(person => {
    return person.sex === 'm';
  });

  total = menDiedInCentury.reduce((sum, man) => {
    return sum + (man.died - man.born);
  }, 0);

  averageAge = total / menDiedInCentury.length;

  return averageAge;
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
  let averageAge = 0;
  let total = 0;

  const womenWithChildren = withChildren ? people.filter(person => {
    return person.sex === 'f' && people.find(child => {
      return child.mother === person.name;
    });
  }) : people.filter(person => {
    return person.sex === 'f';
  });

  total = womenWithChildren.reduce((sum, woman) => {
    return sum + (woman.died - woman.born);
  }, 0);

  averageAge = total / womenWithChildren.length;

  return averageAge;
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
  let averageAgeDifference = 0;
  let total = 0;

  const differenceWithSons = onlyWithSon ? people.filter(person => {
    return person.sex === 'm' && people.find(mother => {
      return mother.name === person.mother;
    });
  }) : people.filter(person => {
    return people.find(mother => {
      return person.mother === mother.name;
    });
  });

  total = differenceWithSons.reduce((sum, person) => {
    return sum + (person.born - people.find(mother => {
      return person.mother === mother.name;
    }).born);
  }, 0);

  averageAgeDifference = total / differenceWithSons.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
