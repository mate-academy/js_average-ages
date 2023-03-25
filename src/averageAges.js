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
  let filteredPeople = JSON.parse(JSON.stringify(people));

  if (century) {
    const centuryToLowYear = (century * 100) - 100;
    const centuryToHighYear = century * 100;

    filteredPeople = filteredPeople.filter(person =>
      person.sex === 'm' && person.died > centuryToLowYear
      && person.died < centuryToHighYear
    );
  }

  filteredPeople = filteredPeople.filter(person => person.sex === 'm');

  return filteredPeople.reduce((accum, curr) => accum + (curr.died - curr.born), 0) / filteredPeople.length; // eslint-disable-line
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
  let filteredPeople = JSON.parse(JSON.stringify(people));

  if (withChildren) {
    filteredPeople = filteredPeople.filter(person =>
      person.sex === 'f' && filteredPeople.find(child =>
        child.mother === person.name
      )
    );
  }

  filteredPeople = filteredPeople.filter(person => person.sex === 'f');

  return filteredPeople.reduce((accum, curr) => accum + (curr.died - curr.born), 0) / filteredPeople.length; // eslint-disable-line
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
  let filteredPeople = JSON.parse(JSON.stringify(people));

  if (onlyWithSon) {
    filteredPeople = filteredPeople.filter(child =>
      people.find(mom => mom.name === child.mother) && child.sex === 'm'
    );
  }

  filteredPeople = filteredPeople.filter(child =>
    people.find(mom => mom.name === child.mother)
  );

  const ageDiff = (accum, curr) => {
    const mom = people.find(momOfCurr => momOfCurr.name === curr.mother);
    const diff = curr.born - mom.born;

    return accum + diff;
  };

  return filteredPeople.reduce(ageDiff, 0) / filteredPeople.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
