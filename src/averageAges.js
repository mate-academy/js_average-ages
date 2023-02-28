'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * возвращает средний возраст мужчин в массиве. Если указан век, то
 * функция вычисляет средний возраст только для мужчин, умерших в этом столетии
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
  const mans = people.filter((person) => gender(person, 'm') && (
    century
      ? Math.ceil(person.died / 100) === century
      : true
  ));

  return averageAge(mans);
}

/**
 * Implement calculateWomenAverageAge function
 *
 ** Функция возвращает средний возраст женщин в массиве. Если `withChildren`
 * указано, то функция вычисляет средний возраст только для женщин с детьми
 *
 * Чтобы проверить, есть ли у женщины дети, вам нужно найти, кто упоминает
 * ее как мать
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : gender(person, 'f')
  );

  return averageAge(woman);
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
  const children = people.filter((person) => (
    hasMother(people, person)) && (
    onlyWithSon
      ? gender(person, 'm')
      : true
  )
  );

  const differencesSum = children.reduce((acc, child) => {
    const mother = hasMother(people, child);

    return acc + (child.born - mother.born);
  }, 0);

  return differencesSum / children.length;
}

// functions-helper:

function averageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
}

function gender(person, sex) {
  return person.sex === sex;
}

function hasMother(people, person) {
  return people.find(woman => woman.name === person.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
