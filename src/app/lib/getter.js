import prisma from "./prisma";



export async function getAllReviews() {
  //読了日降順で取得
  try {
    const reviews = await prisma.reviews.findMany({
      orderBy: { read: 'desc' },
    });
    return reviews;
  } catch (error) {
    console.error("Prisma Error:", error);
    throw new Error("Failed to fetch reviews");
  }
}
