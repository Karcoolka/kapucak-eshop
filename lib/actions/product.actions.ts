'use server';
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { Product } from "@/types";

function getPrismaClient() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
}

// Get latest products
export async function getLatestProducts(): Promise<Product[]> {
    const prisma = getPrismaClient();
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' },
    });

    return convertToPlainObject(data) as unknown as Product[];
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
    const prisma = getPrismaClient();
    return await prisma.product.findFirst({
        where: { slug },
    });
}

