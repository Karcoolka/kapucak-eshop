import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/shared/header/menu";
import CategoriesDrawer from "./category-drawer";
import Search from "./search";

const Header = () => {
  return (
    <header className="v-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start gap-4">
          <CategoriesDrawer />
          <Link href="/" className="flex-start">
            <Image
              src={"/images/logo.svg"}
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority={true}
            />
            <span className="hidden lg:block font-bold text-2xl ml-2">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="md:block">
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
