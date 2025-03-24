'use client'
import { Navbar, NavbarBrand, NavbarContent, Link } from '@heroui/react'

import ThemeSwitcher from '../ThemeSwitcher'

/**
 * @description 头部组件
 */
export default function Header() {
  return (
    <Navbar className='shadow-md dark:shadow-purple-800'>
      <NavbarBrand>
        <Link
          className='flex items-center text-inherit ml-[-10px] dark:text-purple-800'
          href='/'
        >
          <h1 className='font-bold'>问卷调查</h1>
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  )
}
