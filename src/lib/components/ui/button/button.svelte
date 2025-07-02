<script lang="ts" module>
	import { cn } from "../../../utils.js";
	import { buttonVariants } from "./variants.js";
	
	export { buttonVariants };
</script>

<script lang="ts">
	import type { ButtonProps } from "./types.js";

	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		loading = false,
		children,
		...restProps
	}: ButtonProps = $props();

	const isDisabled = $derived(disabled || loading);
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={isDisabled ? undefined : href}
		aria-disabled={isDisabled}
		role={isDisabled ? "link" : undefined}
		tabindex={isDisabled ? -1 : undefined}
		{...restProps}
	>
		{#if loading}
			<svg
				class="animate-spin -ml-1 mr-2 h-4 w-4"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		{/if}
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		disabled={isDisabled}
		{...restProps}
	>
		{#if loading}
			<svg
				class="animate-spin -ml-1 mr-2 h-4 w-4"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		{/if}
		{@render children?.()}
	</button>
{/if}
