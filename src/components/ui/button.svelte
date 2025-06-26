<script lang="ts">
  import { run } from 'svelte/legacy';

  let {
    link,
    iconLeft,
    iconRight,
    name
  } = $props();

  // Validate required props
  run(() => {
    if (!link) {
      console.warn("Button component requires a valid link prop");
    }
  });
</script>

<a
  href={link}
  class="dark:bg-accent dark:text-primary bg-primary hover:bg-accent/90 rounded-full px-8 py-3 font-semibold text-white transition-colors flex items-center justify-center gap-2"
>
  {#if iconLeft}
    <span class={iconLeft} aria-hidden="true"></span>
  {/if}
  {name}
  {#if iconRight}
    <span class={iconRight} aria-hidden="true"></span>
  {/if}
</a>
