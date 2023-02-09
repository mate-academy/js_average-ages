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
  const men = people.filter(man => man.sex === 'm');
  const menCentury = century ? men.filter(
    man => Math.ceil(man.died / 100) === century) : men;

  const averageAge = menCentury.reduce(
    (sum, man) => sum + (man.died - man.born), 0);

  return averageAge / menCentury.length;
}

/**
* Реализовать функцию расчета womenaverageage
 *
 * Функция возвращает средний возраст женщин в массиве.Если `witchildren
 * Указано, затем функционирование вычисляет средний возраст
 * только для женщин с детьми
 *
 * Подсказка: чтобы проверить, есть ли у женщины дети,
 * вы должны найти кого -то, кто упоминает
 * ее как мать.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(woman => woman.sex === 'f');
  const womenMothers = women.filter(woman =>
    people.some(person => person.mother === woman.name));
  const womenAge = withChildren ? womenMothers : women;

  const averageAge = womenAge.reduce(
    (sum, woman) => sum + (woman.died - woman.born), 0);

  return averageAge / womenAge.length;
}

/**
* Реализовать функцию CalculateAverageadiff.
 *
 * Функция возвращает среднюю разницу в возрасте между ребенком и его или ей
 * Мать в массиве.(Возраст матери при рождении ребенка)
 *
 * Если указан только `только
 * Для сыновей и их матерей.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon ? people.filter(
    child => people.some(
      mother => child.sex === 'm' && mother.name === child.mother))
    : people.filter(child => people.some(
      mother => mother.name === child.mother));

  const averageAge = children.reduce((sum, child) => {
    const mothers = people.find(mother => child.mother === mother.name);

    return sum + (child.born - mothers.born);
  }, 0) / children.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
