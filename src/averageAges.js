'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in ageOfPassageay.
 * If `century` is specified then
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
  let ageOfPassage = [];

  (century === undefined)
    ? (people.map(x => ((x.sex === 'm')
      ? ageOfPassage.push(x.died - x.born) : false)))
    : (people.map(x =>
      ((x.sex === 'm' && Math.ceil(x.died / 100) === century)
        ? ageOfPassage.push(x.died - x.born) : false)));

  ageOfPassage = calulateAvarageAge(ageOfPassage);

  return ageOfPassage;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in ageOfPassageay. If `withChildren` is
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
  let womenAverageAge = [];
  let resultOfAverageAge = 0;
  const objWoman = filterIfFemale([...people]);

  objWoman.map(x => (withChildren === undefined)
    ? womenAverageAge.push(x.died - x.born) : false);

  objWoman.map(x => {
    people.map(y => (x.name === y.mother && withChildren === true)
      ? womenAverageAge.push(x.died - x.born) : false);
  });

  if (withChildren === true) {
    womenAverageAge = (womenAverageAge
      .filter((x, i) => womenAverageAge.indexOf(x) === i));
  }
  resultOfAverageAge = calulateAvarageAge(womenAverageAge);

  return resultOfAverageAge;
}

const calulateAvarageAge = (womenAverageAgeay) => {
  const womenAverageAgeLength = womenAverageAgeay.length;
  const resultOfAverageAge = (womenAverageAgeay
    .reduce((x, y) => x + y) / womenAverageAgeLength);

  return resultOfAverageAge;
};
const filterIfFemale = (womenAverageAgeay) => womenAverageAgeay
  .filter(x => x.sex === 'f');
// філтруємо для того щоб елементи не повторювались в масиві

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the ageOfPassageay. (A mother's age at child birth)
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
  let allFemaleProvided = [];
  const dateDifference = [];

  (onlyWithSon === true)
    ? allFemaleProvided = people.filter(child => child.sex === 'm'
    && people.some(mother => mother.name === child.mother))
    : allFemaleProvided = people.filter(child => people.find(
      mother => mother.name === child.mother));

  allFemaleProvided.map(x => {
    people.map(y => (y.name === x.mother)
      ? dateDifference.push(x.born - y.born) : false,
    );
  });

  return calulateAvarageAge(dateDifference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
