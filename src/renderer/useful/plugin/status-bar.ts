import { useBus } from '@fe/useful/bus'

const bus = useBus()

export type MenuItem = {
  id: string;
  type: 'normal';
  title: string;
  tips?: string;
  onClick?: (item: MenuItem) => void;
}

export interface Menu {
  id: string;
  title?: string;
  tips?: string;
  icon?: string;
  hidden?: boolean;
  position: 'left' | 'right';
  onClick?: (menu: Menu) => void;
  list?: MenuItem[];
}

const menus: { [key: string]: Menu } = {}

export const getMenus = (position: string) =>
  Object.values(menus).filter(x => x.position === position)

export function updateMenu (menu: Menu) {
  menus[menu.id] = menu
  bus.emit('status-bar-menu-update', menu)
}

export function tapMenu (id: string, fn: (menu: Menu) => Menu) {
  updateMenu(fn(menus[id]))
}

export function removeMenu (id: string) {
  delete menus[id]
  bus.emit('status-bar-menu-update')
}

export const ctx = {
  getMenus,
  tapMenu,
  updateMenu,
  removeMenu,
}
