"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { getMarket } from "@/lib/markets";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  address: z.string().min(5, "Please enter your delivery address."),
  city: z.string().min(2, "Please enter your city."),
  notes: z
    .string()
    .max(500, "Notes must be 500 characters or less.")
    .optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  market: string;
}

export function CheckoutForm({ market }: CheckoutFormProps) {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const marketConfig = getMarket(market);

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!marketConfig) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Market unavailable
        </h1>

        <p className="mt-3 text-gray-500">
          We could not determine the selected market.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white"
        >
          Back home
        </Link>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat(
    marketConfig.locale,
    {
      style: "currency",
      currency: marketConfig.currency,
      maximumFractionDigits: 0,
    }
  );

  const marketItems = items.filter(
    (item) => item.market === market
  );

  const subtotal = marketItems.reduce(
    (total, item) =>
      total + item.unitPrice * item.quantity,
    0
  );

  const formattedSubtotal = formatter.format(subtotal);

  function handleChange(
    field: keyof CheckoutFormData,
    value: string
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const result = checkoutSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof CheckoutFormData, string>
      > = {};

      result.error.issues.forEach((issue) => {
        const field =
          issue.path[0] as keyof CheckoutFormData;

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      clearCart();
    }, 1200);
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-green-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2
            size={34}
            className="text-green-600"
          />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-600">
          Order received
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Thanks for your order!
        </h1>

        <p className="mx-auto mt-4 max-w-lg leading-7 text-gray-600">
          Your order has been received successfully.
          Our team will contact you shortly with the next
          steps.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/${market}/services`}
            className="rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
          >
            Browse more services
          </Link>

          <Link
            href={`/${market}`}
            className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  if (marketItems.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mx-auto mt-3 max-w-md text-gray-500">
          Add a service to your cart before continuing
          to checkout.
        </p>

        <Link
          href={`/${market}/services`}
          className="mt-6 inline-flex rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
        >
          Browse services
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
            Customer details
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Tell us where to reach you
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            We&apos;ll use these details to coordinate your
            order.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Field
            label="Full name"
            name="fullName"
            value={formData.fullName}
            error={errors.fullName}
            placeholder="John Doe"
            onChange={(value) =>
              handleChange("fullName", value)
            }
          />

          <Field
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            error={errors.email}
            placeholder="john@example.com"
            onChange={(value) =>
              handleChange("email", value)
            }
          />

          <Field
            label="Phone number"
            name="phone"
            type="tel"
            value={formData.phone}
            error={errors.phone}
            placeholder="+1 555 123 4567"
            onChange={(value) =>
              handleChange("phone", value)
            }
          />

          <Field
            label="City"
            name="city"
            value={formData.city}
            error={errors.city}
            placeholder="Montreal"
            onChange={(value) =>
              handleChange("city", value)
            }
          />

          <div className="sm:col-span-2">
            <Field
              label="Address"
              name="address"
              value={formData.address}
              error={errors.address}
              placeholder="123 Main Street"
              onChange={(value) =>
                handleChange("address", value)
              }
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="notes"
              className="text-sm font-semibold text-gray-900"
            >
              Additional notes
              <span className="ml-1 font-normal text-gray-400">
                (optional)
              </span>
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={(event) =>
                handleChange(
                  "notes",
                  event.target.value
                )
              }
              placeholder="Anything our team should know?"
              rows={4}
              className={`mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.notes
                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              }`}
            />

            {errors.notes && (
              <p className="mt-1 text-xs text-red-500">
                {errors.notes}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-6 py-4 font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Processing order...
            </>
          ) : (
            "Place order"
          )}
        </button>

        <Link
          href={`/${market}/cart`}
          className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-pink-500"
        >
          <ArrowLeft size={16} />
          Back to cart
        </Link>
      </form>

      <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 lg:sticky lg:top-6">
        <h2 className="text-xl font-bold text-gray-900">
          Order summary
        </h2>

        <div className="mt-6 space-y-5">
          {marketItems.map((item) => {
            const itemTotal =
              item.unitPrice * item.quantity;

            const formattedItemTotal =
              formatter.format(itemTotal);

            return (
              <div
                key={item.id}
                className="flex justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.serviceName}
                  </p>

                  {item.optionName && (
                    <p className="mt-1 text-xs text-gray-500">
                      {item.optionName}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-semibold text-gray-900">
                  {formattedItemTotal}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">
              Total
            </span>

            <span className="text-2xl font-bold text-gray-900">
              {formattedSubtotal}
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            Delivery and any additional charges will be
            confirmed by the Branda team.
          </p>
        </div>
      </aside>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
}

function Field({
  label,
  name,
  value,
  error,
  placeholder,
  type = "text",
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-gray-900"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={name}
        onChange={(event) =>
          onChange(event.target.value)
        }
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${name}-error` : undefined
        }
        className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
        }`}
      />

      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}