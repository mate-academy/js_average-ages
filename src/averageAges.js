'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Функция возвращает средний возраст мужчин в массиве
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
  const men = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return calculateAverageAge(men);
}

function calculateAverageAge(people) {
  return people.map(person => person.died - person.born)
    .reduce((sum, person) => sum + person, 0) / people.length;
}

/**
* Реализовать функцию calculateWomenAverageAge
  *
  * Функция возвращает средний возраст женщин в массиве. Если `withChildren`
  * указано, то функция вычисляет средний возраст только для женщин с детьми
  *
  * есть ли у женщины дети, вам нужно найти кого-то, кто упоминает
  * ее как мать.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return calculateAverageAge(women);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Функция возвращает среднюю разницу в возрасте между ребенком и его
  * мать в массиве. (возраст матери при рождении ребенка)
  *
  * Если указано `onlyWithSon`, то функция вычисляет только разницу в возрасте
  * для сыновей и их матерей.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenWithCildren = people.filter(child =>
    onlyWithSon
      ? people.find(mother => mother.name === child.mother) && child.sex === 'm'
      : people.find(mother => mother.name === child.mother)
  );

  const ageDifferences = womenWithCildren.reduce((ageSum, child) => {
    const motherBorn = people.find(mother => mother.name === child.mother).born;

    return ageSum + (child.born - motherBorn);
  }, 0);

  return ageDifferences / womenWithCildren.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
