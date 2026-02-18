'use client';

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { getAllCategories } from '@/lib/actions/product.actions';

type CategoryItem = { category: string; _count: number };

const CategoriesDrawer = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" type="button">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle>Select a category</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-1">
          {categories.map((x) => (
            <SheetClose asChild key={x.category}>
              <Button
                className="w-full justify-start"
                variant="ghost"
                asChild
              >
                <Link href={`/search?category=${x.category}`}>
                  {x.category} ({x._count})
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesDrawer;
