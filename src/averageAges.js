'use strict';

function filterSex(people, sex) {
  return people.filter(el => {
    return el.sex === sex;
  });
}

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
  const filteredGender = filterSex(people, 'm').filter(el => {
    return century ? Math.ceil((el.died + 1) / 100) === century : true;
  });

  const result = filteredGender.reduce((sum, x) => sum + x.died - x.born, 0);
  const average = result / filteredGender.length;

  return +average.toFixed(2);
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
  let filteredGender = filterSex(people, 'f');

  if (withChildren) {
    filteredGender = filteredGender.filter(mother => {
      return !!people.find(child => {
        return child.mother === mother.name;
      });
    });
  }

  const result = filteredGender.reduce((sum, x) => sum + x.died - x.born, 0);
  const average = result / filteredGender.length;

  return +average.toFixed(2);
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
  let filteredPeople = people.filter(child => {
    return !!people.find(person => {
      return person.name === child.mother;
    });
  });

  if (onlyWithSon) {
    filteredPeople = filterSex(filteredPeople, 'm');
  }

  filteredPeople.map(child => {
    const mother = people.find(person => {
      return person.name === child.mother;
    });

    child.bornAge = child.born - mother.born;
  });

  const result = filteredPeople.reduce((sum, x) => sum + x.bornAge, 0);
  const average = result / filteredPeople.length;

  return +average.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
