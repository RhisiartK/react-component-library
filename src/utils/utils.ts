export const StringUtils = {
  isEmpty: (str: string | undefined | null): boolean => {
    return str === undefined || str === null || typeof str !== 'string' || str.length === 0
  },
  isNotEmpty: (str: string | undefined | null): boolean => !StringUtils.isEmpty(str),
  classNameMerge: (...classNames: Array<string | undefined>): string => {
    return classNames.filter((className: string | undefined) => StringUtils.isNotEmpty(className)).join(' ')
  }
}
