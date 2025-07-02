import type { VariantProps } from "tailwind-variants";
import type { WithElementRef } from "../../../utils.js";
import type {
  HTMLAnchorAttributes,
  HTMLButtonAttributes,
} from "svelte/elements";
import { buttonVariants } from "./variants.js";

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

/**
 * Props for the Button component that can render as either a button or anchor element.
 *
 * @description A button component that automatically renders as an anchor tag
 * when an `href` prop is provided, or as a button element otherwise. Supports multiple
 * visual variants, sizes, and loading states with proper accessibility features.
 *
 * @example
 * ```svelte
 * <!-- Button element -->
 * <Button variant="default" size="lg" loading={isSubmitting}>
 *   Submit Form
 * </Button>
 *
 * <!-- Anchor element -->
 * <Button variant="outline" href="/dashboard">
 *   Go to Dashboard
 * </Button>
 * ```
 *
 * @property {ButtonVariant} [variant="default"] - Visual style variant of the button.
 * - `default`: Primary button with solid background
 * - `destructive`: Red button for dangerous actions
 * - `outline`: Button with border and transparent background
 * - `secondary`: Muted button for secondary actions
 * - `ghost`: Minimal button with no background
 * - `link`: Text-only button that looks like a link
 *
 * @property {ButtonSize} [size="default"] - Size variant of the button.
 * - `default`: Standard button size (h-9, px-4, py-2)
 * - `sm`: Small button (h-8, px-3)
 * - `lg`: Large button (h-10, px-6)
 * - `icon`: Square button for icons only (size-9)
 *
 * @property {boolean} [loading=false] - Whether the button is in a loading state.
 * When true, displays a spinner and disables the button to prevent user interaction.
 * The button becomes non-interactive and shows visual feedback for async operations.
 */
export type ButtonProps =
  | (WithElementRef<HTMLButtonAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
      loading?: boolean;
    })
  | (WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
      loading?: boolean;
    });
