import * as React from 'react'
import { StringUtils } from '../../utils'
import './Header.scss'
import { HeaderProps } from './Header.types'

/**
 * ## Description
 * Render HTML Headers (h1, h2, h3, h4. h5)
 *
 */
const HeaderComponent: React.FC<HeaderProps> = ({
  children,
  className,
  Tag,
  isBold,
  id
}) => {
  let fontWeightChange = ''
  if (isBold !== undefined) {
    fontWeightChange = isBold === true ? 'fw-bold' : 'fw-normal'
  }

  return <Tag id={id}
              className={StringUtils.classNameMerge(
                className,
                fontWeightChange,
              )}>{children}
  </Tag>
}

export default HeaderComponent
