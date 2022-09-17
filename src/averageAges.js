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
  const filtredPeopleBySex = people.filter(person => person.sex === 'm');
  let whatWeFiler = filtredPeopleBySex;

  if (arguments.length > 1) {
    const filtredByCentury = filtredPeopleBySex.filter(person => {
      return Math.ceil(person.died / 100) === century;
    });

    whatWeFiler = filtredByCentury;
  }

  const averageAge = whatWeFiler.reduce((accumulator, current) => {
    const currentAge = current.died - current.born;

    return accumulator + currentAge;
  }, 0);

  return +(averageAge / whatWeFiler.length).toFixed(2);
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const filtredPeopleBySex = people.filter(person => person.sex === 'f');
  const peopleMothers = people.map(about => about.mother);

  let whatWeFiler = filtredPeopleBySex;

  if (withChildren) {
    const filtredMotherOrNot = filtredPeopleBySex.filter(person => {
      const motherName = person.name;

      return peopleMothers.includes(motherName);
    });

    whatWeFiler = filtredMotherOrNot;
  }

  const averageAge = whatWeFiler.reduce((accumulator, current) => {
    const currentAge = current.died - current.born;

    return accumulator + currentAge;
  }, 0);

  return +(averageAge / whatWeFiler.length).toFixed(2);
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
  const filtredPeopleBySex = people.filter(person => person.sex === 'f');
  const peopleMothers = people.map(about => about.mother);
  const filtredMotherOrNot = filtredPeopleBySex.filter(person => {
    const motherName = person.name;

    return peopleMothers.includes(motherName);
  });

  const ageDiffArray = [];

  for (const mother of filtredMotherOrNot) {
    if (people.some(person => person.mother === mother.name)) {
      const childrens = people.filter(person => person.mother === mother.name);

      for (let j = 0; j < childrens.length; j++) {
        const checkOnFemale = childrens[j].sex === 'f';
        const ageDiff = childrens[j].born - mother.born;

        if (onlyWithSon && checkOnFemale) {
          continue;
        }

        ageDiffArray.push(ageDiff);
      }
    }
  }

  const whatWeFiler = ageDiffArray;

  const averageAge = whatWeFiler.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);

  return +(averageAge / whatWeFiler.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
