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
  const callback = (accumulator, { born, died }) => {
    return accumulator + (died - born);
  };
  const filterMen = (person) => {
    const centuryComparison = century === Math.ceil(person.died / 100);
    const menFilteredcondition = person.sex === 'm';

    return (century === undefined) ? menFilteredcondition
      : centuryComparison && menFilteredcondition;
  };

  const onlyMenArray = people.filter(filterMen);
  const totalAge = onlyMenArray.reduce(callback, 0);

  return (totalAge / onlyMenArray.length);
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
  let totalAge = 0;
  let finalArray;
  const callback = (accumulator, { born, died }) => {
    return accumulator + (died - born);
  };

  const filterWomen = (person) => {
    const womenFilter = person.sex === 'f';

    return womenFilter;
  };

  function uniqueArray(array) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    const unique = array.filter(onlyUnique);

    return unique;
  }

  if (withChildren) {
    const mothersList = people.map(element => {
      const value = people.find(elem => elem.name === element.mother);

      return value;
    });

    const filteredList = mothersList.filter(element => element !== undefined);

    finalArray = uniqueArray(filteredList);
  } else {
    finalArray = people.filter(filterWomen);
  }

  totalAge = finalArray.reduce(callback, 0);

  return (totalAge / finalArray.length);
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
  let totalAge = 0;

  const listOfIdentities = people.filter(person => {
    return (onlyWithSon) ? person.sex === 'm' : person;
  });
  const mothersList = listOfIdentities.map(person => {
    const motherEntity = people.find(mother => mother.name === person.mother
      && person.mother !== null);

    totalAge += (motherEntity !== undefined)
      ? (person.born - motherEntity.born) : 0;

    return motherEntity;
  });

  const clearedListofMothers = mothersList.filter(element =>
    element !== undefined);

  return totalAge / clearedListofMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
