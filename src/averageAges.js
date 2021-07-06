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
  const isMale = (sex) => {
    return sex === 'm';
  };

  const isDiedInCentury = (yearOfDeath) => {
    return Math.ceil(yearOfDeath / 100) === century;
  };

  const getLifeDuration = (yearOfBorn, yearOfDie) => {
    return yearOfDie - yearOfBorn;
  };

  const menOnly = people.filter(person => isMale(person.sex));

  const men = century ? menOnly.filter(
    person => isDiedInCentury(person.died)) : menOnly;

  const mensCount = men.length;
  const ageSum = men.reduce(
    (sum, man) => sum + getLifeDuration(man.born, man.died),
    0
  );

  return ageSum / mensCount;
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
  const isFemale = (sex) => {
    return sex === 'f';
  };

  const getLifeDuration = (yearOfBorn, yearOfDie) => {
    return yearOfDie - yearOfBorn;
  };

  const womensOnly = people.filter(person => isFemale(person.sex));

  const womens = withChildren ? womensOnly.filter(
    person => people.some(child => child.mother === person.name)
  ) : womensOnly;

  const womensCount = womens.length;
  const ageSum = womens.reduce(
    (sum, women) => sum + getLifeDuration(women.born, women.died),
    0
  );

  return ageSum / womensCount;
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
  const childrens = onlyWithSon ? people.filter(
    person => person.sex === 'm' && people.find(
      mother => mother.name === person.mother
    )
  )
    : people.filter(
      person => people.find(
        mother => mother.name === person.mother
      )
    );

  const mothers = people.filter(
    person => childrens.find(
      child => child.mother === person.name
    )
  );

  const sumOfAgeDifferences = childrens.reduce(function(acc, child) {
    const motherOfCurrentChild = mothers.find(
      mother => child.mother === mother.name
    );

    return acc + (child.born - motherOfCurrentChild.born);
  }, 0);

  return sumOfAgeDifferences / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
