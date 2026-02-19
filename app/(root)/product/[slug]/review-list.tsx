"use client";
import { useEffect, useState } from "react";
import { Review } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Check, User } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import ReviewForm from "./review-form";
import { getReviews } from "@/lib/actions/review.action";
import Rating from "@/components/shared/product/rating";

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    /// Load reviews from the database
    const loadReviews = async () => {
      const res = await getReviews({ productId });
      setReviews(res.data);
    };

    loadReviews();
  }, [productId]);

  // Reload reviews when a review is submitted
const reload = async () => {
    try {
      const res = await getReviews({ productId });
      setReviews([...res.data]);
    } catch (err) {
      console.log(err);
      toast.error('Error in fetching reviews');
    }
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <>
          <ReviewForm
            userId={userId}
            productId={productId}
            onReviewSubmitted={reload}
          />
        </>
      ) : (
        <div>
          Please{" "}
          <Link
            className="text-primary px-2"
            href={`/api/auth/signin?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>{" "}
          to write a review
        </div>
      )}
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex-between">
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <Rating value={review.rating} />
                <span className="flex items-center">
                  <User className="mr-1 h-3 w-3 shrink-0" />
                  {review.user ? review.user.name : "Deleted User"}
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3 shrink-0" />
                  {formatDateTime(review.createdAt).dateTime}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
