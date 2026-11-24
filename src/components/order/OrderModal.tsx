"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { X } from "lucide-react";
import { strings } from "@/lib/strings";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import type { Product } from "@/types";

interface OrderModalProps {
  product: Product;
  quantity: number;
  onClose: () => void;
}

interface FormValues {
  name: string;
  address: string;
  note: string;
}

interface FormErrors {
  name?: string;
  address?: string;
}

export default function OrderModal({
  product,
  quantity,
  onClose,
}: OrderModalProps) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    address: "",
    note: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const total = product.price * quantity;

  // Focus first field on open
  useEffect(() => {
    firstFocusRef.current?.focus();
  }, []);

  // Focus trap
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!values.name.trim()) {
      newErrors.name = strings.order.nameRequired;
    }
    if (!values.address.trim()) {
      newErrors.address = strings.order.addressRequired;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      const message = strings.order.whatsappMessage(
        values.name.trim(),
        quantity,
        product.name,
        product.price,
        total,
        values.address.trim(),
        values.note.trim()
      );
      const url = buildWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values, quantity, product, total, onClose]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={strings.order.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {strings.order.title}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            aria-label={strings.general.close}
          >
            <X size={18} />
          </button>
        </div>

        {/* Product summary */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">{strings.order.productLabel}</dt>
              <dd className="font-medium text-gray-900 text-right line-clamp-2">
                {product.name}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">{strings.order.quantityLabel}</dt>
              <dd className="font-medium text-gray-900">{quantity}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">{strings.order.priceLabel}</dt>
              <dd className="font-medium text-gray-900">
                {formatPrice(product.price)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 pt-1.5 border-t border-gray-200">
              <dt className="font-semibold text-gray-900">
                {strings.order.totalLabel}
              </dt>
              <dd className="font-bold text-primary text-base">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-4">
          <Input
            ref={firstFocusRef}
            id="order-name"
            name="name"
            label={strings.order.nameLabel}
            placeholder={strings.order.namePlaceholder}
            value={values.name}
            onChange={handleChange}
            required
            autoComplete="name"
            error={errors.name}
          />
          <Input
            id="order-address"
            name="address"
            label={strings.order.addressLabel}
            placeholder={strings.order.addressPlaceholder}
            value={values.address}
            onChange={handleChange}
            required
            autoComplete="street-address"
            error={errors.address}
          />
          <Textarea
            id="order-note"
            name="note"
            label={strings.order.noteLabel}
            placeholder={strings.order.notePlaceholder}
            value={values.note}
            onChange={handleChange}
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {strings.order.cancel}
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {/* WhatsApp icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {strings.order.submitButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
