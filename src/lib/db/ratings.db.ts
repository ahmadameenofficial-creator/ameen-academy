import { prisma } from "@/lib/prisma";

export function getAverageRatingsByCourse() {
  return prisma.rating.groupBy({
    by: ["courseId"],
    _avg: { rating: true },
  });
}

export function getAverageRating() {
  return prisma.rating.aggregate({ _avg: { rating: true } });
}
