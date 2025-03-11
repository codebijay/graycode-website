
import Link from "next/link";
import htmlcontentservice from "@/src/service/htmlcontentservice";
import { useEffect, useState } from "react";
import { useSiteInfo } from "@/src/components/siteinfocontext/SiteInfoContext";

const NavMenu = () => {
  const [menu, setMenu] = useState([]);
  const { siteInfo, siteMenu } = useSiteInfo();
  const buildMenuTree = (series) => {
    const menuMap = {};
    const rootItems = [];

    const menu=[];
    const sortedData = series &&series?.sort((a, b) => a.ParentId - b.ParentId);

    sortedData &&sortedData.forEach(item => {
    if (item.ParentId === 0) {
        menu.push({ ...item, sub_menus: [] });
    } else {
        const parent = menu.find(menuItem => menuItem.Id === item.ParentId);
        if (parent) {
            parent.sub_menus.push(item);
        }
    }
});
    return menu;
  };
  const menuTree = buildMenuTree(siteMenu);
  return (
    <>
      <ul>
        {menuTree.map((menu_item, i) => (
          <li
            key={i}
            className={`${menu_item?.sub_menus.length > 0 && "has-dropdown"}`}
          >
            <Link href={menu_item.Url}>
              <span></span>
              {menu_item.MenuName}
            </Link>
            {menu_item.sub_menus.length > 0 && (
              <ul className="submenu">
                {menu_item.sub_menus.map((sub_menu, i) => {
                  
                  return (
                  <li key={i}>
                    <Link href={sub_menu.Url}>
                      <span>{sub_menu.MenuName}</span>
                    </Link>
                  </li>
                )})}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;
