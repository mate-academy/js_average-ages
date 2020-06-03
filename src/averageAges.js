'use strict';

// const { includes } = require('./people');

/**
 * @param {object[]} people
 * @param {number} century - optional
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  let men;

  (century === undefined)
    ? men = people.filter(man => man.sex === 'm')
    : men = people.filter(man => Math.floor(man.died / 100) === century - 1
    && man.sex === 'm');

  const average = men.reduce((sum, man) =>
    sum + (man.died - man.born), 0) / men.length;

  return average;
}
/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  let mothersData;
  const children = people.filter(childWithMom => childWithMom.mother !== null);
  const momsNames = Array.from(new Set(Array.from(
    children, childWithMom => childWithMom.mother)));

  (withChildren === undefined)
    ? mothersData = people.filter(woman => woman.sex === 'f')
    : mothersData = people.filter(person => momsNames.includes(person.name));

  const average = mothersData.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0) / mothersData.length;

  return average;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let children;

  (onlyWithSon)
    ? children = people.filter(person => person.sex === 'm')
    : children = [...people];

  const momsNames = (Array.from(children, kid => kid.mother));
  const momsNamesFiltered = (Array.from(people.filter(woman =>
    momsNames.includes(woman.name)), lady => lady.name));
  const childWithMom = children.filter(person => momsNamesFiltered
    .includes(person.mother));
  const momsInTheList = (Array.from(childWithMom, kid => kid.mother));
  const momFullData = people.filter(person => momsInTheList
    .includes(person.name));
  const kidAverageBirth = childWithMom.reduce((sum, child) =>
    sum + child.born, 0) / childWithMom.length;
  const momYearsOfBirth = (Array.from(momsInTheList, lady =>
    momFullData.map(function(element) {
      if (element.name === lady) {
        return element.born;
      }
    })));
  const momAverageBirth = momYearsOfBirth.flat()
    .filter(item => item !== undefined)
    .reduce((sum, item) => sum + item, 0) / momYearsOfBirth.length;

  return kidAverageBirth - momAverageBirth;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
