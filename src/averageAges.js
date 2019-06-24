'use strict';
/**
 * @return {number}
 * @param peopleList
 */
const average = (people, length) => {
  return people.reduce((sum, item) => {
    return sum + item.died - item.born;
  }, 0) / length;
};

function calculateMenAverageAge(people, century) {
  let filteredPeople = people.filter(item => item.sex === 'm');
  if (century) {
    filteredPeople = filteredPeople.filter((item) => {
      return Math.ceil(item.died / 100) === century;
    });
  }
  return average(filteredPeople, filteredPeople.length);
}
/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let filteredPeople = people.filter(item => item.sex === 'f');
  if (withChildren) {
    filteredPeople = filteredPeople.filter((item) => {
      let mother = people.find(p => p.mother === item.name);
      return !!mother;
    });
  }
  return average(filteredPeople, filteredPeople.length);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let count = 0;
  const averageDiff = people.reduce((sum, child) => {
    let mother = people.find((person) => {
      return person.name === child.mother;
    });
    if (onlyWithSon && child.sex !== 'm') {
      mother = false;
    }
    if (mother) {
      count++;
      return sum + child.born - mother.born;
    }
    return sum;
  }, 0) / count;
  return averageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
};
