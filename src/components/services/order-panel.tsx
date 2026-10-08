"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import type { Service } from "@/types";
import { getMarket } from "@/lib/markets";
import { useCartStore } from "@/stores/cart-store";

interface OrderPanelProps {
  service: Service;
  market: string;
}

export function OrderPanel({
  service,
  market,
}: OrderPanelProps) {
  const marketConfig = getMarket(market);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedOptionId, setSelectedOptionId] = useState(
    service.options?.[0]?.id ?? ""
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Prevent undefined market errors
  if (!marketConfig) {
    return (
      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <p className="text-sm text-gray-500">
          Market information is unavailable.
        </p>
      </div>
    );
  }

  const selectedOption = service.options?.find(
    (option) => option.id === selectedOptionId
  );

  const unitPrice =
    service.startingPrice + (selectedOption?.priceModifier ?? 0);

  const totalPrice = unitPrice * quantity;

  const formatter = new Intl.NumberFormat(
    marketConfig.locale,
    {
      style: "currency",
      currency: marketConfig.currency,
      maximumFractionDigits: 0,
    }
  );

  const formattedTotal = formatter.format(totalPrice);

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
    setAdded(false);
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
    setAdded(false);
  }

  function handleOptionChange(optionId: string) {
    setSelectedOptionId(optionId);
    setAdded(false);
  }

  function handleAddToCart() {
    addItem({
      id: `${market}-${service.id}-${selectedOptionId || "default"}`,
      serviceId: service.id,
      serviceName: service.name,
      slug: service.slug,
      market,
      image: service.images[0],
      optionId: selectedOption?.id,
      optionName: selectedOption?.name,
      unitPrice,
      quantity,
    });

    setAdded(true);
  }

  return (
    <div className="mt-8">
      {service.options && service.options.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Choose a package
          </h2>

          <div className="mt-3 space-y-3">
            {service.options.map((option) => {
              const optionPrice =
                service.startingPrice + option.priceModifier;

              const formattedPrice = formatter.format(optionPrice);

              const selected =
                option.id === selectedOptionId;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionChange(option.id)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        selected
                          ? "border-pink-500 bg-pink-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selected && (
                        <Check
                          size={12}
                          className="text-white"
                        />
                      )}
                    </span>

                    <span className="font-medium text-gray-900">
                      {option.name}
                    </span>
                  </div>

                  <span className="font-semibold text-gray-900">
                    {formattedPrice}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8">
        <p className="text-sm font-semibold text-gray-900">
          Quantity
        </p>

        <div className="mt-3 flex w-fit items-center overflow-hidden rounded-xl border border-gray-200">
          <button
            type="button"
            onClick={decreaseQuantity}
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-50"
          >
            <Minus size={16} />
          </button>

          <span
            aria-live="polite"
            className="flex h-11 w-12 items-center justify-center border-x border-gray-200 text-sm font-semibold"
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-50"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-gray-50 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Total
          </span>

          <span className="text-2xl font-bold text-gray-900">
            {formattedTotal}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white transition ${
          added
            ? "bg-green-600"
            : "bg-pink-500 hover:bg-pink-600"
        }`}
      >
        {added ? (
          <>
            <Check size={20} />
            Added to cart
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            Add to cart
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-gray-500">
        Secure ordering • Professional delivery •{" "}
        {marketConfig.name}
      </p>
    </div>
  );
}